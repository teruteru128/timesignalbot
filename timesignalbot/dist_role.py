# dist_role

import os
import discord

TOKEN = os.environ['DISCORD_TOKEN']

client = discord.Client()

SERVER_ID = 795353457996595200
BENKI_ROLE_ID = 798872382566694943

client.login(TOKEN)
client.connect()
client.start()
guild = client.get_guild(SERVER_ID)
benki = guild.get_role(BENKI_ROLE_ID)
for member in guild.members:
    if benki not in member.roles:
        member.add_member(benki)
