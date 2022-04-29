import { MutationTree } from 'vuex'
import { ISBase } from '.'

const mutations: MutationTree<ISBase> = {
  // SET_OPEN_POPUP: (state, data: { popupName: string; isOpen: boolean }) => {
  //   if (data.isOpen) {
  //     state.popup = union(state.popup, [data.popupName])
  //   } else {
  //     state.popup = filter(state.popup, value => {
  //       return value !== data.popupName
  //     })
  //   }
  // }
  SET_DETAI_SONG: (state, song) => {
    state.currentTrack = song
  },
  SET_PLAY_SONG: (state, status) => {
    state.isPlay = status
  },
  SET_RECOMEND_SONG: (state, data) => {
    state.recomendList = data.items
  }
}
export default mutations
