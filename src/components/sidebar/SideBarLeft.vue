<template>
  <div class="sb-left">
    <base-icon icon="logo-zing" class="icon-logo-zing" />
    <ul class="text-gray pl-0 list-menu">
      <li class="menu-item">
        <router-link :to="{ name: 'Home' }" class="flex route-item"> <base-icon icon="menu-discover" class="icon-menu" />Khám phá </router-link>
      </li>
      <li class="menu-item">
        <router-link :to="{ name: 'Chart' }" class="flex route-item"><base-icon icon="menu-chart" class="icon-menu" />#zingchart</router-link>
      </li>
      <li class="mb-2 menu-item">
        <router-link :to="{ name: 'Follow' }" class="flex route-item"><base-icon icon="menu-follow" class="icon-menu" />Theo dõi</router-link>
      </li>
      <li class="mb-2 line"></li>
      <li class="menu-item">
        <router-link :to="{ name: 'MusicNew' }" class="flex route-item"><base-icon icon="menu-music" class="icon-menu" />Nhạc mới</router-link>
      </li>
      <li class="menu-item">
        <router-link :to="{ name: 'Category' }" class="flex route-item"><base-icon icon="menu-category" class="icon-menu" /> Thể loại</router-link>
      </li>
      <li class="menu-item">
        <router-link :to="{ name: 'Top' }" class="flex route-item"><base-icon icon="menu-top100" class="icon-menu" /> Top 100</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class SideBarLeft extends Vue {}
</script>

<style scoped lang="scss">
  .sb-left {
    padding-top: 15px;
    .icon-logo-zing {
      padding: 0 25px;
    }
    .list-menu {
      .menu-item {
        font-size: 12px;
        font-weight: 700;
        &:hover {
          color: var(--text-color-white);
        }
        .route-item {
          padding: 5px 0 5px 25px;
          .icon-menu {
            margin-right: 10px;
            font-size: 18px;
          }
        }
        .router-link-exact-active.router-link-active {
          color: var(--text-color-white);
          border-left: 2px solid var(--purple-primary);
          background-color: var(--alpha-bg);
        }
      }
      .line {
        margin-right: 25px;
        margin-left: 25px;
        height: 1px;
        background-color: #dadada4d;
      }
    }
  }
</style>
