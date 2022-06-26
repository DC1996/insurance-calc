/**
 * Utlity class for Date calculation
 */
export class Utils {
  static millisecondsPerDay = 86400000; // 60 * 60 * 24 * 1000

  /**
   * Calculate the difference between two dates inclusively
   * (00:00 start -- 24:00 end)
   *
   * @param {Date} start
   * @param {Date} end
   * @returns Number of days between two specified dates
   */
  static getDifferenceInDays(start, end) {
    return (
      1 + // Add one extra day as the beggining
      Math.round(
        (new Date(end).getTime() - new Date(start).getTime()) /
          Utils.millisecondsPerDay
      )
    );
  }
}
