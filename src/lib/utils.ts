export function cn(...inputs: (string | string[] | undefined | null | false)[]): string {
  return inputs
    .flat()
    .filter((c): c is string => typeof c === 'string' && c.length > 0)
    .join(' ')
}