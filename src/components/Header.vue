<template>
  <nav v-if="!$route.meta.hideNavbar"  class="mt-3">
    <router-link to="/">Trang chủ</router-link> |
    <router-link to="/family-tree">Gia phả</router-link> |
    <a class="link-secondary" @click="logout">Thoát</a>
  </nav>
</template>

<script>

export default {
  name: 'Header',
  methods: {
    logout() {
      localStorage.removeItem('abcdef')
      localStorage.removeItem('abcdefr')
      this.$router.push('/login')
    }
  }
}
</script>