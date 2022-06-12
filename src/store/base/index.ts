import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface ISBase {
  // popup: string[]
  currentTrack: Record<string, any>
  isPlay: boolean
  playList: Array<Record<string, any>>
  recomendList: Array<Record<string, any>>
  recentlyList: Array<Record<string, any>>
  repeat: string,
  shuffle: boolean,
  recommendSongsBf: []
}
enum Repeat {
  None = 'none',
  One = 'one',
  All = 'all',
}

const state: ISBase = {
  // popup: [],
  currentTrack: {},
  isPlay: false,
  playList: [],
  recomendList: [],
  recentlyList: [],
  repeat: Repeat.None,
  shuffle: false,
  recommendSongsBf: []
}

const beBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default beBase
