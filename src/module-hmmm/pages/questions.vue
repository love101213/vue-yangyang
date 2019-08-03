<template>
  <div class="dashboard-container">
    <div class="app-container">基础题库管理组件</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'QuestionsList',
  created () {
    this.$store.dispath('getBaseList')
  },
  computed: {
    ...mapGetters(['hmmm'])
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
</style>
