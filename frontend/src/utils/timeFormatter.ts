/**
 * Форматирует время в секундах в формат "00ч 00м 00с"
 * @param totalSeconds - общее количество секунд
 * @returns отформатированная строка времени
 */
export function formatTimeWithSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}ч ${minutes.toString().padStart(2, '0')}м ${seconds.toString().padStart(2, '0')}с`;
}

/**
 * Форматирует время в минутах в формат "00ч 00м"
 * @param totalMinutes - общее количество минут
 * @returns отформатированная строка времени
 */
export function formatTimeWithMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours.toString().padStart(2, '0')}ч ${minutes.toString().padStart(2, '0')}м`;
}

/**
 * Форматирует дату в формат времени с точностью до минуты (HH:mm)
 * @param date - объект Date
 * @returns отформатированная строка времени
 */
export function formatTimeToMinute(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

