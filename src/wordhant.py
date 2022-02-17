
import os
from datetime import datetime, timedelta, timezone

from discord import Activity, ActivityType, Embed, Message, Status
from discord.ext import commands


class WordHuntingCog(commands.Cog):
    """言葉狩り

    サーバーごとに設定したり
    完全一致か含むかを選択
    キーワード

    server_id, keyword, matchmode(equals, contains, (regex)), template, enable
    正規表現を入力させるのはやりたくないねんな……
    https://yamory.io/blog/about-redos-attack/
    https://qiita.com/prograti/items/9b54cf82a08302a5d2c7
    https://en.wikipedia.org/wiki/ReDoS

    開発者が実装しないと名前とか日時を入れ込むの無理じゃね？
    """

    def __init__(self, **options):
        super().__init__(**options)
        self.DEVELOPER_USER = None
        self.TEST_SERVER_GUILD = None
        # 地雷
        """ minelist = []
        for mineset in os.environ['MINES'].split(','):
            minelist.append(mineset.split('$'))
        self.MINES = dict(minelist) """
        minesstr = os.environ.get('MINES', '')
        if len(minesstr) == 0:
            self.MINES = []
            """
            TODO: CSV形式からJSON形式に変更する
            [
                {"keyword": "","url": ""},
                {"keyword": "","url": "", "type": "equal"},
                {"keyword": "","url": "", "type": "contains"},
                {"keyword": "","url": "", "type": "forward"},
                {"keyword": "","url": "", "type": "backward"},
                {"keyword": "","url": "", "type": "regex"}
            ]
            """
        else:
            self.MINES = minesstr.split(',')
        print(f'敷設された地雷(wordhant)：{len(self.MINES)}個')

    async def on_ready(self):
        await self.change_presence(status=Status.online, activity=Activity(name=f'{len(self.MINES)}個の地雷除去', type=ActivityType.competing))


    JST_TIMEZONE = timezone(timedelta(hours=9), name='JAPAN')
    LARGE_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')
    LARGE_KUSA_EMBED.set_author(name='ベルサイユの草', url='https://www.nicovideo.jp/watch/sm33789162',
                                icon_url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
    # LARGE_KUSA_EMBED.set_image(url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')

    SMALL_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')

    async def on_message(self, message: Message):
        print('wordhant')

    @commands.group()
    async def whconfig(self, ctx: commands.Context):
        """コンフィグ"""
        if ctx.invoked_subcommand is None:
            print("subcommand not found")

    @whconfig.command()
    async def add(self, ctx: commands.Context):
        pass

    @whconfig.command(name='del')
    async def delete(self, ctx: commands.Context):
        pass

    @whconfig.command(name='list')
    async def listtaboo(self, ctx: commands.Context):
        pass

    @commands.Cog.listener()
    async def on_message(self, message: Message):
        pass
