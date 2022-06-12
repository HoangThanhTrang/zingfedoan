<template>
  <div class="wrap-mix">
    <div class="section-title">
      <span class="text-white">Nghệ Sĩ Zing Choice</span>
    </div>
    <div class="be-flex jc-space-between wrap-list">
      <div class="be-flex release-item cursor" v-for="(item, index) in listItem" :key="index">
        <div class="thumbnail w-100">
          <img :src="item.thumbnailM" :alt="item.title" class="img-fluid" />
          <div class="opacity"></div>
          <div class="overlay">
            <base-icon icon="play" style="font-size: 50px; color: #fff" />
          </div>
        </div>
        <div class="content-mix">
          <div class="text-white title">
            <div class="name-artist">{{ item.artistsNames }}</div>
          </div>
          <div class="be-flex list-artists">
            <img v-for="artist in item.song.items" :key="artist.id" :src="artist.thumbnailM" class="is-80 is-circle-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class ListMix extends Vue {
    @Prop({ required: true, type: Array, default: [] }) listItem!: Array<Record<string, any>>
  }
</script>

<style scoped lang="scss">
  .wrap-list {
    .release-item {
      width: 30%;
      background-color: rgba(255, 255, 255, 0.07);
      border-radius: 5px;
      //   padding-left: 0 15px;
      position: relative;
      &:hover {
        .thumbnail {
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
      }
      .thumbnail {
        overflow: hidden;
        position: relative;
        flex-shrink: 0;

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
      .content-mix {
        position: absolute;
        padding: 10px;
        bottom: 0;
        width: 95%;
        overflow-x: scroll;
        .name-artist {
          font-size: 28px;
          white-space: nowrap;
          overflow: hidden;
          margin-bottom: 10px;
          line-height: 1.2;
          letter-spacing: -1px;
          text-overflow: ellipsis;
          font-weight: 900;
        }
        .list-artists {
          img {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
