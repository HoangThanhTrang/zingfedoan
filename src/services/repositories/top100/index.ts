import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class Top100Repository extends BaseRepository {
  constructor() {
    super('top-100')
  }

  async getTop100(params?: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}`, { params })
      return result.data
    } catch (error) {
      console.log(error)
    }
  }
}
