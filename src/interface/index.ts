export interface IQuery {
  page: number
  limit?: number
  search?: string
  [x: string]: any
}
