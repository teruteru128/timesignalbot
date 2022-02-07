
import imp
import json
import os
import re as regex
import sys
from base64 import b64decode
from datetime import datetime, timedelta, timezone
from random import choice, random

import requests
from discord import ChannelType, Embed, Game, Member, Message, Status, Activity
from discord.ext import commands

from timesignalbot import TimeSignalBot

class KusoCommands(commands.Cog):
    """コマンド詰め合わせ"""

    def __init__(self, bot: TimeSignalBot):
        self.bot = bot

    @commands.command(aliases=['NPS'])
    async def nps(self, ctx: commands.Context):
        """ダイレクトメッセージのみで反応するのん

        DMでだけ反応するコマンドのテストなのん
        """
        if ctx.channel.type == ChannelType.private:
            await ctx.send(f'NPS')

    @commands.command(aliases=['RBZ'])
    async def rbz(self, ctx: commands.Context):
        """ダイレクトメッセージのみで反応します

        DMでだけ反応するコマンドのテスト"""
        if ctx.channel.type == ChannelType.private:
            await ctx.send(f'RBZ')

    @commands.command(aliases=['RZB'])
    async def rzb(self, ctx: commands.Context):
        """ダイレクトメッセージのみで反応します

        DMでだけ反応するコマンドのテスト"""
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
        GENBA_NEKO = ['ヨシ！', 'どうして……', "どうして\n夜中に\n起きてるん\nですか？", "ああああ！\nああああ！\nあああああ！あー！",
                      "オレじゃない\nアイツがやった\nシらない\nスんだこと", "なんだか\n知らんが\nとにかく\nヨシ！", "100万回死んだねこ",
                      "え！！半分の人員で倍の仕事を！？", "弊社なら年内施工も可能です！", "どうして自分が指定した時間にいないんですか:anger:",
                      "よくわからんが、まぁ動いてるからヨシ！", "正月もGWもお盆も普通に働いていた奴らだ。面構えが違う。"]
        for cat in GENBA_NEKO:
            if random() < 0.05:
                list.append(cat)
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

        # for arg in ctx.args:
        # print(type(arg))
        # for sp in arg.split('\\+'):
        #    if sp:
        #        dices.append(sp)

        for dice in dices:
            print(f"dice:{dice}")
        DICE = ['one', 'two', 'three', 'four', 'five', 'six']
        d = choice(DICE)
        await ctx.reply(f":{d}:")

    @commands.command(name=':')
    async def nothing(self, ctx: commands.Context):
        if random() < 0.01:
            ctx.reply("何かすると思ったら大間違いだゾ")
        pass
