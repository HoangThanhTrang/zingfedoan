<template>
  <div class="playlist-item cursor" :class="isCarouselChild ? null : 'playlist-item--flex'">
    <div class="thumbnail" @click="handlePlay(item)">
      <img :src="item.thumbnailM || item.thumbnailHasText" :alt="item.title" class="img-fluid" />
      <div v-if="isShowDes" class="opacity"></div>
      <div v-if="isShowDes" class="overlay">
        <base-icon icon="play" style="font-size: 40px; color: #fff" />
      </div>
    </div>
    <div v-if="isShowDes && type !== 'mv'" class="description">
      <span>{{ item.title }}</span>
    </div>
    <div v-if="isShowDes && type === 'mv'" class="description be-flex align-center des-mv">
      <div class="thumb-small">
        <img :src="item.artist.thumbnail" :alt="item.title" class="is-40 is-round" />
      </div>
      <div class="title">
        <span>{{ item.title }}</span>
        <span style="display: block" class="artists-small">
          <span v-for="(artist, index) in item.artists" :key="artist.id"> {{ index >= item.artists.length - 1 ? artist.name : artist.name + ',' }}</span>
        </span>
      </div>
    </div>
    <div v-if="!isCarouselChild" class="artists-small">
      <span v-for="(artist, index) in item.artists" :key="artist.id"> {{ index >= item.artists.length - 1 ? artist.name : artist.name + ',' }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import getRepository from '@/services'
  import AlbumRepository from '@/services/repositories/album'
  import { namespace } from 'vuex-class'
  import _ from 'lodash';

  const beBase = namespace('beBase')

  const apiAlbum: AlbumRepository = getRepository('album')

  @Component
  export default class PlayListItem extends Vue {
    @Prop({ required: true, type: Object, default: {} }) item!: Record<string, any>
    @Prop({ required: false, type: Boolean, default: true }) isCarouselChild!: boolean
    @Prop({ required: false, type: Boolean, default: true }) isShowDes!: boolean
    @Prop({ required: false, type: String, default: '' }) type!: string

    @beBase.Action('setcurrentTrack') setcurrentTrack!: (song: Record<string, any>) => void
    @beBase.Action('getRecomendSong') getRecomendSong!: (id: string) => void
    @beBase.Action('setPlaySong') setPlaySong!: (status: boolean) => void
    @beBase.Action('setRecentlySong') setRecentlySong!: (song: Record<string, any>) => void
    @beBase.State('recentlyList') recentlyList!: Array<Record<string, any>>
    @beBase.State('recomendList') recomendList!: Array<Record<string, any>>
    @beBase.Action('setRecomendSong') setRecomendSong!: (song: Record<string, any>) => void
    @beBase.Action('resetRecentlySong') resetRecentlySong!: (songs: Record<string, any>) => void


    handlePlay(item: Record<string, any>): void {
      if (this.isShowDes) {
        apiAlbum.getListSongAlbum({ id: item.encodeId }).then(res => {
          this.setcurrentTrack(res.items[0])
          if (this.recentlyList) {
            const index = _.findIndex(this.recentlyList, ['encodeId', res.items[0].encodeId])
            if (index === -1) this.setRecentlySong(res.items[0])
          } else {
            this.setRecentlySong(res.items[0])
          }
          console.log('123');
          this.setPlaySong(true)
          this.getRecomendSong(res.items[0].encodeId)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .playlist-item {
    outline: none;
    overflow: hidden;
    .thumbnail {
      overflow: hidden;
      position: relative;
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
        // visibility: hidden;
        // position: absolute;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
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
    .description {
      padding-top: 10px;
      color: var(--text-color-white);
      font-weight: 600;
      &:hover {
        color: var(--link-text-hover);
      }
    }
  }
  .playlist-item--flex {
    width: calc(100% / 5 - 15px);
  }
  .des-mv {
    .thumb-small {
      margin-right: 10px;
    }
    .artists-small {
      margin-top: 5px;
    }
  }
</style>


<style lang="css">
@media screen and (max-width: 575px) {

}
</style>
