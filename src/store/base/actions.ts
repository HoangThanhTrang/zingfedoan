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
      commit('SET_RECOMEND_SONG', result)
      commit('SET_RECOMEND_SONG_BF', result?.items)
    } catch (error) {
      console.log(error)
    }
  },

  setRecomendSong({commit}, list) {
    commit('SET_RECOMEND_SONG', list)
  },

  setRecentlySong({commit}, song) {
    commit('SET_RECENTLY_SONGS', song)
  },

  resetRecentlySong({commit}, songs) {
    commit('RESET_RECENTLY_SONGS', songs)
  }
}

export default actions
