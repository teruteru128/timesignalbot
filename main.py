
import discord
from discord.ext import tasks, commands
from datetime import datetime, timezone, timedelta
import random
import re as regex
import os

# 自分のBotのアクセストークンに置き換えてください
TOKEN = os.environ['DiscordToken']

# 接続に必要なオブジェクトを生成
bot = commands.Bot(command_prefix='/')
bot.guild_subscriptions = True

jst = timezone(timedelta(hours=9), name='JAPAN')
FARM_SERVER_GUILD = bot.get_guild(572150608283566090)
SABAKAN_ROLE = FARM_SERVER_GUILD.get_role(572157809399955456)


@bot.command()
async def nullpo(ctx):
    ctx.message.channel.send("ｶﾞｯ")


@bot.command()
async def kokorozashi(ctx):
    ctx.message.channel.send("NG")


@bot.command()
async def neko(ctx):
    rand = random.random()
    if 0 <= rand and rand < 0.001:
        next = 'ねこですよろしくおねがいします'
    elif(0.001 <= rand and rand < 0.05):
        if random.random() <= 0.5:
            next = 'ヨシ！'
        else:
            next = 'どうして……'
    else:
        next = 'にゃーん'
    #next = 'ねこですよろしくおねがいします' if random.random() <= 0.05 else 'にゃーん'


# 起動時に動作する処理
@bot.event
async def on_ready():
    # 起動したらターミナルにログイン通知が表示される
    unser_development = discord.CustomActivity(
        "開発中なのだ", emoji='🚀', state='開発中なのだ', type=discord.ActivityType.custom)
    unser_development2 = discord.Activity(name="開発中なのだ")
    game = discord.Game(name='開発中なのだ')
    await bot.change_presence(activity=game, status=discord.Status.online)
    print('ログインしました')


# メッセージ受信時に動作する処理
@bot.event
async def on_message(message):
    # メッセージ送信者がBotだった場合は無視する
    if message.author.bot:
        return
    if message.content == 'やったぜ。':
        youbi = ['月', '火', '水', '木', '金', '土', '日']
        now = datetime.now(jst)
        await message.channel.send("投稿者：{} （{}月{}日（{}）{}時{}分{}秒）".format(
            message.author.display_name,
            now.month, now.day, youbi[now.weekday()],
            now.hour, now.minute, now.second))
    if 'SEックス' in message.content:
        await message.channel.send('やめないか！')
    if '草' in message.content and message.guild.id != 572150608283566090:
        embed = discord.Embed(
            title='https://www.nicovideo.jp/watch/sm33789162')
        embed.set_author(name='test', url='https://www.nicovideo.jp/watch/sm33789162',
                         icon_url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
        embed.set_image(
            url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
        await message.channel.send(embed=embed)
    if '草草の草' in message.content and message.guild.id == 572150608283566090:  # ファーム鯖のみ
        embed = discord.Embed(
            title='https://www.nicovideo.jp/watch/sm33789162')
        await message.channel.send(embed=embed)
        # await message.channel.send('https://www.nicovideo.jp/watch/sm33789162')


@bot.event
async def on_member_join(member):
    if member.bot:
        return
    print(member.display_name)
    print('来たぜ。')


@bot.event
async def on_member_update(befoer, after):
    print('memberが更新したぜ。')


@bot.event
async def on_member_remove(member):
    if member.bot:
        return
    print(member.display_name)
    print('去ったぜ。')


@bot.event
async def on_user_update(before, after):
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
