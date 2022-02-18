
from datetime import datetime
from random import randrange

from discord import Activity, ActivityType, Member, Status
from discord.ext import commands, tasks

from . import const


class TimeSignalBot(commands.Bot):
    """時報bot

    毎秒チェックさせる処理をこのクラスでできないだろうか、グローバルのloop関数を使うのではなく"""

    def __init__(self, *args, **options):
        super().__init__(**options)
        pass

    async def on_connect(self):
        """接続時に呼ばれる関数"""
        print('timesignalbot: 接続しました')

    # discord.Clientのサブクラスにイベントリスナーを仕込む場合はデコレータが不要なんですって
    # https://discordpy.readthedocs.io/ja/latest/api.html?highlight=on_message#event-reference
    async def on_ready(self):
        """起動時に動作する処理"""
        # 起動したらターミナルにログイン通知が表示される
        print('timesignalbot: 準備が完了しました')
        minesweeper = self.get_cog('Minesweeping')
        await self.change_presence(status=Status.online, activity=Activity(name=f'{len(minesweeper.MINES)}個の地雷除去', type=ActivityType.competing))
        # ループ処理実行
        self.loop.start()

    async def on_member_join(self, member: Member):
        """ギルドにメンバーが参加したときの処理"""
        if member.bot:
            return
        print(f'{member.display_name}が{member.guild.name}に来たぜ。')
        # if member.guild == self.TEST_SERVER_GUILD:
        # メッセージ出力先のチャンネルを指定
        #channel = self.get_channel(TimeSignalBot.TEST_SERVER_GENERAL_ID)
        # カカポ
        #m = 'https://cultofthepartyparrot.com/parrots/hd/reverseparrot.gif'
        # カカポをチャンネルに出力
        # await channel.send(m)
        #role = self.TEST_SERVER_GUILD.get_role(879320884014354503)
        # if not member in role.members:
        #    await member.add_roles(role)
        # pass

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
            await self.get_channel(const.FARN_SERVER_INITIALLY_SPAWN_ID).send(msg)
            await self.get_channel(const.TAMOKUTEKI_TOIRE_TAMOKUTEKI_TOIRE_ID).send(msg)
