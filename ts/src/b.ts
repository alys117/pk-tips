interface Fn {
  (a: number, b: string): number[]
}
const fn: Fn = (c, b = 'dfd') => {
  return [1]
}