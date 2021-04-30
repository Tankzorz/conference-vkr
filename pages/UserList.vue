<template>
  <b-container fluid="" >
    <b-overlay :show="show" rounded="sm">
      <b-table striped hover :items="users" :fields="fields">
        <template #cell(name)="data">
          <b-form-input v-model="data.item.name" placeholder="Имя"/>
        </template>
        <template #cell(surname)="data">
          <b-form-input v-model="data.item.surname" placeholder="Имя"/>
        </template>
        <template #cell(email)="data">
          <b-form-input v-model="data.item.email" placeholder="Имя"/>
        </template>
        <template #cell(role)="data">
          <b-form-select v-model="data.item.role" >
            <!--            <b-form-select-option :value="null" disabled>{{ user.role }}</b-form-select-option>-->
            <b-form-select-option value="USER">Пользователь</b-form-select-option>
            <b-form-select-option value="TECH_SEC">Технический секретарь</b-form-select-option>
            <b-form-select-option value="SC_SEC">Научный секретарь</b-form-select-option>
            <b-form-select-option value="SC_LEAD">Руководитель секции</b-form-select-option>
            <b-form-select-option value="ADMIN">Администратор</b-form-select-option>
          </b-form-select>
        </template>
        <template #cell(actions)="data">
          <b-button @click="editUser(data.item.name,data.item.surname,data.item.email,data.item.role,data.item._id)">Сохранить</b-button>
          <b-button v-b-modal.my-modal @click="deleteUser(data.item._id)">Удалить</b-button>
        </template>
      </b-table>
    </b-overlay>
    <!--<b-modal :id="infoModal.id" :title="infoModal.title">
      <b-form>
        <b-input-group>
          <b-input></b-input>
          <b-input></b-input>
          <b-input></b-input>
          <b-form-select v-model="user.role" >
            &lt;!&ndash;            <b-form-select-option :value="null" disabled>{{ user.role }}</b-form-select-option>&ndash;&gt;
            <b-form-select-option value="USER">Пользователь</b-form-select-option>
            <b-form-select-option value="TECH_SEC">Технический секретарь</b-form-select-option>
            <b-form-select-option value="SC_SEC">Научный секретарь</b-form-select-option>
            <b-form-select-option value="SC_LEAD">Руководитель секции</b-form-select-option>
            <b-form-select-option value="ADMIN">Администратор</b-form-select-option>
          </b-form-select>
        </b-input-group>
      </b-form>
    </b-modal>-->
  </b-container>
</template>

<script>
export default {
  name: "UserList",
  data: () => ({
    fields: [
      {
        key: 'name',
        label: 'Имя',
        sortable: true
      },
      {
        key: 'surname',
        label: 'Фамилия',
        sortable: true
      },
      {
        key: 'email',
        label: 'Почта',
        sortable: false,
        // Variant applies to the whole column, including the header and footer
      },
      {
        key: 'role',
        label: 'Роль пользователя',
        sortable: false,
        // Variant applies to the whole column, including the header and footer
      },

      { key: 'actions', label: 'Действия' }
    ],
    items: [],
    users:[],
    selected: [],
    show: false,
    infoModal: {
      id: 'info-modal',
      title: '',
      content: ''
    },
    deleteBox: ''
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
      });
      this.$bvToast.toast("Изменения успешно сохранены", {
        title: 'Сообщение',
        autoHideDelay: 1500,
        appendToast: true
      })
      await this.reload()
    },

    deleteConfirmation(userID) {

    },

    async deleteUser(userID) {
      if(await this.$bvModal.msgBoxConfirm('Вы уверены, что хотите удалить пользователя?', {
        title: 'Подтвердите удаление',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'ДА',
        cancelTitle: 'НЕТ',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })) {
        await this.$axios.$post("/api/users/deleteUser", {
          _id: userID
        });
        this.$bvToast.toast("Пользователь удалён", {
          title: 'Сообщение',
          autoHideDelay: 1500,
          appendToast: true
        })
      }

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
    },
    /*info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },*/
  }

}
</script>

<style scoped>

</style>
