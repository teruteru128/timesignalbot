
import json
import re as regex
import sys
from base64 import b64decode
from datetime import datetime, timedelta, timezone
from random import choice, random

import requests
from discord import ChannelType, Embed, Game, Member, Message, Status, User
from discord.ext import commands


class TimeSignalBot(commands.Bot):
    """時報bot"""

    # 各種定数
    FARM_SERVER_GUILD_ID = 572150608283566090
    # SABAKAN_ROLE = FARM_SERVER_GUILD.get_role(572157809399955456)
    FARN_SERVER_INITIALLY_SPAWN_ID = 572151278428225537
    SANDBOX_SERVER_GENERAL_ID = 838388401592991747
    TEST_SERVER_GUILD_ID = 879315010218774528
    TEST_SERVER_GENERAL_ID = 879315010218774531

    # アクティビティ
    #unser_development = discord.CustomActivity("開発中なのだ", emoji='🚀', state='開発中なのだ', type=discord.ActivityType.custom)
    #unser_development2 = discord.Activity(name="開発中なのだ")
    GAME = Game(name='開発中なのだ')

    def __init__(self, **options):
        super().__init__(**options)
        self.DEVELOPER_USER = None
        self.TEST_SERVER_GUILD = None

    # 曜日テキスト
    YOUBI = ['月', '火', '水', '木', '金', '土', '日']

    async def on_connect(self):
        # 接続時に呼ばれる関数
        print('接続しました')
        pass

    # discord.Clientのサブクラスにイベントリスナーを仕込む場合はデコレータが不要なんですって
    # https://discordpy.readthedocs.io/ja/latest/api.html?highlight=on_message#event-reference
    async def on_ready(self):
        """起動時に動作する処理"""
        # 起動したらターミナルにログイン通知が表示される

    JST_TIMEZONE = timezone(timedelta(hours=9), name='JAPAN')
    LARGE_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')
    LARGE_KUSA_EMBED.set_author(name='ベルサイユの草', url='https://www.nicovideo.jp/watch/sm33789162',
                                icon_url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
    LARGE_KUSA_EMBED.set_image(
        url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')

    SMALL_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')

    async def on_message(self, message: Message):
        """メッセージ受信時に動作する処理"""
        # メッセージ送信者がBotだった場合は無視する
        FARM_SERVER_GUILD = self.get_guild(TimeSignalBot.FARM_SERVER_GUILD_ID)
        if message.author.bot:
            return
        # ぬるぽしたら
        if 'ぬるぽ' in message.content:
            # ｶﾞｯします
            await message.reply('ｶﾞｯ')
        if message.content == 'やったぜ。':
            now = datetime.now(TimeSignalBot.JST_TIMEZONE)
            await message.channel.send(f"投稿者：{message.author.display_name} （{now.month}月{now.day}日（{TimeSignalBot.YOUBI[now.weekday()]}）{now.hour:02}時{now.minute:02}分{now.second:02}秒）")
        if 'SEックス' in message.content and message.guild != FARM_SERVER_GUILD:
            await message.channel.send('やめないか！')
        if '草' in message.content and message.guild != FARM_SERVER_GUILD:  # ファーム鯖以外では"草"で反応
            await message.channel.send(embed=TimeSignalBot.LARGE_KUSA_EMBED)
        if '草草の草' in message.content and message.guild == FARM_SERVER_GUILD:  # ファーム鯖のみ"草草の草"で反応
            await message.channel.send(embed=TimeSignalBot.SMALL_KUSA_EMBED)
        await self.process_commands(message)

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


class KusoCommands(commands.Cog):
    """コマンド詰め合わせ"""

    def __init__(self, bot: TimeSignalBot):
        self.bot = bot

    @commands.command(aliases=['NPS'])
    async def nps(self, ctx: commands.Context):
        """ダイレクトメッセージのみで反応するのん"""
        if ctx.channel.type == ChannelType.private:
            await ctx.send(f'NPS')

    @commands.command(aliases=['RBZ'])
    async def rbz(self, ctx: commands.Context):
        """ダイレクトメッセージのみで反応します"""
        if ctx.channel.type == ChannelType.private:
            await ctx.send(f'RBZ')

    @commands.command(aliases=['RZB'])
    async def rzb(self, ctx: commands.Context):
        """ダイレクトメッセージのみで反応します"""
        if ctx.channel.type == ChannelType.private:
            await ctx.send(f'RZB')

    @commands.command()
    async def kokorozashi(self, ctx: commands.Context):
        """志はNGです。"""
        await ctx.send("NG")

    @commands.command()
    async def neko(self, ctx: commands.Context):
        """見て！ねこがいるよ　かわいいね

        ノーマル13種 シークレット13種"""
        list = ['にゃーん', '🐱', '🐈', '🐈‍⬛', '😿', '😻',
                '😹', '😽', '😾', '🙀', '😸', '😺', '😼']
        if random() < 0.000001:
            # 0.0001%の確率で ██████████
            list.append(b64decode(
                b'44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44Gb').decode())
        if random() < 0.001:
            # 0.1%の確率で SCP-040-JP
            list.append('ねこですよろしくおねがいします')
        if random() < 0.05:
            # 5%の確率で現場猫
            list.extend(['ヨシ！', 'どうして……', "どうして\n夜中に\n起きてるん\nですか？", "ああああ！\nああああ！\nあああああ！あー！",
                         "オレじゃない\nアイツがやった\nシらない\nスんだこと", "なんだか\n知らんが\nとにかく\nヨシ！", "100万回死んだねこ",
                         "え！！半分の人員で倍の仕事を！？", "弊社なら年内施工も可能です！", "どうして自分が指定した時間にいないんですか:anger:",
                         "よくわからんが、まぁ動いてるからヨシ！", "正月もGWもお盆も普通に働いていた奴らだ。面構えが違う。"])
        # list.append('にゃーん')
        c = choice(list)
        await ctx.channel.send(c)

    @commands.command()
    async def nyanpass(self, ctx: commands.Context):
        """にゃんぱすーボタン( https://nyanpass.com/ )のカウント数を表示するのん"""
        r = requests.get('https://nyanpass.com/api/get_count')
        if r.status_code != 200:
            errmsg = f"カウントの取得に失敗したのん\nnyanpass error: status code = {r.status_code}"
            await self.get_user(310413442760572929).send(errmsg)
            print(errmsg, file=sys.stderr)
            await ctx.send('カウントの取得に失敗したのん')
            return
        j = json.loads(r.text)
        await ctx.channel.send(f"現在{j['count']}にゃんぱすーなのん")

    DICE_PATTERN = regex.compile("d", flags=regex.IGNORECASE)
    PLUS_PATTERN = regex.compile("\\+")

    @commands.command()
    async def dice(self, ctx: commands.Context):
        """ダイスロールを行います。(未実装)

        構文:
            ${command_prefix}dice ndm
            ${command_prefix}dice ndm+a
            ${command_prefix}dice ndm+a
            ${command_prefix}dice nDm+ldo+a

        サンプル
            ${command_prefix}dice 1d100
            ${command_prefix}dice 1d100+28d5
            ${command_prefix}dice 2d6+3
            ${command_prefix}dice 3D6+ 3d6 +4
            ${command_prefix}dice 3D6 + 3d6 + 4
        """
        # +記号で分割してリストに追加、後からndmをパース？
        length = len(ctx.args)
        if length == 0:
            await ctx.send_help(self.dice)
            return

        dices = []

        for arg in ctx.args:
            for sp in arg.split('+'):
                if sp:
                    dices.append(sp)

        for dice in dices:
            print(f"dice:{dice}")

    @commands.command(name=':')
    async def nothing(self, ctx: commands.Context):
        pass
