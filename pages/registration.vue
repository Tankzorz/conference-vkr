<template>
  <b-container fluid>
    <h1>Регистрация</h1>
    <b-form class="mx-5 px-5">
      <b-form-group
        id="firstName-lb"
        label="Имя"
        label-for="firstName"
      >
        <b-form-input id="firstName" v-model="fName"></b-form-input>
      </b-form-group>
      <b-form-group
        id="secName-lb"
        label="Фамилия"
        label-for="secName"
      >
        <b-form-input id="secName" v-model="sName"></b-form-input>
      </b-form-group>
      <b-form-group
        id="inputEmail1-lb"
        label="Адрес электронной почты"
        label-for="inputEmail1"
      >
        <b-form-input type="email" id="inputEmail1" aria-describedby="emailHelp" v-model="email">
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="inputPassword1-lb"
        label="Пароль"
        label-for="inputPassword1"
      >
        <b-form-input type="password" class="form-control" id="inputPassword1" v-model="password"/>
      </b-form-group>
      <b-form-group
        id="inputPassword2-lb"
        label="Повторите пароль"
        label-for="inputPassword2"
      >
        <b-form-input type="password" class="form-control" id="inputPassword2" v-model="cPassword"/>
      </b-form-group>
      <b-button variant="primary" @click="register">Зарегистрироваться</b-button>
      <b-button variant="secondary" to="/login">Авторизация</b-button>
      <br>{{errorMessage}}
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Reg",
  data: () => ({
    fName: "",
    sName: "",
    email: "",
    password: "",
    cPassword: "",
    errorMessage: "",
  }),
  methods: {
    invalidFeedback(error) {
      return error
    },
    async fetch({store}) {
      await store.dispatch('login/authUser', 'main')
    },
    async register() {
      if (this.fName != "" && this.sName != "" && this.email != "" && this.password != "") {
        await this.$axios.$post("/api/auth/reg", {
          name: this.fName,
          surname: this.sName,
          email: this.email,
          password: this.password
        })
        await this.$router.back()
      } else {
        this.errorMessage = "Заполните все поля!"
      }
    }
  }
}
</script>

<style scoped>

</style>
