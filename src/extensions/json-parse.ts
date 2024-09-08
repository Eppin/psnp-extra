/* Need to find a proper solution */
export function parseJSON<T>(value: string): T {
  return JSON.parse(value) as T;
}
