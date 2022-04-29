<template>
  <div class="be-flex align-center control-player">
    <div class="be-flex align-center control-player__description">
      <div class="thumbnail" :class="audioPlay ? 'is-audio-play' : null">
        <img :src="currentTrack.thumbnail" :alt="currentTrack.title" class="is-60 is-round" />
      </div>
      <div class="text-white title">
        <span>{{ currentTrack.title }}</span>
        <div class="artists-small">
          <span> {{ currentTrack.artistsNames }}</span>
        </div>
      </div>
    </div>
    <div class="control-player__bar">
      <div class="level-item">
        <div class="be-flex align-center btn-actions">
          <div class="icon-item text-white cursor">
            <base-icon icon="shuffle-icon" class="icon" style="font-size: 22px" />
          </div>
          <div class="icon-item text-white cursor">
            <base-icon icon="previous-icon" class="icon" style="font-size: 16px; padding: 6px 8px" />
          </div>
          <div class="icon-item text-white cursor" @click="onPlay">
            <base-icon v-if="audioPlay" icon="pause-icon" class="play-icon" style="font-size: 40px" />
            <base-icon v-else icon="play-icon" class="play-icon" style="font-size: 40px" />
          </div>
          <div class="icon-item text-white cursor">
            <base-icon icon="next-icon" class="icon" style="font-size: 16px; padding: 6px 8px" />
          </div>
          <div class="icon-item text-white cursor">
            <base-icon icon="repeat-icon" class="icon" style="font-size: 22px" />
          </div>
        </div>
      </div>
      <div class="progress-bar">
        <span class="time time-curent">{{ timeCurent }}</span>
        <!-- <div class="progress-line" @click="handleClickProgress($event)" ref="progress-line">
          <div class="line-main"></div>
          <div class="line-curent" :style="{ width: barWidth }"></div>
          <div class="line-cricle" :style="{ left: circleLeft }"></div>
        </div> -->
        <el-slider v-model="timePlay" :show-tooltip="false" class="progress-line" @change="handleChangeSlider"></el-slider>

        <span class="time time-total">{{ currentTrack.duration | formatTimeTotal }}</span>
      </div>
    </div>
    <div class="be-flex text-white align-center control-player__volume">
      <div v-if="volume" @click="handleClickIconAudio(true)" class="icon-item">
        <base-icon icon="volume" class="cursor icon" style="font-size: 16px; padding: 6px 8px" />
      </div>
      <div v-else @click="handleClickIconAudio(false)" class="icon-item">
        <base-icon icon="mute" class="icon cursor" style="font-size: 18px; padding: 6px 8px" />
      </div>
      <el-slider v-model="volume" :max="1" :step="0.1" :show-tooltip="false" class="progress-line" style="width: 100px" @change="handleChangeVolume"></el-slider>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const beBase = namespace('beBase')

  import getRepository from '@/services'
  import PlayerRepository from '@/services/repositories/player'
  const apiPlayer: PlayerRepository = getRepository('player')

  @Component
  export default class ControlPlayer extends Vue {
    @beBase.State('currentTrack') currentTrack!: Record<string, any>
    @beBase.Action('setPlaySong') setPlaySong!: (status: boolean) => void

    audio: Record<string, any> = {}
    timeCurent = '00:00'
    barWidth = '0px'
    circleLeft = '0%'
    audioPlay = false
    elmSliderBar: any = null
    elmSliderBarButton: any = null
    timePlay = 0
    volume = 0.5
    created(): void {
      this.audio = new Audio()
      this.audio.volume = this.volume
      this.audio.ontimeupdate = () => {
        this.generateTime()
      }
    }
    mounted(): void {
      const slider_bar = document.querySelector('.el-slider__bar')
      const slider_bar_button = document.querySelector('.el-slider__button-wrapper')
      this.elmSliderBar = slider_bar
      this.elmSliderBarButton = slider_bar_button
      console.log(slider_bar)
    }

    @Watch('currentTrack.encodeId', { immediate: true }) watchCurentTrack(new_: string): void {
      this.getStreaming(new_)
    }

    onPlay(): void {
      this.audioPlay = !this.audioPlay
      this.audioPlay ? this.audio.play() : this.audio.pause()
    }

    handleClickIconAudio(status: boolean): void {
      this.volume = status ? 0 : 0.5
      this.audio.volume = status ? this.volume : 0.5
    }

    handleChangeVolume(value: number): void {
      this.audio.volume = value
    }

    handleChangeSlider(value: number): void {
      this.audioPlay = true
      this.audio.pause()
      let currentTime = (value / 100) * this.audio.duration
      this.audio.currentTime = currentTime
      this.audio.play()
    }

    async getStreaming(id: string): Promise<void> {
      this.circleLeft = '0'
      this.barWidth = '0'
      const result = await apiPlayer.getLinkStreaming({ id })
      if (result['320'] !== 'VIP') {
        this.audio.src = result['320']
      } else {
        this.audio.src = result['128']
      }
      this.audio.volume = this.volume
      // this.setPlaySong(true)
      this.audio.play()
      this.audioPlay = true
    }
    generateTime(): void {
      let width = (100 / this.audio.duration) * this.audio.currentTime
      this.barWidth = width + '%'
      this.elmSliderBar.style.width = this.barWidth
      this.elmSliderBarButton.style.left = this.barWidth
      // this.circleLeft = width - 1 + '%'
      let durmin: string | number = Math.floor(this.audio.duration / 60)
      let dursec: string | number = Math.floor(this.audio.duration - durmin * 60)
      let curmin: string | number = Math.floor(this.audio.currentTime / 60)
      let cursec: string | number = Math.floor(this.audio.currentTime - curmin * 60)
      if (durmin < 10) {
        durmin = '0' + durmin
      }
      if (dursec < 10) {
        dursec = '0' + dursec
      }
      if (curmin < 10) {
        curmin = '0' + curmin
      }
      if (cursec < 10) {
        cursec = '0' + cursec
      }
      //   this.duration = durmin + ':' + dursec
      this.timeCurent = curmin + ':' + cursec
    }
  }
