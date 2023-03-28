<template>
  <div class="row justify-content-center mt-lg-5">
    <h2>Đăng nhập</h2>
    <form class="px-4 py-3 col-xl-4 col-lg-6 col-sm-12">
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Tên đăng nhập" v-model="name" required>
      </div>
      <div class="mb-3">
        <input type="password" class="form-control"  placeholder="Mật khẩu" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary" @click="onSubmit">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
import bcrypt from 'bcryptjs'
export default {
  data() {
    return {
        name: '',
        password: ''
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      if (!this.name || !this.password) {
        alert('Hãy nhập thông tin đăng nhập!')
        return;
      }
      let data = await this.fetchLogin();
      console.log(data);
      if (!data || !data[0] || !data[0].password) {
        alert('Thông tin đăng nhập không chính xác!')
      }

      this.checkLogin(data)
    },
    fetchLogin() {
      return fetch(`http://localhost:3000/users?name=${this.name}`)
          .then(response => {
            return response.json();
          })
    },
    async checkLogin(data) {
      console.log(data);
      const rs = await bcrypt.compare(this.password, data[0].password).then((res) => {
        return res;
      });
      if (!rs) {
        alert('Thông tin đăng nhập không chính xác!')
        return
      }
      localStorage.setItem("abcdef", "adsadwadsa");
      if (data[0].isAdmin) {
        localStorage.setItem("abcdefr", false);
      }
      this.$router.push('/')
    }
  }
}
</script>