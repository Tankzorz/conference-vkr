<template>
    <b-container fluid class="py-2">
      <b-button v-b-modal.addSect class="btn btn-primary mb-2">Добавить тезис</b-button>
      <b-modal id="addSect">
        <template #modal-header="{ close }">
          <h5>Добавить тезис</h5>
        </template>
        <template #default="{ hide }">
          <b-form-group
            label="Название"
            label-for="thesisName"
          >
            <b-form-input v-model="thesisName" id="thesisName"/>
          </b-form-group>
          <b-form-group
            label="Университет"
            label-for="univ"
          >
            <b-form-input v-model="university" id="univ"/>
          </b-form-group>
          <b-form-group
            label="Научный руководитель"
            label-for="projectLead"
          >
            <b-form-input v-model="projectLead" id="projectLead"/>
          </b-form-group>
          <b-form-group
            label="Секция"
            label-for="addThesisSelect"
          >
            <b-form-select v-model="sec" id="addThesisSelect">
              <b-form-select-option v-for="section in sections" :value="section.sectionID" :key="section.sectionID">
                {{ section.name }}</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group
            label="Файл"
            label-for="fileUpload"
          >
            <b-form-file
              id="fileUpload"
              v-model="file"
              placeholder="Выберите файл"
              drop-placeholder="Перетащите файл сюда"
              accept=".pdf"
            ></b-form-file>
          </b-form-group>
        </template>
        <template #modal-footer="{ ok, cancel, hide }">
          <b-button type="button" class="btn btn-primary" @click="addThesis">Добавить</b-button>
        </template>
      </b-modal>
      <b-overlay :show="show" rounded="sm">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Название</th>
        <th scope="col">Университет</th>
        <th scope="col">Научный руководитель</th>
        <th scope="col">Секция</th>
        <th scope="col">Статус</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="th in thesis" :key="th.id">
        <td class="align-middle"><span>{{ th.name }}</span></td>
        <td class="align-middle"><span>{{ th.university }}</span></td>
        <td class="align-middle"><span>{{ th.project_lead }}</span></td>
        <td class="align-middle"><span>{{ th.sectionName }}</span></td>
        <td class="align-middle"><span>{{ resolveStatus(th.status) }}</span></td>
        <td class="align-middle">
          <div><button type="button" class="btn btn-sm btn-outline-primary btn-block" @click="downloadThesis(th.thesisID)">Скачать</button></div>
          <div class="mt-2"><button type="button" class="btn btn-sm btn-outline-danger btn-block" @click="deleteThesis(th.thesisID)">Удалить</button></div>
        </td>
      </tr>
      </tbody>
    </table>
      </b-overlay>
  </b-container>
</template>

<script>
export default {
  name: "myThesis",
  data: () => ({
    thesis:[],
    thesisName: "",
    university: "",
    projectLead: "",
    sec: null,
    sections: [],
    file: null,
    show: false,
  }),

  mounted() {
    this.reload()
  },

  async middleware({store, redirect}) {
    let role = await store.getters['login/role']
    if (role != 'USER') {
      return redirect('/')
    }
  },

  methods: {
    async reload() {
      this.show = true;
      let response = await this.$axios.$post("/api/thesises/getThesisesByUser", {
        userID: await this.$store.getters['login/userID']
      });
      console.log(response)
      this.thesis = response.payload.thesises
      response = await this.$axios.$post("/api/sections/getSections",{});
      this.sections = response.payload.sections;
      this.show = false;
    },

    resolveStatus(statusID) {
      let statusString = '';
      if(statusID === 'UPLOADED') statusString = "Загружен"
      else if (statusID === 'CHECKED_BY_TECH_SEC') statusString = "Проверен техническим секретарём"
      else if (statusID === 'CHECKED_BY_SC_SEC') statusString = "Проверен научным секретарём"
      else if (statusID === 'ACCEPTED') statusString = "Принят"

      return statusString
    },

    async addThesis() {
      console.log(this.sec)
      let formData = new FormData();
      formData.append('name', this.thesisName)
      formData.append('university', this.university)
      formData.append('project_lead', this.projectLead)
      formData.append('sectionID', this.sec)
      formData.append('userID', this.$store.getters['login/userID'])
      formData.append('file', this.file)
      await this.$axios.$post("api/thesises/createThesis", formData).catch((error) => {
        console.warn(error)
        return 502;
      })
      this.$bvModal.hide('addSect')
      await this.reload()
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
