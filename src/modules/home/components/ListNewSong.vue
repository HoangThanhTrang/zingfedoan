<template>
  <div class="wrap-list-new-song">
    <div class="be-flex jc-space-between wrap-list">
      <div class="be-flex release-item cursor" v-for="(item, index) in listItem" :key="index">
        <div class="thumbnail" @click="handlePlay(item)">
          <img :src="item.thumbnailM" :alt="item.title" class="img-fluid is-40" />
          <div class="opacity"></div>
          <div class="overlay">
            <base-icon icon="play" style="font-size: 20px; color: #fff" />
          </div>
        </div>
        <div class="content">
          <div class="text-white title">
            <span>{{ item.title }}</span>
            <div class="artists-small">
              <span v-for="(artist, index) in item.artists" :key="artist.id"> {{ index >= item.artists.length - 1 ? artist.name : artist.name + ',' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')
  @Component
  export default class ListNewSong extends Vue {
    @Prop({ required: true, type: Array, default: [] }) listItem!: Array<Record<string, any>>
    @beBase.Action('setcurrentTrack') setcurrentTrack!: (song: Record<string, any>) => void
    @beBase.Action('getRecomendSong') getRecomendSong!: (id: string) => void

    handlePlay(item: Record<string, any>): void {
      this.setcurrentTrack(item)
      this.getRecomendSong(item.encodeId)
    }
  }
</script>

<style scoped lang="scss">
  .wrap-list {
    flex-wrap: wrap;
    .release-item {
      padding: 10px 15px;
      width: 25%;
      border-radius: 5px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.07);
        .opacity {
          visibility: initial !important;
        }
        .overlay {
          opacity: 1 !important;
        }
      }
      .thumbnail {
        overflow: hidden;
        position: relative;
        flex-shrink: 0;

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
</style>
