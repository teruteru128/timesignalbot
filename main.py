
from discord import Embed, Game, Intents, Member, Message, Status, User
from discord.ext import tasks, commands
from datetime import datetime, timedelta, timezone
from random import random
import re as regex
import os
from src.timesignalbot import TimeSignalBot, TimeSignalCog

command_prefix = '/'


# 自分のBotのアクセストークンに置き換えてください
TOKEN = os.environ['DiscordToken']

# 接続に必要なオブジェクトを生成
bot = TimeSignalBot(command_prefix='/', intents=Intents.all())

jst = timezone(timedelta(hours=9), name='JAPAN')

SANDBOX_SERVER_GENERAL_ID = 838388401592991747
TEST_SERVER_GENERAL_ID = 879315010218774531
FARN_SERVER_INITIALLY_SPAWN_ID = 572151278428225537

MAYONAKA_TEXT = '真夜中だよハルトオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオ'


@tasks.loop(seconds=1)
async def loop():
    """ああ！"""
    now = datetime.now(jst)
    if now.hour == 0 and now.minute == 0 and now.second == 0:
        await bot.get_channel(SANDBOX_SERVER_GENERAL_ID).send(MAYONAKA_TEXT)
        await bot.get_channel(TEST_SERVER_GENERAL_ID).send(MAYONAKA_TEXT)
        await bot.get_channel(FARN_SERVER_INITIALLY_SPAWN_ID).send(MAYONAKA_TEXT)
    if (now.hour == 3 or now.hour == 15) and now.minute == 34 and now.second == 0:
        """毎秒ループして (result.tm_hour == 3 &&
        result.tm_min == 34 && result.tm_sec == 0) だったら334する"""
        await bot.get_channel(SANDBOX_SERVER_GENERAL_ID).send('334')
        await bot.get_channel(TEST_SERVER_GENERAL_ID).send('334')
    if now.hour == 7 and now.minute == 0 and now.second == 0:
        await bot.get_channel(SANDBOX_SERVER_GENERAL_ID).send('おはよう')
        await bot.get_channel(TEST_SERVER_GENERAL_ID).send('<:hoayou:823065916271099954>')

loop.start()
bot.add_cog(TimeSignalCog(bot))
# Botの起動とDiscordサーバーへの接続
bot.run(TOKEN)
