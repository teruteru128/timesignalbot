
from discord import Embed, Game, Intents, Member, Message, Status, User
from datetime import datetime, timedelta, timezone
from discord.ext import commands
import re as regex
from random import random


class TimeSignalBot(commands.Bot):
    """時報bot"""
    pass


class TimeSignalCog(commands.Cog):
    """時報bot Cog"""

    def __init__(self, bot: commands.Bot):
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

        ノーマル1種 シークレット3種"""
        rand = random()
        if 0 <= rand and rand < 0.001:  # 0.1%の確率で SCP-040-JP
            next = 'ねこですよろしくおねがいします'
        elif(0.001 <= rand and rand < 0.05):  # 5%の確率で現場猫
            if random() <= 0.5:
                next = 'ヨシ！'
            else:
                next = 'どうして……'
        else:  # 残りは'にゃーん'
            next = 'にゃーん'
        await ctx.channel.send(next)

    #unser_development = discord.CustomActivity("開発中なのだ", emoji='🚀', state='開発中なのだ', type=discord.ActivityType.custom)
    #unser_development2 = discord.Activity(name="開発中なのだ")
    game = Game(name='開発中なのだ')

    youbi = ['月', '火', '水', '木', '金', '土', '日']


    @commands.Cog.listener()
    async def on_ready(self):
        """起動時に動作する処理"""
        # 起動したらターミナルにログイン通知が表示される
        await self.bot.change_presence(activity=self.game, status=Status.online)
        print('ログインしました')

    jst = timezone(timedelta(hours=9), name='JAPAN')
    FARM_SERVER_GUILD_ID = 572150608283566090
    # SABAKAN_ROLE = FARM_SERVER_GUILD.get_role(572157809399955456)
    SANDBOX_SERVER_GENERAL_ID = 838388401592991747
    TEST_SERVER_GENERAL_ID = 879315010218774531
    FARN_SERVER_INITIALLY_SPAWN_ID = 572151278428225537
    LARGE_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')
    LARGE_KUSA_EMBED.set_author(name='test', url='https://www.nicovideo.jp/watch/sm33789162',
                                icon_url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
    LARGE_KUSA_EMBED.set_image(
        url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')

    SMALL_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')


    @commands.Cog.listener()
    async def on_message(self, message: Message):
        """メッセージ受信時に動作する処理"""
        # メッセージ送信者がBotだった場合は無視する
        FARM_SERVER_GUILD = self.bot.get_guild(self.FARM_SERVER_GUILD_ID)
        if message.author.bot:
            return
        if message.content == 'やったぜ。':
            now = datetime.now(jst)
            await message.channel.send(f"投稿者：{message.author.display_name} （{now.month}月{now.day}日（{youbi[now.weekday()]}）{now.hour:02}時{now.minute:02}分{now.second:02}秒）")
        if 'SEックス' in message.content and message.guild != FARM_SERVER_GUILD:
            await message.channel.send('やめないか！')
        if '草' in message.content and message.guild != FARM_SERVER_GUILD:  # ファーム鯖以外では"草"で反応
            await message.channel.send(embed=self.LARGE_KUSA_EMBED)
        if '草草の草' in message.content and message.guild == FARM_SERVER_GUILD:  # ファーム鯖のみ"草草の草"で反応
            await message.channel.send(embed=self.SMALL_KUSA_EMBED)
        # await self.bot.process_commands(message)


    @commands.Cog.listener()
    async def on_member_join(self, member: Member):
        if member.bot:
            return
        FARM_SERVER_GUILD = self.bot.get_guild(self.FARM_SERVER_GUILD_ID)
        if member.guild != FARM_SERVER_GUILD:
            print(f'{member.display_name}が来たぜ。')
            # メッセージ出力先のチャンネルを指定
            channel = bot.get_channel(TEST_SERVER_GENERAL_ID)
            # カカポ
            m = 'https://cultofthepartyparrot.com/parrots/hd/reverseparrot.gif'
            # カカポをチャンネルに出力
            await channel.send(m)


    @commands.Cog.listener()
    async def on_member_update(self, before: Member, after: Member):
        """Member がプロフィールを編集したとき呼び出されます。"""
        # うるさいのでコメントアウト
        # print(f'memberが更新したぜ。: {before.display_name}, {before.status}, {before.activity}, {before.nick}, {before.roles}, {before.roles}, {before.pending}→{after.display_name}, {after.status}, {after.activity}, {after.nick}, {after.roles}, {after.roles}, {after.pending}')
        pass


    @commands.Cog.listener()
    async def on_member_remove(self, member: Member):
        if member.bot:
            return
        print(f'{member.display_name}が去ったぜ。')


    @commands.Cog.listener()
    async def on_user_update(self, before: User, after: User):
        print(
            f'userがやったぜ。{before.avatar}, {before.username}, {before.discriminator}→{after.avatar}, {after.username}, {after.discriminator}')

    pass
