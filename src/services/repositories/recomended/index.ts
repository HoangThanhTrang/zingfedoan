import request from '@/plugins/request'
import { BaseRepository } from '@/services/base'

export default class RecomendedRepository extends BaseRepository {
  constructor() {
    super('recommend')
  }

  async getRecomendSong(params?: Record<string, any>): Promise<any> {
    try {
      const result = await request.get(`${this.prefix}`, { params })
      return result.data
    } catch (error) {
      console.log(error)
    }
  }
}
