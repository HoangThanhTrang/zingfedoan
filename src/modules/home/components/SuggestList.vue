<template>
  <div class="wrap-playlist" :class="!showButtonSlide ? 'none-button-slide' : null" v-if="listItem.length">
    <div class="section-title">
      <span class="text-white">{{ title }}</span>
    </div>
    <VueSlickCarousel v-if="isCarousel" v-bind="setting">
      <play-list-item v-for="(item, index) in listItem" :key="index" :type="type" :item="item" :isShowDes="isShowDes" />
      <!-- <div v-for="item in 6" :key="item">{{ item }}</div> -->
    </VueSlickCarousel>
    <div v-else class="be-flex jc-space-between">
      <play-list-item v-for="(item, index) in listItem" :key="index" :item="item" :isCarouselChild="false" />
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
  @Component({ components: { PlayListItem, VueSlickCarousel } })
  export default class SuggestList extends Vue {
    @Prop({ required: true, type: String, default: '' }) title!: string
    @Prop({ required: false, type: String, default: '' }) type!: string
    @Prop({ required: false, type: Boolean, default: false }) isCarousel!: boolean
    @Prop({ required: false, type: Boolean, default: true }) isShowDes!: boolean
    @Prop({
      required: false,
      type: Object,
      default: () => {
        return {
          dots: false,
          focusOnSelect: false,
          infinite: false,
          speed: 600,
          slidesToShow: 5,
          slidesToScroll: 1,
          touchThreshold: 5
        }
      }
    })
    setting!: boolean
    @Prop({ required: false, type: Boolean, default: true }) showButtonSlide!: boolean
    @Prop({
      required: true,
      type: Array,
      default: () => {
        return []
      }
    })
    listItem!: Array<Record<string, any>>
    // settings: Record<string, any> = {
    //   dots: false,
    //   focusOnSelect: false,
    //   infinite: false,
    //   speed: 600,
    //   slidesToShow: 5,
    //   slidesToScroll: 1,
    //   touchThreshold: 5
    // }
  }
</script>

<style scoped></style>
