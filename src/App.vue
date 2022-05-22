<template>
  <div id="app">
    <el-container class="main-layout" :class="isPlay ? 'show-player' : null">
      <el-aside class="sidebar-left" style="width: 240px">
        <side-bar-left />
      </el-aside>
      <el-container class="main-content">
        <el-header class="be-flex main-header" style="height: 70px">
          <div class="be-flex-item">
            <z-header />
          </div>
        </el-header>
        <el-main class="main-center">
          <router-view />
        </el-main>
      </el-container>
      <el-aside class="sidebar-right" style="width: 320px"> <side-bar-right /> </el-aside>
      <control-player v-if="isPlay" />
    </el-container>
  </div>
</template>

<script lang="ts">
  import SideBarLeft from '@/components/sidebar/SideBarLeft.vue'
  import SideBarRight from '@/components//sidebar/SideBarRight.vue'
  import ZHeader from '@/components//header/Header.vue'
  import ControlPlayer from '@/components//player/ControlPlayer.vue'

  import { namespace } from 'vuex-class'
  import { Vue, Component } from 'vue-property-decorator'

  const beBase = namespace('beBase')

  @Component({
    components: { SideBarLeft, ZHeader, ControlPlayer, SideBarRight }
  })
  export default class App extends Vue {
    @beBase.State('isPlay') isPlay!: boolean
    isLoading = true
  }
</script>

<style lang="scss">
  // @import url('./accets/styles/index.scss');

  .main-layout {
    position: relative;
    background-color: var(--background-color);
    height: 100vh;
    .sidebar-left {
      background-color: var(--background-sidebar-color);
    }
    .main-content {
      padding-top: 15px;
      .main-header {
        padding: 0 40px;
      }
      .main-center {
        padding: 20px 40px;
      }
    }
    .sidebar-right {
      padding-top: 15px;
      border-left: 1px solid hsl(0deg 0% 100% / 10%);
      overflow: hidden;
    }
  }
  .show-player {
    .sidebar-left {
      height: calc(100vh - 90px);
    }
    .main-content {
      height: calc(100vh - 90px);
    }
    .sidebar-right {
      height: calc(100vh - 90px);
    }
  }
</style>
