<template>
  <nav v-if="!$route.meta.hideNavbar" class="header navbar navbar-expand-lg navbar-dark bg-dark p-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Gia Phả</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class=" collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto ">
          <li class="nav-item">
            <router-link to="/" class="nav-link mx-2">Trang chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/family-tree" class="nav-link mx-2">Gia Phả</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link mx-2"  @click="logout">Thoát</router-link>
          </li>
        </ul>
      </div>
    </div>
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
<style scoped>
.header {
  position: fixed;
  width: 100%;
}
</style>