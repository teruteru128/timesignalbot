const JST_OFFSET_HOURS = 9;
const PATTERN = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;

/**
 * 日本時間の日時文字列を Date に変換する。
 * 受け付ける形式: "2026-12-31 23:59", "2026/12/31 23:59:59", "2026-12-31T23:59:59"
 * @param {string} text
 * @returns {Date | null} 形式が正しくないか、存在しない日時の場合は null
 */
function parseJstDateTime(text) {
  const match = PATTERN.exec(text.trim());
  if (match === null) {
    return null;
  }
  const [year, month, day, hour, minute, second] = match.slice(1).map((value) => Number(value ?? 0));
  const date = new Date(Date.UTC(year, month - 1, day, hour - JST_OFFSET_HOURS, minute, second));
  // 2月30日や25時などは Date.UTC が繰り上げてしまうので、元の値と一致するか確かめる
  const jst = new Date(date.getTime() + JST_OFFSET_HOURS * 60 * 60 * 1000);
  if (jst.getUTCFullYear() !== year || jst.getUTCMonth() !== month - 1
    || jst.getUTCDate() !== day || jst.getUTCHours() !== hour
    || jst.getUTCMinutes() !== minute || jst.getUTCSeconds() !== second) {
    return null;
  }
  return date;
}

module.exports.parseJstDateTime = parseJstDateTime;
