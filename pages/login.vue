<template>
  <b-container fluid class="mt-5 pt-5">
    <h1>Авторизация</h1>
    <b-form class="mx-5 px-5">
      <b-form-group
        id="inputEmail1-lb"
        label="Адрес электронной почты"
        label-for="inputEmail1"
        class="m-4"
      >
        <b-form-input type="email" id="inputEmail1" aria-describedby="emailHelp" v-model="email">
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="inputPassword1-lb"
        label="Пароль"
        label-for="inputPassword1"
        class="m-4"
      >
        <b-form-input type="password" class="form-control" id="inputPassword1" v-model="password"/>
      </b-form-group>
      <b-button variant="primary" @click="register">Логин</b-button>
      <b-button variant="secondary" to="/registration">Зарегистрироваться</b-button>
      <br/>
      {{errorMessage}}
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "log",
  layout: "LogReg",
  data: () => ({
    email: "",
    password: "",
    resp_arr: [],
    errorMessage: '',
  }),
  methods: {
    updateLogin() {
    },
    // async fetch({store}) {
    //   await store.dispatch('login/authUser', this.resp_arr)
    // },
    async register() {
      let response = await this.$axios.$post("/api/auth/login", {
        email: this.email,
        password: this.password
      }).catch((error) => {
        console.warn(error)
        return 502;
      })
      if (response.payload) {
        this.resp_arr[0] = response.payload.name;
        this.resp_arr[1] = response.payload.surname;
        this.resp_arr[2] = response.payload.email;
        this.resp_arr[3] = response.payload.role;
        this.resp_arr[4] = response.payload.userID;
        console.log(this.resp_arr)
        await this.$store.dispatch('login/authUser', this.resp_arr)
        await this.$router.back()
      }
      else {
        this.errorMessage = "Неверный логин или пароль"
      }
    }
  }
}
</script>

<style scoped>

</style>
