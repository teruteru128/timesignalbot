
import json
import os
import re as regex
import sys
from base64 import b64decode
from datetime import datetime, timedelta, timezone
from random import choice, random

import requests
from discord import ChannelType, Embed, Game, Member, Message, Status
from discord.ext import commands


class TimeSignalBot(commands.Bot):
    """時報bot
    
    毎秒チェックさせる処理をこのクラスでできないだろうか、グローバルのloop関数を使うのではなく"""

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
    GAME = Game(name='開発中なのだ')

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
        print(f'timesignalbot: 敷設された地雷：{len(self.MINES)}個')

    # 曜日テキスト
    YOUBI = ['月', '火', '水', '木', '金', '土', '日']

    async def on_connect(self):
        """接続時に呼ばれる関数"""
        print('timesignalbot: 接続しました')

    # discord.Clientのサブクラスにイベントリスナーを仕込む場合はデコレータが不要なんですって
    # https://discordpy.readthedocs.io/ja/latest/api.html?highlight=on_message#event-reference
    async def on_ready(self):
        """起動時に動作する処理"""
        # 起動したらターミナルにログイン通知が表示される
        print('timesignalbot: 準備が完了しました')

    JST_TIMEZONE = timezone(timedelta(hours=9), name='JAPAN')
    LARGE_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')
    LARGE_KUSA_EMBED.set_author(name='ベルサイユの草', url='https://www.nicovideo.jp/watch/sm33789162',
                                icon_url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')
    # LARGE_KUSA_EMBED.set_image(url='https://yukawanet.com/wp-content/uploads/imgs/b/b/bb3fb670.jpg')

    SMALL_KUSA_EMBED = Embed(
        title='https://www.nicovideo.jp/watch/sm33789162')

    MINES_EXPLODE_GIF_URL = "https://tenor.com/view/radiation-atomic-bomb-bomb-boom-nuclear-bomb-gif-13364178"

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
