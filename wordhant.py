
from discord import Message
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

    pass
