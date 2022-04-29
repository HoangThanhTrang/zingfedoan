<template>
  <div class="wrap-list-release">
    <div class="section-title">
      <span class="text-white">Mới Phát Hành</span>
    </div>
    <div class="be-flex jc-space-between wrap-list">
      <div class="be-flex release-item" v-for="(item, index) in getTopRelease" :key="index">
        <div class="thumbnail cursor" @click="handlePlay(item)">
          <img :src="item.thumbnailM" :alt="item.title" class="img-fluid is-120" />
          <div class="opacity"></div>
          <div class="overlay">
            <base-icon icon="play" style="font-size: 40px; color: #fff" />
          </div>
        </div>
        <div class="content">
          <div class="text-white title">
            <span>{{ item.title }}</span>
            <div class="artists-small">
              <span v-for="(artist, index) in item.artists" :key="artist.id"> {{ index >= item.artists.length - 1 ? artist.name : artist.name + ',' }}</span>
            </div>
          </div>
          <div class="be-flex align-center rank">
            <span class="number" :class="'top-' + (index + 1)">#{{ index + 1 }}</span>
            <div class="artists-small date-release">{{ (item.releasedAt + '000') | formatDateTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import PlayListItem from '@/components/playlist/PlaylistItem.vue'

  //@ts-ignore
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  @Component({ components: { VueSlickCarousel, PlayListItem } })
  export default class ListRelease extends Vue {
    @Prop({ required: true, type: Array, default: [] }) listItem!: Array<Record<string, any>>

    @beBase.Action('setcurrentTrack') setcurrentTrack!: (song: Record<string, any>) => void
    @beBase.Action('getRecomendSong') getRecomendSong!: (id: string) => void

    get getTopRelease(): Array<Record<string, any>> {
      return this.listItem.splice(0, 3)
    }

    activeTab = 1

    handlePlay(item: Record<string, any>): void {
      this.setcurrentTrack(item)
      this.getRecomendSong(item.encodeId)
    }
  }
</script>

<style scoped lang="scss">
  .wrap-list {
    .release-item {
      padding: 10px 15px;
      width: 25%;
      background-color: rgba(255, 255, 255, 0.07);
      border-radius: 5px;
      .thumbnail {
        overflow: hidden;
        position: relative;
        flex-shrink: 0;
        &:hover {
          img {
            transform: scale(1.2);
          }
          .opacity {
            visibility: initial;
          }
          .overlay {
            opacity: 1;
          }
        }
        img {
          transition: transform 0.8s ease;
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
          font-size: 16px;
          font-weight: 700;
          .artists-small {
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
</style>
