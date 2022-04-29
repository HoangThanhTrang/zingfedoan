import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class PlayerRepository extends BaseRepository {
  constructor() {
    super('streaming')
  }

  async getLinkStreaming(params?: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}`, { params })
      return result.data
    } catch (error) {
      console.log(error)
    }
  }
}
