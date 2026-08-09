import { expect } from 'chai';
import random from '../src/modules/random.js'; // 実際の random.js のパスに合わせて調整してください

describe('Random モジュールの検証', () => {
  
  it('nextInt(bound) が指定された範囲内の値を返すこと', () => {
    const bound = 16777216;
    for (let i = 0; i < 1000; i++) {
      const r = random.nextInt(bound);
      expect(r).to.be.at.least(0);
      expect(r).to.be.below(bound);
    }
  });

  // 💥 ここが偏りをチェックするメインテスト
  it('nextInt(bound) の確率分布が均等であること（100万回試行）', function() {
    // 100万回まわすので、Mochaのデフォルトタイムアウト（2000ms）を超えないよう延長
    this.timeout(10000);

    const BOUND = 16777216;
    const ITERATIONS = 1000000;
    const ZONES = 16;
    const counts = new Array(ZONES).fill(0);

    // 100万回 乱数を生成
    for (let i = 0; i < ITERATIONS; i++) {
      const r = random.nextInt(BOUND);
      const zone = Math.floor((r / BOUND) * ZONES);
      counts[zone]++;
    }

    // 理論上の確率（100% / 16 = 6.25%）
    const expectedPercentage = 100 / ZONES; 
    // 統計的な許容誤差（±0.3% 以内なら合格とする）
    const tolerance = 0.3; 

    console.log('\n   === 乱数分布テスト結果 ===');
    
    counts.forEach((count, idx) => {
      const percentage = (count / ITERATIONS) * 100;
      console.log(`   ゾーン ${idx.toString().padStart(2, '0')}: ${count}回 (${percentage.toFixed(2)}%)`);
      
      // 各ゾーンが 5.95% 〜 6.55% の間にあるかを検証
      expect(percentage).to.be.closeTo(expectedPercentage, tolerance, `ゾーン ${idx} の確率が偏っています`);
    });
    console.log('   =========================\n');
  });

});

