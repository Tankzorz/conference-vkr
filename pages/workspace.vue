<template>
  <div>
    <b-overlay :show="show" rounded="sm">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Название</th>
        <th scope="col">Автор</th>
        <th scope="col">Научный руководитель</th>
        <th scope="col">Университет</th>
        <th scope="col">Действия</th>
        <!-- скрывается для юзера -->
        <th scope="col"></th>
        <!-- / -->
      </tr>
      </thead>
      <tbody>
      <tr v-for="th in thesis">
        <td class="align-middle"><span>{{ th.name }}</span></td>
        <td class="align-middle"><span>{{ th.firstName + " " + th.surname}}</span></td>
        <td class="align-middle"><span>{{ th.project_lead }}</span></td>
        <td class="align-middle"><span>{{ th.university }}</span></td>
        <td class="align-middle">
          <button type="button" class="btn btn-sm btn-outline-primary btn-block" @click="downloadThesis(th.thesisID)">Скачать</button>
        </td>
        <!-- скрывается для юзера -->
        <td class="align-middle">
          <button type="button" class="btn btn-sm btn-outline-success btn-block" @click="approveThesis(th.thesisID)">Подтвердить</button>
          <button type="button" class="btn btn-sm btn-outline-danger btn-block" @click="declineThesis(th.thesisID)">Отклонить</button>
        </td>
        <!-- / -->
      </tr>
      </tbody>
    </table>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "Workspace",
  data: () => ({
    thesis:[],
    thesisName: "",
    university: "",
    projectLead: "",
    section: null,
    sections: [],
    file: null,
    show: false,
  }),

  mounted() {
    this.reload()
  },

  async middleware({store, redirect}) {
    let role = await store.getters['login/role']
    console.log(role)
    if (role !='TECH_SEC' && role !='SC_SEC' && role !='SC_LEAD') {
      return redirect('/')
    }
  },

  methods: {
    async reload() {
      this.show = true;
      let role = this.$store.getters['login/role'];
      console.log(role)
      let status = '';
      if (role === "TECH_SEC") status = "UPLOADED"
      else if (role === "SC_SEC") status = "CHECKED_BY_TECH_SEC"
      else if (role === "SC_LEAD") status = "CHECKED_BY_SC_SEC"
      console.log(this.status)
      let response = await this.$axios.$post("/api/thesises/getThesisesByStatus", {
        status: status
      });
      this.thesis = response.payload.thesises
      response = await this.$axios.$post("/api/sections/getSections",{});
      this.sections = response.payload.sections;
      this.show = false;
    },
    async approveThesis(thesisID) {
      let role = this.$store.getters['login/role'];
      let status;
      if (role === "TECH_SEC") status = "CHECKED_BY_TECH_SEC"
      else if (role === "SC_SEC") status = "CHECKED_BY_SC_SEC"
      else if (role === "SC_LEAD") status = "ACCEPTED"
      await this.$axios.$post("/api/thesises/changeThesisStatus", {
        thesisID: thesisID,
        newStatus: status
      })
      await  this.reload();
    },
    async declineThesis(thesisID) {
      let status = 'DECLINED';
      await this.$axios.$post("/api/thesises/changeThesisStatus", {
        thesisID: thesisID,
        newStatus: status
      })
      await  this.reload();
    },
    async downloadThesis(thesisID) {
      //await this.$axios.$post()
      let response = await this.$axios.$post('/api/thesises/downloadThesis', {thesisID: thesisID}, {responseType: 'blob'});
      let fileURL = window.URL.createObjectURL(new Blob([response]));
      let fileLink = document.createElement('a');



      fileLink.href = fileURL;

      fileLink.setAttribute('download', 'file.pdf');

      document.body.appendChild(fileLink);



      fileLink.click();
    },
    async deleteThesis(thesisID) {
      await this.$axios.$post("/api/thesises/deleteThesis", {
        thesisID: thesisID
      })
      await this.reload()
    }
  },
  computed: {
    role() {
      return this.$store.getters['login/role']
    }
  }
}
</script>

<style scoped>

</style>
