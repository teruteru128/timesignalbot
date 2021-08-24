
import discord
from discord.ext import tasks, commands
from datetime import datetime, timezone, timedelta
from random import random
import re as regex
import os

# 自分のBotのアクセストークンに置き換えてください
TOKEN = os.environ['DiscordToken']

# 接続に必要なオブジェクトを生成
bot = commands.Bot(command_prefix='/', intents=discord.Intents.all())

jst = timezone(timedelta(hours=9), name='JAPAN')
FARM_SERVER_GUILD_ID = 572150608283566090
FARM_SERVER_GUILD = bot.get_guild(FARM_SERVER_GUILD_ID)
#SABAKAN_ROLE = FARM_SERVER_GUILD.get_role(572157809399955456)


@bot.command()
async def nullpo(ctx: commands.Context):
    await ctx.message.channel.send("ｶﾞｯ")


@bot.command()
async def kokorozashi(ctx: commands.Context):
    await ctx.send("NG")


@bot.command()
async def neko(ctx: commands.Context):
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
game = discord.Game(name='開発中なのだ')


@bot.event
async def on_ready():
    """起動時に動作する処理"""
    # 起動したらターミナルにログイン通知が表示される
    await bot.change_presence(activity=game, status=discord.Status.online)
    print('ログインしました')


youbi = ['月', '火', '水', '木', '金', '土', '日']

LARGE_KUSA_EMBED = discord.Embed(
    title='https://www.nicovideo.jp/watch/sm33789162')
LARGE_KUSA_EMBED.set_author(name='test', url='https://www.nicovideo.jp/watch/sm33789162',
                            icon_url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
LARGE_KUSA_EMBED.set_image(
    url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')

SMALL_KUSA_EMBED = discord.Embed(
    title='https://www.nicovideo.jp/watch/sm33789162')


@bot.event
async def on_message(message: discord.Message):
    """メッセージ受信時に動作する処理"""
    # メッセージ送信者がBotだった場合は無視する
    if message.author.bot:
        return
    if message.content == 'やったぜ。':
        now = datetime.now(jst)
        await message.channel.send(f"投稿者：{message.author.display_name} （{now.month}月{now.day}日（{youbi[now.weekday()]}）{now.hour}時{now.minute}分{now.second}秒）")
    if 'SEックス' in message.content:
        await message.channel.send('やめないか！')
    if '草' in message.content and message.guild != FARM_SERVER_GUILD:  # ファーム鯖以外では"草"で反応
        await message.channel.send(embed=LARGE_KUSA_EMBED)
    if '草草の草' in message.content and message.guild == FARM_SERVER_GUILD:  # ファーム鯖のみ"草草の草"で反応
        await message.channel.send(embed=SMALL_KUSA_EMBED)
        # await message.channel.send('https://www.nicovideo.jp/watch/sm33789162')
    await bot.process_commands(message)


@bot.event
async def on_member_join(member: discord.Member):
    if member.bot:
        return
    if member.guild != FARM_SERVER_GUILD:
        print(f'{member.display_name}が来たぜ。')
        # メッセージ出力先のチャンネルを指定
        channel = bot.get_channel(879315010218774531)
        # カカポ
        m = 'https://cultofthepartyparrot.com/parrots/hd/reverseparrot.gif'
        # カカポをチャンネルに出力
        await channel.send(m)


@bot.event
async def on_member_update(befoer: discord.Member, after: discord.Member):
    print('memberが更新したぜ。')


@bot.event
async def on_member_remove(member: discord.Member):
    if member.bot:
        return
    print(f'{member.display_name}が去ったぜ。')


@bot.event
async def on_user_update(before: discord.User, after: discord.User):
    print('userがやったぜ。')


@tasks.loop(seconds=1)
async def loop():
    sandbox_server = bot.get_channel(838388401592991747)
    test_server = bot.get_channel(879315010218774531)
    farn_server = bot.get_channel(572151278428225537)
    now = datetime.now(jst)
    strtime = now.strftime('%H:%M:%S')
    if now.hour == 0 and now.minute == 0 and now.second == 0:
        await sandbox_server.send('真夜中だよハルトオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオ')
        await test_server.send('真夜中だよハルトオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオ')
        await farn_server.send('真夜中だよハルトオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオ')
    if (now.hour == 3 or now.hour == 15) and now.minute == 34 and now.second == 0:
        await sandbox_server.send('334')
        await test_server.send('334')
    if now == '07:00:00':
        await sandbox_server.send('おはよう')
        await test_server.send(':hoayou:')

loop.start()
# Botの起動とDiscordサーバーへの接続
bot.run(TOKEN)
