<template>
  <div class="not-found">
    404 not found
    <router-link :to="{ name: 'home' }">go home</router-link>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({ components: {} })
  export default class NotFound extends Vue {}
</script>
<style lang="scss" scoped>
  .not-found {
  }
</style>
