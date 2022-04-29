<template>
  <div class="z-header">
    <el-input placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV…" class="z-header__search base-input-nonebg" prefix-icon="el-icon-search" v-model="search"> </el-input>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class ZHeader extends Vue {
    search = ''
  }
</script>

<style scoped lang="scss">
  .z-header {
    &__search {
      width: 346px;
      background: var(--alpha-bg);
      border-radius: 30px;
      color: red;
    }
  }
</style>
