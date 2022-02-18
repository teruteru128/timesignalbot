
from datetime import datetime
from random import randrange

from discord.ext import tasks, commands

from . import const

class TimeSignalCog(commands.Cog):
    def __init__(self, bot : commands.Bot, **options):
        super().__init__(**options)
        self.bot = bot
        self.loop.start()

    @commands.Cog.listener()
    async def on_connect(self):
        print('timesignalcog: 接続しました')

    @commands.Cog.listener()
    async def on_ready(self):
        print('timesignalcog: 準備が完了しました')

    def cog_unload(self):
        self.loop.cancel()

    @tasks.loop(seconds=1)
    async def loop(self):
        """毎秒実行する処理"""
        # タイムゾーンを指定して現在時刻を指定
        now = datetime.now(const.JST_TIMEZONE)
        if now.hour == 0 and now.minute == 0 and now.second == 0:
            # TODO: #7 テキストを生成するロジックを整理する
            if now.day == 1:
                # 毎月1日
                msg = f"{now.month}月"
            elif now.day == 20 and now.month == 11:
                # 11月20日
                msg = '20, november'
            elif now.weekday() == 0:
                # 毎週月曜日
                msg = const.GETSUYOU_HEADER
            else:
                # その他
                msg = const.MAYONAKA_HEADER
            # 真夜中だよハルトオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオ
            # オリジナルは'オ'69文字
            msg += const.HARUTO + 'オ' * randrange(40, 100)
            # await bot.get_channel(const.TEST_SERVER_GENERAL_ID).send(msg)
            await self.bot.get_channel(const.FARN_SERVER_INITIALLY_SPAWN_ID).send(msg)
            await self.bot.get_channel(const.TAMOKUTEKI_TOIRE_TAMOKUTEKI_TOIRE_ID).send(msg)

    @loop.before_loop
    async def before_loop(self):
        await self.bot.wait_until_ready()
