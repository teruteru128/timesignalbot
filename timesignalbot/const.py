
from datetime import timedelta, timezone

from discord import Embed

COMMAND_PREFIX = '/'
"""コマンドプレフィックス"""

JST_TIMEZONE = timezone(timedelta(hours=9), name='JAPAN')
"""タイムゾーンオブジェクト(現在時刻取得用)

日本時間タイムゾーン情報"""

MAYONAKA_HEADER = '真夜中'
GETSUYOU_HEADER = '月曜日'
HARUTO = 'だよハルト'

# TODO: #1 ID関係をDBとかに移してハードコードしない
# 各種定数
FARM_SERVER_GUILD_ID = 572150608283566090
# SABAKAN_ROLE = FARM_SERVER_GUILD.get_role(572157809399955456)
FARN_SERVER_INITIALLY_SPAWN_ID = 572151278428225537
SANDBOX_SERVER_GENERAL_ID = 838388401592991747
TEST_SERVER_GUILD_ID = 879315010218774528
TEST_SERVER_GENERAL_ID = 879315010218774531
TAMOKUTEKI_TOIRE_TAMOKUTEKI_TOIRE_ID = 796357249743585290
TAMOKUTEKI_TOIRE_SERVER_ID = 795353457996595200

# アクティビティ
#unser_development = discord.CustomActivity("開発中なのだ", emoji='🚀', state='開発中なのだ', type=discord.ActivityType.custom)
#unser_development2 = discord.Activity(name="開発中なのだ")
#GAME = Game(name='開発中なのだ')

YOUBI = ['月', '火', '水', '木', '金', '土', '日']
""" 曜日テキスト """


LARGE_KUSA_EMBED = Embed(title='https://www.nicovideo.jp/watch/sm33789162')
LARGE_KUSA_EMBED.set_author(name='ベルサイユの草', url='https://www.nicovideo.jp/watch/sm33789162',
                            icon_url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
# LARGE_KUSA_EMBED.set_image(url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')

SMALL_KUSA_EMBED = Embed(
    title='https://www.nicovideo.jp/watch/sm33789162')

MINES_EXPLODE_GIF_URL = "https://tenor.com/view/radiation-atomic-bomb-bomb-boom-nuclear-bomb-gif-13364178"
