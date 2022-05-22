<template>
  <div class="container new-release-chart-container">
    <div class="new-release-chart-header">
      <div class="title">
        <h3 class="mar-0 title">Mới phát hành</h3>
        <button class="zm-btn button" tabindex="0"><i class="icon ic-play"></i></button>
      </div>
    </div>
    <div class="list mar-b-20">
      <div class="chart-song-item" v-for="(item, key) in data" :key="key">
        <div class="list-item bor-b-1 media-item hide-right">
          <div class="media">
            <div class="media-left">
              <div class="song-prefix mar-r-15">
                <span class="number is-top-100 is-center mar-r-5" :class="showClassTop(key + 1)">{{ key + 1 }}</span>
                <div class="sort" v-if="item.rakingStatus !== 0">
                  <i class="icon green is-18x18 is-center ic-up" v-if="item.rakingStatus > 0"></i>
                  <i class="icon red is-18x18 is-center ic-down" v-else></i>
                  <span class="sort-num is-18x18 is-center">{{Math.abs(item.rakingStatus)}}</span>
                </div>
                <div class="sort" v-else><i class="icon is-18x18 is-center grey ic-balance"></i></div>
              </div>
              <div class="song-thumb" @click="playSong(key)">
                <figure class="image is-40x40" :title="item.title"><img :src="item.thumbnail ? item.thumbnail : null" alt="" /></figure>
                <div class="opacity"></div>
                <div class="zm-actions-container">
                  <div class="zm-box zm-actions">
                    <span class="is-hidden"
                      ><button class="zm-btn zm-tooltip-btn is-hidden is-hover-circle button" tabindex="0"><i class="icon ic-like"></i></button
                    ></span>
                    <button class="zm-btn action-play button" tabindex="0"><i class="icon action-play ic-play"></i></button>
                    <button class="zm-btn zm-tooltip-btn is-hidden is-hover-circle button" tabindex="0"><i class="icon ic-more"></i></button>
                  </div>
                </div>
              </div>
              <div class="card-info">
                <div class="title-wrapper">
                  <span class="item-title title"
                    ><span
                      ><span
                        ><span>{{ item.title }}</span></span
                      ><span style="position: fixed; visibility: hidden; top: 0px; left: 0px">…</span></span
                    ></span
                  >
                </div>
                <h3 class="is-one-line is-truncate subtitle">
                  <a class="is-ghost" href="/nghe-si/Viet-Long">{{ item.artistsNames }}</a>
                </h3>
              </div>
            </div>
            <div class="media-content">
              <div class="album-info">
                <span
                  ><span
                    ><span>{{ item.album && item.album.title ? item.album.title : null }}</span></span
                  ><span style="position: fixed; visibility: hidden; top: 0; left: 0">…</span></span
                >
              </div>
            </div>
            <div class="media-right">
              <div class="hover-items">
                <div class="level">
                  <div class="level-item"></div>
                  <div class="level-item">
                    <button class="zm-btn zm-tooltip-btn is-hover-circle button" tabindex="0"><i class="icon ic-karaoke"></i></button>
                  </div>
                  <div class="level-item">
                    <span
                      ><button class="zm-btn zm-tooltip-btn is-hover-circle button" tabindex="0"><i class="icon ic-like"></i></button
                    ></span>
                  </div>
                  <div class="level-item">
                    <button class="zm-btn zm-tooltip-btn is-hover-circle button" tabindex="0"><i class="icon ic-more"></i></button>
                  </div>
                </div>
              </div>
              <div class="action-items">
                <div class="level">
                  <div class="level-item">
                    <span
                      ><button class="zm-btn zm-tooltip-btn is-hover-circle button" tabindex="0"><i class="icon ic-like"></i></button
                    ></span>
                  </div>
                  <div class="level-item duration">{{ duration(item.duration) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import NewReleaseChartRepository from '@/services/repositories/new-release'
  import getRepository from '@/services'
  import moment from 'moment'
  import {namespace} from "vuex-class";
  import AlbumRepository from '@/services/repositories/album'

  const beBase = namespace('beBase')
  const newReleaseChartRepository: NewReleaseChartRepository = getRepository('newrelease-chart')
  const apiAlbum: AlbumRepository = getRepository('album')

  @Component({
    components: {}
  })
  export default class NewRelease extends Vue {
    data: Array<Record<string, any>> = []
    @beBase.Action('setcurrentTrack') setcurrentTrack!: (song: Record<string, any>) => void
    @beBase.Action('getRecomendSong') getRecomendSong!: (id: string) => void
    @beBase.Action('setPlaySong') setPlaySong!: (status: boolean) => void
    @beBase.Action('setRecomendSong') setRecomendSong!: (list: Record<string, any>) => void


    created(): void {
      newReleaseChartRepository.getNewRelease().then((res: any) => {
        this.data = [...res.items]
        console.log(this.data)
        // this.banner = filter(res.items, item => item.sectionType === 'banner')[0]
        // this.suggestList = filter(res.items, item => item.sectionId === 'hSuggestPl')[0]
        // this.selectTodayList = filter(res.items, item => item.sectionId === 'hAutoTheme1')[0]
      })
    }

    //calulate duration minutes to string

    duration(duration: number): string {
      const time = moment.duration(duration, 'seconds')
      const seconds = time.seconds() > 10 ? time.seconds() : '0' + time.seconds()
      return '0' + time.minutes() + ':' + seconds
    }

    showClassTop(num: number): string {
      if (num === 1) return 'is-top-1'
      if (num === 2) return 'is-top-2'
      if (num === 3) return 'is-top-3'
      return ''
    }

    showClassByStatusRank(rank: number) {
      console.log(rank)
      if (rank > 0) return { icUp: 'ic-up', green: 'green' }
      return {}
    }

    playSong(key: number) {
      apiAlbum.getListSongAlbum({ id: 'ZDB6EB9C' }).then(res => {
        console.log(res)
        this.setcurrentTrack(res.items[key])
        this.setPlaySong(true)
        this.setRecomendSong(res.items)
        // this.getRecomendSong('ZDB6EB9C')
      })
    }
  }
</script>
<style scoped>
  @import url('.././assets/css/custom.css');

  .new-release-chart-container .new-release-chart-header .title {
    color: #fff;
  }

  .media-item .media-left .title-wrapper .title {
    color: #fff;
  }

  .subtitle.is-one-line a {
    color: hsla(0, 0%, 100%, 0.5);
  }

  .is-center {
    /*color: #fff;*/
  }

  .media-item .album-info {
    color: hsla(0, 0%, 100%, 0.5);
  }

  .new-release-chart-container {
    padding: 130px 0 50px;
    margin-top: -120px;
  }

  .song-prefix .sort {
    color: #fff;
  }

  .media-item .media-right .duration {
    color: hsla(0, 0%, 100%, 0.5);
  }

  .chart-song-item .number {
    color: rgba(74, 144, 226, 0);
  }

  .chart-song-item .number {
    -webkit-text-stroke: 1.5px #fff;
    color: rgba(74, 144, 226, 0);
    min-width: 60px;
  }

  .chart-song-item .number.is-top-1 {
    -webkit-text-stroke: 1px #4a90e2;
    opacity: 1;
  }
  .chart-song-item .number.is-top-1,
  .chart-song-item .number.is-top-2,
  .chart-song-item .number.is-top-3 {
    color: rgba(74, 144, 226, 0);
    opacity: 1;
  }

  .chart-song-item .number.is-top-2 {
    -webkit-text-stroke: 1px #50e3c2;
  }

  .chart-song-item .number.is-top-3 {
    -webkit-text-stroke: 1px #e35050;
    opacity: 1;
  }

  .top-new-relesase-container .chart-song-item .number {
    min-width: 60px;
  }

  .song-prefix .grey {
    color: hsla(0,0%,100%,0.5);;
  }
</style>
