<template>
  <div class="dashboard-container">
    <div class="app-container">学科管理组件1111</div>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  name: 'SubjectsList',
  data() {
    return {}
  },
  created () {
    this.$store.dispatch('getSubList')
  },
  computed: {
    ...mapMutations(['subject'])
  },
  methods: {
    
  }
}
</script>

<style scoped>
</style>
