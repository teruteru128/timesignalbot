
import json
import re as regex
import sys
from base64 import b64decode
from datetime import datetime, timedelta, timezone
from random import choice, random

import requests
from discord import Embed, Game, Intents, Member, Message, Status, User
from discord.ext import commands


class TimeSignalBot(commands.Bot):
    """時報bot"""
    FARM_SERVER_GUILD_ID = 572150608283566090
    # SABAKAN_ROLE = FARM_SERVER_GUILD.get_role(572157809399955456)
    FARN_SERVER_INITIALLY_SPAWN_ID = 572151278428225537
    SANDBOX_SERVER_GENERAL_ID = 838388401592991747
    TEST_SERVER_GUILD_ID = 879315010218774528
    TEST_SERVER_GENERAL_ID = 879315010218774531

    #unser_development = discord.CustomActivity("開発中なのだ", emoji='🚀', state='開発中なのだ', type=discord.ActivityType.custom)
    #unser_development2 = discord.Activity(name="開発中なのだ")
    game = Game(name='開発中なのだ')

    youbi = ['月', '火', '水', '木', '金', '土', '日']

    # discord.Clientのサブクラスにイベントリスナーを仕込む場合はデコレータが不要なんですって
    # https://discordpy.readthedocs.io/ja/latest/api.html?highlight=on_message#event-reference
    async def on_ready(self):
        """起動時に動作する処理"""
        # 起動したらターミナルにログイン通知が表示される
        await self.change_presence(activity=self.game, status=Status.online)
        print('ログインしました')

    jst = timezone(timedelta(hours=9), name='JAPAN')
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
        FARM_SERVER_GUILD = self.get_guild(self.FARM_SERVER_GUILD_ID)
        if message.author.bot:
            return
        if 'ぬるぽ' in message.content:
            message.reply('ｶﾞｯ')
        if message.content == 'やったぜ。':
            now = datetime.now(self.jst)
            await message.channel.send(f"投稿者：{message.author.display_name} （{now.month}月{now.day}日（{self.youbi[now.weekday()]}）{now.hour:02}時{now.minute:02}分{now.second:02}秒）")
        if 'SEックス' in message.content and message.guild != FARM_SERVER_GUILD:
            await message.channel.send('やめないか！')
        if '草' in message.content and message.guild != FARM_SERVER_GUILD:  # ファーム鯖以外では"草"で反応
            await message.channel.send(embed=self.LARGE_KUSA_EMBED)
        if '草草の草' in message.content and message.guild == FARM_SERVER_GUILD:  # ファーム鯖のみ"草草の草"で反応
            await message.channel.send(embed=self.SMALL_KUSA_EMBED)
        await self.process_commands(message)

    async def on_member_join(self, member: Member):
        if member.bot:
            return
        print(f'{member.display_name}が来たぜ。')
        if member.guild.id == self.TEST_SERVER_GUILD_ID:
            # メッセージ出力先のチャンネルを指定
            channel = self.get_channel(self.TEST_SERVER_GENERAL_ID)
            # カカポ
            m = 'https://cultofthepartyparrot.com/parrots/hd/reverseparrot.gif'
            # カカポをチャンネルに出力
            await channel.send(m)

    async def on_member_update(self, before: Member, after: Member):
        """Member がプロフィールを編集したとき呼び出されます。"""
        # うるさいのでコメントアウト
        # print(f'memberが更新したぜ。: {before.display_name}, {before.status}, {before.activity}, {before.nick}, {before.roles}, {before.roles}, {before.pending}→{after.display_name}, {after.status}, {after.activity}, {after.nick}, {after.roles}, {after.roles}, {after.pending}')
        pass

    async def on_member_remove(self, member: Member):
        if member.bot:
            return
        print(f'{member.display_name}が去ったぜ。')

    async def on_user_update(self, before: User, after: User):
        print(
            f'userがやったぜ。{before.avatar}, {before.username}, {before.discriminator}→{after.avatar}, {after.username}, {after.discriminator}')

    pass


class TimeSignalCog(commands.Cog):
    """時報bot Cog"""

    def __init__(self, bot: TimeSignalBot):
        self.bot = bot

    @commands.command()
    async def nullpo(self, ctx: commands.Context):
        """誰かが「ぬるぽ」と書いたら、「ｶﾞｯ」と突っ込みを入れます。"""
        await ctx.message.channel.send("ｶﾞｯ")

    @commands.command()
    async def kokorozashi(self, ctx: commands.Context):
        """志はNGです。"""
        await ctx.send("NG")

    @commands.command()
    async def neko(self, ctx: commands.Context):
        """見て！ねこがいるよ　かわいいね

        ノーマル1種 シークレット13種"""
        rand = random()
        if 0 <= rand and rand < 0.000001:  # 0.0001%の確率で ██████████
            next = b64decode(
                b'44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44Gb').decode()
        elif 0.000001 <= rand and rand < 0.001:  # 0.1%の確率で SCP-040-JP
            next = 'ねこですよろしくおねがいします'
        elif 0.001 <= rand and rand < 0.05:  # 5%の確率で現場猫
            next = choice(['ヨシ！', 'どうして……', "どうして\n夜中に\n起きてるん\nですか？", "ああああ！\nああああ！\nあああああ！あー！",
                           "オレじゃない\nアイツがやった\nシらない\nスんだこと", "なんだか\n知らんが\nとにかく\nヨシ！", "100万回死んだねこ",
                           "え！！半分の人員で倍の仕事を！？", "弊社なら年内施工も可能です！", "どうして自分が指定した時間にいないんですか:anger:",
                           "よくわからんが、まぁ動いてるからヨシ！", "正月もGWもお盆も普通に働いていた奴らだ。面構えが違う。"])
        else:  # 残りは'にゃーん'
            next = 'にゃーん'
        await ctx.channel.send(next)

    @commands.command()
    async def nyanpass(self, ctx: commands.Context):
        """にゃんぱすーボタンのカウント数を表示するのん

        https://nyanpass.com/"""
        r = requests.get('https://nyanpass.com/api/get_count')
        if r.status_code != 200:
            print("nyanpass error: status code = {}",
                  r.status_code, file=sys.stderr)
            return
        j = json.loads(r.text)
        await ctx.channel.send("現在{}にゃんぱすーなのん".format(j['count']))

    pass


class MemberEventListenerCog(commands.Cog):
    """イベントリスナーCog

    イベントはBotに、コマンドはCogに
    """

    def __init__(self, bot: TimeSignalBot):
        self.bot = bot

    pass
