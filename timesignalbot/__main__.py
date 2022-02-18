
import os
from locale import LC_ALL, setlocale

from discord import Intents

from .kusocommands import KusoCommands
from .minesweeper import MinesweepingCog
from .timesignalbot import TimeSignalBot
from .timesignalcog import TimeSignalCog
from . import const

setlocale(LC_ALL, '')

# 自分のBotのアクセストークンに置き換えてください
TOKEN = os.environ.get('DISCORD_TOKEN', '')

if len(TOKEN) == 0:
    print('DISCORD_TOKEN is EMPTY!')
    exit(1)

COMMAND_PREFIX = '/'
"""コマンドプレフィックス"""


def main():
    # 接続に必要なオブジェクトを生成
    bot = TimeSignalBot(command_prefix=COMMAND_PREFIX,
                        intents=Intents.all(), case_insensitive=True)

    # コグ登録
    bot.add_cog(KusoCommands(bot))
    bot.add_cog(MinesweepingCog(bot))
    bot.add_cog(TimeSignalCog(bot))
    # Botの起動とDiscordサーバーへの接続
    bot.run(TOKEN)
    # bot.connect(reconnect=True)
    # bot.login(token=TOKEN)


if __name__ == '__main__':
    main()
