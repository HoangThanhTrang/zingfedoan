export function calPercent(num: number, total: number): string {
  return Math.ceil((num / total) * 100) + '%'
}

export function formatDateTime(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(+value)
  return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.' + date.getFullYear()
}

export function formatTimeTotal(time: number): string | number {
  const minutes: any = Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
  const seconds: any = time % 60 >= 10 ? time % 60 : '0' + (time % 60)
  return minutes + ':' + seconds
}
