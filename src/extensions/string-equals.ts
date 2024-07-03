export function stringEquals (valueA: string, valueB: string): boolean {
  return valueA.localeCompare(valueB, undefined, { sensitivity: 'accent' }) === 0;
}
