<template>
  <section class="vh-90 row justify-content-center mt-lg-5 header">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100 w-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong header-card" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <h3 class="mb-5">Đăng nhập</h3>
              <div class="form-outline mb-4">
                <input type="email" id="typeEmailX-2" class="form-control form-control-lg"  placeholder="Tài khoản" v-model="name" required/>
              </div>
              <div class="form-outline mb-4">
                <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Mật khẩu" v-model="password" required/>
              </div>
              <button class="btn btn-warning btn-lg btn-block" type="submit" @click="onSubmit">Đăng nhập</button>
              <hr class="my-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
<style scoped>
.vh-90 {
  height: 90vh;
}
.header .header-card {
  background-color: #fff3cf;
}
.header input {
  background-color: #fff3cf;
}

</style>