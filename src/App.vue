<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
  // @import url('./accets/styles/index.scss');
</style>
