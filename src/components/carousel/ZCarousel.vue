<template>
  <el-carousel :interval="40000" type="card">
    <el-carousel-item v-for="(item, index) in banner.items" :key="index">
      <img :src="item.banner" :alt="item.alias" class="img-fluid" />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class ZCarousel extends Vue {
    @Prop({
      required: true,
      type: Object,
      default: () => {
        return {}
      }
    })
    banner!: Record<string, any>
  }
</script>

<style scoped></style>