</script>

<style scoped lang="scss">
  .control-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90px;
    background-color: #120c1c;
    display: flex;
    align-items: center;
    padding: 0 30px;
    border-top: 1px solid #373041;
    &__description {
      width: 30%;
      .is-audio-play {
        img {
          animation-name: rotate;
          animation-duration: 12s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      }
      @keyframes round {
        from {
          transform: rotate(-360deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .title {
        padding-left: 10px;
        .artists-small {
          margin-top: 5px;
        }
      }
    }
    &__bar {
      flex-grow: 1;
      .level-item {
        .btn-actions {
          justify-content: center;
        }
      }
      .progress-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .time {
          font-size: 12px;
          color: var(--text-subtitle);
        }
        .progress-line {
          position: relative;
          width: 100%;
          // height: 3px;
          margin: 0 10px;
          cursor: pointer;
          .el-slider__runway {
            display: none;
          }
          &:hover {
            .line-main {
              height: 6px;
            }
            .line-cricle {
              display: inline-block;
            }
            .line-curent {
              height: 6px;
            }
          }
          .line-main {
            width: 100%;
            height: 3px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 4px;
            background: #595560;
          }
          .line-curent {
            width: 0px;
            height: 3px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 4px;
            background: #fff;
            z-index: 2;
          }
          .line-cricle {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            top: 50%;
            left: 0;
            z-index: 3;
            transform: translateY(-50%);
            display: none;
          }
        }
      }
    }
    &__volume {
      width: 30%;
      justify-content: center;
    }
  }
  .icon-item {
    margin: 0 10px;
    &:hover {
      .icon {
        background: hsla(0, 0%, 100%, 0.1);
      }
      .play-icon {
        color: var(--link-text-hover);
      }
    }
    .icon {
      padding: 3px 5px;
      border-radius: 50%;
    }
  }
</style>
