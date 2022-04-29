<template>
  <div class="text-white playlist-bar">
    <div class="be-flex mb-2 playlist-bar__tabs">
      <div class="tab-item" :class="activeTab ? 'is-active' : null" @click="activeTab = 1">
        <span>Danh sách phát</span>
      </div>
      <div class="tab-item" :class="!activeTab ? 'is-active' : null" @click="activeTab = 0">
        <span>Nghe gần đây</span>
      </div>
    </div>

    <div v-if="currentTrack.encodeId" class="playlist-bar__list be-scroll-custom">
      <div class="list-recent mb-1">
        <div class="be-flex recent-item recent-item--active">
          <div class="thumbnail cursor">
            <img :src="currentTrack.thumbnailM" :alt="currentTrack.title" class="img-fluid is-40" />
            <div class="opacity"></div>
            <div class="overlay">
              <base-icon icon="play-icon" style="font-size: 20px; color: #fff" />
            </div>
          </div>
          <div class="content">
            <div class="text-white title">
              <span class="break-word-webkit">{{ currentTrack.title }}</span>
              <div class="artists-small">
                <span v-for="(artist, index) in currentTrack.artists" :key="artist.id"> {{ index >= currentTrack.artists.length - 1 ? artist.name : artist.name + ',' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-recent list-recent--scroll">
        <span style="display: block; margin-bottom: 10px; font-weight: 700">Tiếp theo từ gợi ý</span>
        <div class="be-flex recent-item" v-for="(item, index) in recomendList" :key="index">
          <div class="thumbnail cursor" @click="handlePlay(item)">
            <img :src="item.thumbnailM" :alt="item.title" class="img-fluid is-40" />
            <div class="opacity"></div>
            <div class="overlay">
              <base-icon icon="play-icon" style="font-size: 20px; color: #fff" />
            </div>
          </div>
          <div class="content">
            <div class="text-white title">
              <span class="break-word-webkit">{{ item.title }}</span>
              <div class="artists-small break-word-webkit">
                <span v-for="(artist, index) in item.artists" :key="artist.id"> {{ index >= item.artists.length - 1 ? artist.name : artist.name + ',' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="playlist-bar__empty">
      <span class="text-center">Khám phá thêm các bài hát mới của Zing MP3</span>
      <div class="button-play text-white">
        <base-icon icon="triangle" />
        <span> Phát nhạc mới phát hành</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')

  @Component
  export default class SideBarRight extends Vue {
    @beBase.State('playList') playList!: Array<Record<string, any>>
    @beBase.State('currentTrack') currentTrack!: Array<Record<string, any>>
    @beBase.State('recomendList') recomendList!: Array<Record<string, any>>
    @beBase.Action('setcurrentTrack') setcurrentTrack!: (song: Record<string, any>) => void
    @beBase.Action('getRecomendSong') getRecomendSong!: (id: string) => void

    activeTab = 1

    handlePlay(item: Record<string, any>): void {
      this.setcurrentTrack(item)
      this.getRecomendSong(item.encodeId)
    }
  }
</script>

<style scoped lang="scss">
  .playlist-bar {
    position: relative;
    height: 100%;
    padding: 0 10px;
    &__tabs {
      flex: 1 1;
      border-radius: 999px;
      background-color: var(--alpha-bg);
      padding: 5px;
      .tab-item {
        width: 50%;
        text-align: center;
        padding: 5px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
        color: var(--text-color-gray);
        cursor: pointer;
        &:hover {
          color: var(--text-color-white);
        }
      }
      .is-active {
        background-color: var(--bg-tab-active);
        color: var(--text-color-white);
      }
    }

    &__empty {
      position: absolute;
      top: 50%;
      padding: 0 30px;
      transform: translateY(-50%);
      span {
        text-align: center;
        display: block;
        line-height: 1.5;
      }
      .button-play {
        padding: 7px;
        background: #7200a1;
        border-radius: 999px;
        text-align: center;
        margin-top: 10px;
        cursor: pointer;
        span {
          display: inline;
        }
      }
    }

    &__list {
      height: calc(100% - 55px);
      overflow-y: auto;

      .list-recent {
        .recent-item {
          padding: 10px 5px;
          border-radius: 5px;
          margin-bottom: 10px;
          &:hover {
            background-color: rgba(255, 255, 255, 0.253);
            .opacity {
              visibility: initial !important;
            }
            .overlay {
              opacity: 1 !important;
            }
            .thumbnail {
              border-radius: 5px;
            }

            img {
              border-radius: 5px;
            }
          }
          .thumbnail {
            overflow: hidden;
            position: relative;
            flex-shrink: 0;

            img {
              border-radius: 5px;
            }

            .overlay {
              transition: 0.5s ease;
              opacity: 0;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              text-align: center;
            }
            .opacity {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background-color: rgb(0 0 0 / 50%);
              visibility: hidden;
            }
          }
          .content {
            padding-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            .title {
              font-size: 14px;
              font-weight: 500;
              .artists-small {
                font-size: 12px;
                margin-top: 5px;
              }
            }
            .rank {
              justify-content: space-between;
              .number {
                font-size: 36px;
              }
            }
          }
        }
      }

      .recent-item--active {
        background-color: #7200a1;
        margin-bottom: 0;
      }
    }
  }
</style>
