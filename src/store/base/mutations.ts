import { MutationTree } from 'vuex'
import { ISBase } from '.'
import { shuffle, map } from "lodash";

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
  },
  SET_RECENTLY_SONGS: (state, song) => {
    state.recentlyList.push(song)
  },

  RESET_RECENTLY_SONGS: (state, songs) => {
    state.recentlyList = songs
  },
  SET_REPEAT_SONG : (state, val) => {
    state.repeat = val;
  },
  SET_SHUFFLE_SONG: (state) => {
    state.shuffle = !state.shuffle;
    if (state.shuffle) {
      state.recomendList = shuffle(state.recomendList)
    } else {
      const songRecently = map(state.recentlyList, 'encodeId');
      const listFiltered =  state.recommendSongsBf?.filter((song) => !songRecently.includes(song.encodeId));
      state.recomendList = listFiltered;
    }
  },
  SET_RECOMEND_SONG_BF: (state, data) => {
    state.recommendSongsBf = data
  },
}
export default mutations
