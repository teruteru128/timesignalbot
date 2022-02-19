
import os
from locale import LC_ALL, setlocale

from discord import Intents

from .kusocommands import KusoCommands
from .minesweeper import MinesweepingCog
from .timesignalbot import TimeSignalBot
from .timesignalcog import TimeSignalCog

setlocale(LC_ALL, '')

DISCORD_TOKEN = os.environ.get('DISCORD_TOKEN', '')
"""Discord token

自分のBotのアクセストークンを環境変数の`DISCORD_TOKEN`にセットしてください"""

if len(DISCORD_TOKEN) == 0:
    print('DISCORD_TOKEN is EMPTY!')
    exit(1)

COMMAND_PREFIX = os.environ.get('COMMAND_PREFIX', '/')
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
    bot.run(DISCORD_TOKEN)
    # bot.connect(reconnect=True)
    # bot.login(token=TOKEN)


if __name__ == '__main__':
    main()
