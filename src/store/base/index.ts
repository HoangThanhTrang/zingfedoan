import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export interface ISBase {
  // popup: string[]
  currentTrack: Record<string, any>
  isPlay: boolean
  playList: Array<Record<string, any>>
  recomendList: Array<Record<string, any>>
}

const state: ISBase = {
  // popup: [],
  currentTrack: {},
  isPlay: false,
  playList: [],
  recomendList: []
}

const beBase: Module<ISBase, unknown> = {
  namespaced: true,
  state,
  actions,
  mutations
}

export default beBase
