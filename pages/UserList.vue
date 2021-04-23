<template>
  <b-container fluid="" >
    <b-overlay :show="show" rounded="sm">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Фамилия</th>
        <th scope="col">EMail</th>
        <th scope="col">Тип пользователя</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td class="align-middle"><b-form-input v-model="user.name" placeholder="Имя"/><br/><h3>{{user._id}}</h3></td>
            <td class="align-middle"><b-form-input v-model="user.surname" placeholder="Имя"/></td>
            <td class="align-middle"><b-form-input v-model="user.email" placeholder="Имя"/></td>
            <td class="align-middle">
              <b-form-select v-model="user.role" >
    <!--            <b-form-select-option :value="null" disabled>{{ user.role }}</b-form-select-option>-->
                <b-form-select-option value="USER">Пользователь</b-form-select-option>
                <b-form-select-option value="TECH_SEC">Технический секретарь</b-form-select-option>
                <b-form-select-option value="SC_SEC">Научный секретарь</b-form-select-option>
                <b-form-select-option value="SC_LEAD">Руководитель секции</b-form-select-option>
                <b-form-select-option value="ADMIN">Администратор</b-form-select-option>
              </b-form-select>
            </td>
            <td class="align-middle">
              <div><button type="button" class="btn btn-sm btn-outline-primary btn-block" @click="editUser(user.name,user.surname,user.email,user.role,user._id)">Сохранить</button></div>
              <div class="mt-2"><button type="button" class="btn btn-sm btn-outline-danger btn-block" @click="deleteUser(user._id)">Удалить</button></div>
            </td>
          </tr>
        </tbody>

    </table>
    </b-overlay>
  </b-container>
</template>

<script>
export default {
  name: "UserList",
  data: () => ({
    users:[],
    selected: [],
    show: false,
  }),
  async mounted() {
    await this.reload();
  },

  async middleware({store, redirect}) {
    let role = await store.getters['login/role']
    if (role != 'ADMIN') {
      return redirect('/')
    }
  },

  methods: {
    async editUser(name, surname, email, role, ID) {
      await this.$axios.$post("/api/users/editUser", {
        name: name,
        surname: surname,
        email: email,
        role: role,
        _id: ID
      })
      await this.reload()
    },
    async deleteUser(userID) {
      await this.$axios.$post("/api/users/deleteUser", {
        _id: userID
      })
      await this.reload()
    },
    async reload() {
      this.show = true;
      let response = await this.$axios.$post('/api/users/getUsers',{})
      console.log(response);
      this.users = response.payload.users;
      for (let user in this.users) {
        this.selected[user._id]=user.role;
      }
      this.show = false;
    }
  }

}
</script>

<style scoped>

</style>
