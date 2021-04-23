<template>
  <div>
    <b-navbar class="navbar navbar-expand-lg navbar-dark bg-primary">
      <b-navbar-brand><NuxtLink exact to="/">Конференция</NuxtLink></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="align-middle">
          <b-nav-item to="thesises" text="Тезисы">
            <NuxtLink to="thesises">Все тезисы</NuxtLink>
          </b-nav-item>
          <b-nav-item to="SectionList" text="Секции" v-if="this.role==='ADMIN'">
            <NuxtLink to="SectionList">Секции</NuxtLink>
          </b-nav-item>
          <b-nav-item to="UserList" v-if="this.role==='ADMIN'">
            <NuxtLink to="UserList">Пользователи</NuxtLink>
          </b-nav-item>
          <b-nav-item to="workspace" v-if="(this.role!==''&&this.role!=='USER'&&this.role!=='ADMIN')">
            <NuxtLink to="workspace">Рабочая область</NuxtLink>
          </b-nav-item>
          <b-nav-item to="myThesis" v-if="this.role==='USER'">
            <NuxtLink to="myThesis">Мои тезисы</NuxtLink>
          </b-nav-item>
          <b-nav-item to="login" v-if="this.role===''">
            Логин
          </b-nav-item>
          <b-nav-item v-if="this.role===''" to="registration">
            Регистрация
          </b-nav-item>
          <b-nav-item v-if="this.role!==''" to="/" @click="logout">
            Выйти
          </b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            {{resolveRole(role)}}
          </b-nav-item>
          <b-nav-item>
            {{username}}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nav aria-label="breadcrumb navbar-light bg-light">
<!--      <b-breadcrumb :items="bitems"></b-breadcrumb>-->
    </nav>
  </div>
</template>

<script>
export default {
name: "topMenu",
  methods: {
    logout(){
      this.$store.dispatch('login/unLogin')
    },
    resolveRole(roleID){
      if(roleID === 'USER') {
        return "Пользователь"
      } else if (roleID === 'ADMIN'){
        return "Администратор"
      } else if (roleID === 'TECH_SEC'){
        return "Технический секретарь"
      } else if (roleID === 'SC_SEC'){
        return "Научный секретарь"
      } else if (roleID === 'SC_LEAD'){
        return "Руководитель секции"
      } else {
        return ""
      }
    }
  },
  computed: {
    role() {
      return this.$store.getters['login/role']
    },
    username() {
      console.log(this.$store.getters['login/name'])
      return this.$store.getters['login/name']
    },
    userID() {
      console.log(this.$store.getters['login/userID'])
      return this.$store.getters['login/userID']
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #526488 !important;
}

a {
  color: white;
}

navbar-brand {
  color: white;
}

.dropdown-toggle {
  color: white;
}

a.dropdown-item {
  color: black;
}

</style>
