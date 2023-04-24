<template>
  <nav v-if="!$route.meta.hideNavbar" class="header navbar navbar-expand-lg navbar-dark bg-dark p-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Gia Phả</a>
      <button class="navbar-toggler" type="button" @click="showExtra = !showExtra" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse" id="navbarNavDropdown" v-show="!showExtra">
        <ul class="navbar-nav ms-auto ">
          <li class="nav-item">
            <router-link to="/family-tree" :class="showClassActive('home')">Trang chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/family-tree/history" :class="showClassActive('history')">Lịch sử</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/family-tree/family-tree" :class="showClassActive('tree')">Gia Phả</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/family-tree/login" :class="showClassActive('out')" @click="logout">Thoát</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      showExtra: true
    }
  },
  methods: {
    showClassActive(name) {
      return `nav-link mx-2 ${this.$route.name === name ? 'active' : ''}`
    },
    logout() {
      localStorage.removeItem('abcdef')
      localStorage.removeItem('abcdefr')
      this.$router.push('/family-tree/login')
    }
  }
}
</script>
<style scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 99999;
}
</style>