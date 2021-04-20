<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ username }}, 欢迎进入后台管理系统</div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { getInfo } from '@/api/user'
export default {
  name: 'Dashboard',
  data() {
    return {
      username: ''
    }
  },
  computed: {
    // ...mapGetters([
    //   'name'
    // ])
  },
  mounted() {
    this.username = sessionStorage.getItem('username')
    // this.getInfo()
    this.$store.commit('SET_AVATAR', '1')
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
