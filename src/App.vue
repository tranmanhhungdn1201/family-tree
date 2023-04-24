<template>
  <Header />
  <router-view />
</template>

<script>

import Header from "./components/Header.vue";

export default {
  name: 'app',
  components: {Header}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-family: Helvetica;
  background-image: url('http://4.bp.blogspot.com/-J_sg6Pyug94/ULxnyFlF_zI/AAAAAAAAP2o/-aqOcdJt58w/s1600/nengiaphavang.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>