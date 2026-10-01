/**
 * コマンドを実行した人が、指定したチャンネルで権限を持っているか確かめる。
 * コマンドを実行したチャンネルとは別のチャンネルを操作できるので、
 * 操作対象のチャンネルで改めて確かめないと、チャンネルごとの権限設定をすり抜けられる。
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 * @param {import('discord.js').GuildChannel} channel
 * @param {import('discord.js').PermissionResolvable} permissions
 */
function memberCan(interaction, channel, permissions) {
  return channel.permissionsFor(interaction.member)?.has(permissions) ?? false;
}

module.exports.memberCan = memberCan;
