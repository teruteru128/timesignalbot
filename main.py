
import os
import re as regex
from datetime import datetime, timedelta, timezone
from random import randrange

from discord import Intents
from discord.ext import tasks

from timesignalbot import (MemberEventListenerCog, TimeSignalBot,
                           KusoCommands)
from wordhant import WordHuntingCog

# コマンドプレフィックス
command_prefix = '/'


# 自分のBotのアクセストークンに置き換えてください
TOKEN = os.environ['DiscordToken']

# 接続に必要なオブジェクトを生成
bot = TimeSignalBot(command_prefix='/', intents=Intents.all())

# タイムゾーンオブジェクト(現在時刻取得用)
JST_TIMEZONE = timezone(timedelta(hours=9), name='JAPAN')

MAYONAKA_HEADER = '真夜中'
GETSUYOU_HEADER = '月曜日'
HARUTO='だよハルト'

# 毎秒実行する処理
@tasks.loop(seconds=1)
async def loop():
    """ああ！"""
    # タイムゾーンを指定して現在時刻を指定
    now = datetime.now(JST_TIMEZONE)
    if now.hour == 0 and now.minute == 0 and now.second == 0:
        if now.day == 1:
            msg = f"{now.month}月"
        elif now.weekday() == 0:
            msg = MAYONAKA_HEADER
        else:
            msg = MAYONAKA_HEADER
        # オリジナルは'オ'69文字
        msg += HARUTO + 'オ' * randrange(40, 100)
        await bot.get_channel(bot.SANDBOX_SERVER_GENERAL_ID).send(msg)
        await bot.get_channel(bot.TEST_SERVER_GENERAL_ID).send(msg)
        await bot.get_channel(bot.FARN_SERVER_INITIALLY_SPAWN_ID).send(msg)
    elif (now.hour == 3 or now.hour == 15) and now.minute == 34 and now.second == 0:
        """毎秒ループして (result.tm_hour == 3 &&
        result.tm_min == 34 && result.tm_sec == 0) だったら334する"""
        await bot.get_channel(bot.SANDBOX_SERVER_GENERAL_ID).send('334')
        await bot.get_channel(bot.TEST_SERVER_GENERAL_ID).send('334')
    elif now.hour == 7 and now.minute == 0 and now.second == 0:
        await bot.get_channel(bot.SANDBOX_SERVER_GENERAL_ID).send('おはよう')
        # await bot.get_channel(bot.TEST_SERVER_GENERAL_ID).send('<:hoayou:823065916271099954>')
        await bot.get_channel(bot.TEST_SERVER_GENERAL_ID).send('ほぁよぅごぁいまーしゅ！')

#ループ処理実行
loop.start()
# コグ登録
bot.add_cog(KusoCommands(bot))
bot.add_cog(MemberEventListenerCog(bot))
bot.add_cog(WordHuntingCog(bot))
# Botの起動とDiscordサーバーへの接続
bot.run(TOKEN)
