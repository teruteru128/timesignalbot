
import os
import re as regex
from datetime import datetime, timedelta, timezone
from random import randrange

from discord import Intents
from discord.ext import tasks

from timesignalbot import TimeSignalBot
from kusocommands import KusoCommands
from wordhant import WordHuntingCog
from locale import setlocale, LC_ALL

setlocale(LC_ALL, '')

# コマンドプレフィックス
command_prefix = '/'


# 自分のBotのアクセストークンに置き換えてください
TOKEN = os.environ['DISCORD_TOKEN']

# 接続に必要なオブジェクトを生成
bot = TimeSignalBot(command_prefix='/', intents=Intents.all())

# タイムゾーンオブジェクト(現在時刻取得用)
JST_TIMEZONE = timezone(timedelta(hours=9), name='JAPAN')

MAYONAKA_HEADER = '真夜中'
GETSUYOU_HEADER = '月曜日'
HARUTO = 'だよハルト'


@tasks.loop(seconds=1)
async def loop():
    """ああ！

    毎秒実行する処理"""
    # タイムゾーンを指定して現在時刻を指定
    now = datetime.now(JST_TIMEZONE)
    if now.hour == 0 and now.minute == 0 and now.second == 0:
        # TODO: テキストを生成するロジックを整理する
        if now.day == 1:
            # 毎月1日
            msg = f"{now.month}月"
        elif now.day == 20 and now.month == 11:
            # 11月20日
            msg = '20, november'
        elif now.weekday() == 0:
            # 毎週月曜日
            msg = GETSUYOU_HEADER
        else:
            # その他
            msg = MAYONAKA_HEADER
        # 真夜中だよハルトオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオ
        # オリジナルは'オ'69文字
        msg += HARUTO + 'オ' * randrange(40, 100)
        #await bot.get_channel(bot.TEST_SERVER_GENERAL_ID).send(msg)
        await bot.get_channel(bot.FARN_SERVER_INITIALLY_SPAWN_ID).send(msg)
        await bot.get_channel(bot.TAMOKUTEKI_TOIRE_TAMOKUTEKI_TOIRE_ID).send(msg)

# ループ処理実行
loop.start()
# コグ登録
bot.add_cog(KusoCommands(bot))
bot.add_cog(WordHuntingCog(bot))
# Botの起動とDiscordサーバーへの接続
bot.run(TOKEN)
# bot.connect(reconnect=True)
# bot.login(token=TOKEN)
