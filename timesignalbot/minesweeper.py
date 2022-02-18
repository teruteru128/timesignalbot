
import os
from datetime import datetime, timedelta, timezone

from discord import Activity, ActivityType, Embed, Message, Status
from discord.ext import commands

from .timesignalbot import TimeSignalBot


class MinesweepingCog(commands.Cog, name="Minesweeping"):
    """地雷マネジメント

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
        print(f'wordhant: 敷設された地雷：{len(self.MINES)}個')

    @commands.Cog.listener()
    async def on_connect(self):
        print('wordhant: 接続しました')

    @commands.Cog.listener()
    async def on_ready(self):
        print('wordhant: 準備が完了しました')

    JST_TIMEZONE = timezone(timedelta(hours=9), name='JAPAN')
    LARGE_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')
    LARGE_KUSA_EMBED.set_author(name='ベルサイユの草', url='https://www.nicovideo.jp/watch/sm33789162',
                                icon_url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
    # LARGE_KUSA_EMBED.set_image(url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')

    SMALL_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')

    @commands.group()
    async def mine(self, ctx: commands.Context):
        """地雷"""
        if ctx.invoked_subcommand is None:
            await ctx.reply("subcommand not found")

    @mine.command()
    async def add(self, ctx: commands.Context):
        pass

    @mine.command(aliases=['del'])
    async def delete(self, ctx: commands.Context):
        pass

    @mine.command(name='list')
    async def listtaboo(self, ctx: commands.Context):
        pass

    @commands.Cog.listener()
    async def on_message(self, message: Message):
        """メッセージ受信時に動作する処理"""
        # メッセージ送信者がBotだった場合は無視する
        if message.author.bot:
            return
        # 地雷
        for mine in self.MINES:
            if mine in message.content:
                await message.channel.send(TimeSignalBot.MINES_EXPLODE_GIF_URL)
                if message.guild is not None and message.guild.id == 795353457996595200:
                    message.author.add_roles(
                        message.guild.get_role(844886159984558121))
                print(
                    f'{message.author.display_name}({message.author.name})くんが地雷を踏みました！:{mine}')
        """ for mine, url in self.MINES.items():
            if mine in message.content:
                await message.channel.send(url) """
        if message.content == 'やったぜ。' or message.content == "やりましたわ。" or message.content == "やったわ。":
            now = datetime.now(TimeSignalBot.JST_TIMEZONE)
            await message.channel.send(f"投稿者：{message.author.display_name} （{now.month}月{now.day}日（{TimeSignalBot.YOUBI[now.weekday()]}）{now.hour:02}時{now.minute:02}分{now.second:02}秒）")
        if 'SEックス' in message.content and message.guild.id != TimeSignalBot.FARM_SERVER_GUILD_ID:
            await message.channel.send('やめないか！')
        if '草' in message.content and (message.guild.id != TimeSignalBot.FARM_SERVER_GUILD_ID
                                       and message.guild.id != TimeSignalBot.TAMOKUTEKI_TOIRE_SERVER_ID):  # ファーム鯖以外では"草"で反応
            await message.channel.send(embed=TimeSignalBot.LARGE_KUSA_EMBED)
        # ファーム鯖のみ"草草の草"で反応
        if '草草の草' in message.content and (message.guild.id == TimeSignalBot.FARM_SERVER_GUILD_ID
                                          or message.guild.id == TimeSignalBot.TAMOKUTEKI_TOIRE_SERVER_ID):
            await message.channel.send(embed=TimeSignalBot.SMALL_KUSA_EMBED)
