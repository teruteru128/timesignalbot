
import os
import re as regex
from datetime import datetime, timedelta, timezone
from random import random, randrange

from discord import Embed, Game, Intents, Member, Message, Status, User
from discord.ext import commands, tasks

from src.timesignalbot import (MemberEventListenerCog, TimeSignalBot,
                               TimeSignalCog)

command_prefix = '/'


# 自分のBotのアクセストークンに置き換えてください
TOKEN = os.environ['DiscordToken']

# 接続に必要なオブジェクトを生成
bot = TimeSignalBot(command_prefix='/', intents=Intents.all())

jst = timezone(timedelta(hours=9), name='JAPAN')

MAYONAKA_HEADER = '真夜中だよハルト'


@tasks.loop(seconds=1)
async def loop():
    """ああ！"""
    now = datetime.now(jst)
    if now.hour == 0 and now.minute == 0 and now.second == 0:
        msg = MAYONAKA_HEADER + 'オ' * randrange(40, 100)
        await bot.get_channel(bot.SANDBOX_SERVER_GENERAL_ID).send(msg)
        await bot.get_channel(bot.TEST_SERVER_GENERAL_ID).send(msg)
        await bot.get_channel(bot.FARN_SERVER_INITIALLY_SPAWN_ID).send(msg)
    if (now.hour == 3 or now.hour == 15) and now.minute == 34 and now.second == 0:
        """毎秒ループして (result.tm_hour == 3 &&
        result.tm_min == 34 && result.tm_sec == 0) だったら334する"""
        await bot.get_channel(bot.SANDBOX_SERVER_GENERAL_ID).send('334')
        await bot.get_channel(bot.TEST_SERVER_GENERAL_ID).send('334')
    if now.hour == 7 and now.minute == 0 and now.second == 0:
        await bot.get_channel(bot.SANDBOX_SERVER_GENERAL_ID).send('おはよう')
        await bot.get_channel(bot.TEST_SERVER_GENERAL_ID).send('<:hoayou:823065916271099954>')

loop.start()
bot.add_cog(TimeSignalCog(bot))
bot.add_cog(MemberEventListenerCog(bot))
# Botの起動とDiscordサーバーへの接続
bot.run(TOKEN)
