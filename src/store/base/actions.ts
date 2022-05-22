import { ActionTree } from 'vuex'
import { ISBase } from '.'
import getRepository from '@/services'
import RecomendRepository from '@/services/repositories/recomended'
const apiRecomend: RecomendRepository = getRepository('recomended')

const actions: ActionTree<ISBase, unknown> = {
  // setOpenPopup({ commit }, data: { popupName: string; isOpen: string }) {
  //   commit('SET_OPEN_POPUP', data)
  // }
  setcurrentTrack({ commit }, song) {
    commit('SET_DETAI_SONG', song)
  },
  setPlaySong({ commit }, status) {
    commit('SET_PLAY_SONG', status)
  },
  async getRecomendSong({ commit }, id) {
    try {
      const params = { id }
      const result = await apiRecomend.getRecomendSong(params)
      console.log(result, 'result')
      commit('SET_RECOMEND_SONG', result)
    } catch (error) {
      console.log(error)
    }
  },

  setRecomendSong({commit}, list) {
    console.log('11', list)
    commit('SET_RECOMEND_SONG', list)

  }
}

export default actions
