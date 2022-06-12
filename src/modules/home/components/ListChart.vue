<template>
  <div class="wrap-chart">
    <div class="be-flex align-center jc-space-between section-title">
      <span class="text-white">#Zingchart</span>
      <span class="text-white more">Xem thêm</span>
    </div>
    <div class="be-flex jc-space-between list-chart">
      <div v-for="(item, index) in getTopChart" :key="index" class="be-flex align-center jc-space-between chart-item">
        <div class="be-flex align-center chart-item__left">
          <div class="number" :class="'top-' + (index + 1)">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="cursor thumb">
            <img :src="item.thumbnailM" :alt="item.title" class="img-fluid is-60" />
            <div class="opacity"></div>
            <div class="overlay">
              <base-icon icon="play-small" style="font-size: 40px; color: #fff" />
            </div>
          </div>
          <div class="text-white song-info">
            <div class="song-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="artists-small">
              <span v-for="(artist, index) in item.artists" :key="artist.id"> {{ index >= item.artists.length - 1 ? artist.name : artist.name + ',' }}</span>
            </div>
          </div>
        </div>
        <div class="text-white chart-item__right">
          <span>{{ calPercent(item.score) }}</span>
        </div>
      </div>
    </div>
    <div class="be-flex mt-2 jc-space-between list-banner">
      <div v-for="(item, index) in listBanner" :key="index" class="banner-item">
        <img :src="item.cover" :alt="item.cover" class="img-fluid" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ListChart extends Vue {
    @Prop({ required: true, type: Array, default: [] }) listChart!: Array<Record<string, any>>
    @Prop({ required: true, type: Array, default: [] }) listBanner!: Array<Record<string, any>>
    @Prop({ required: true, type: Number, default: 0 }) totalScore!: number

    get getTopChart(): Array<Record<string, any>> {
      return this.listChart.slice(0, 3)
    }

    calPercent(num: number): string {
      return Math.ceil((num / this.totalScore) * 100) + '%'
    }
  }
</script>

<style scoped lang="scss">
  .more {
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: var(--link-text-hover);
      text-decoration: underline;
    }
  }
  .list-chart {
    .chart-item {
      padding: 10px 15px;
      border-radius: 5px;
      background-color: hsla(0, 0%, 100%, 0.07);
      width: 25%;
      &:hover {
        background-color: #ffffff30;
      }
      &__left {
        .thumb {
          margin: 0 15px;
          position: relative;
          &:hover {
            .overlay {
              opacity: 1;
            }
            .opacity {
              visibility: inherit;
            }
          }
          .overlay {
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
        .song-info {
          .song-title {
            span {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
          .artists-small {
            font-size: 12px;
          }
        }
      }
      &__right {
        font-weight: 600;
        font-size: 16px;
        padding-left: 5px;
      }
    }
  }
  .list-banner {
    .banner-item {
      width: calc(25% + 30px);
      cursor: pointer;
      overflow: hidden;
      border-radius: 5px;
      &:hover {
        img {
          transform: scale(1.2);
          border-radius: 5px;
        }
      }

      img {
        transition: transform 0.5s ease;
        border-radius: 5px;
      }
    }
  }
</style>

<style lang="css">
@media screen and (max-width: 1600px) {
  .list-chart .chart-item {
    display: block;
  }

  .list-chart .chart-item .chart-item__left {
    display: block;
  }

  .list-chart .chart-item__left .thumb {
    margin: 0;
  }

  .list-chart .chart-item__left .thumb img {
    width: 100%;
    height: 100%;
  }

  .list-banner .banner-item {
    width: 25% !important;
  }

}


</style>
