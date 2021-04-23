<template>
  <b-container fluid class="py-2">
    <b-button v-b-modal.addSect class="btn btn-primary mb-2">Добавить секцию</b-button>
    <b-modal id="addSect">
          <template #modal-header="{ close }">
            <h5>Добавить секцию</h5>
          </template>
      <template #default="{ hide }">
        <b-form-group
          label="Название секции"
          label-for="sectName"
        >
          <b-form-input id="sectName" v-model="name"/>
        </b-form-group>
        <b-form-group
          label="Технический секретарь"
          label-for="addSecSelect1">
          <b-form-select v-model="tech_sec" :options="ts_options" id="addSecSelect1">
            <b-form-select-option v-for="tech_sec in a_tech_sec" :key="tech_sec.userID" :value="tech_sec.userID">{{tech_sec.name + ' ' + tech_sec.surname}}</b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Научный секретарь"
          label-for="addSecSelect2">
          <b-form-select v-model="sc_sec" :options="scs_options" id="addSecSelect2">
            <b-form-select-option v-for="sc_sec in a_sc_sec" :key="sc_sec.userID" :value="sc_sec.userID">{{sc_sec.name + ' ' + sc_sec.surname}}</b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Руководитель секции"
          label-for="addSecSelect3">
          <b-form-select v-model="sc_lead" :options="scl_options" id="addSecSelect3">
            <b-form-select-option v-for="sc_lead in a_sc_lead" :key="sc_lead.userID" :value="sc_lead.userID">{{sc_lead.name + ' ' + sc_lead.surname}}</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </template>
      <template #modal-footer="{ ok, cancel, hide }">
        <b-button type="button" class="btn btn-primary" @click="addSection">Добавить</b-button>
      </template>
    </b-modal>
    <b-overlay :show="show" rounded="sm">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Название</th>
        <th scope="col">Технический секретарь</th>
        <th scope="col">Научный секретарь</th>
        <th scope="col">Глава секции</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="section in sections" :key="section.sectionID">
        <td class="align-middle">{{section.name}}</td>
        <td class="align-middle">
          <b-form-select v-model="section.tech_sec" :options="ts_options" id="addSecSelect1">
            <b-form-select-option v-for="tech_sec in a_tech_sec" :key="tech_sec.userID" :value="tech_sec.userID">{{tech_sec.name + ' ' + tech_sec.surname}}</b-form-select-option>
          </b-form-select>
        </td>
        <td class="align-middle">
          <b-form-select v-model="section.sc_sec" :options="scs_options" id="addSecSelect2">
            <b-form-select-option v-for="sc_sec in a_sc_sec" :key="sc_sec.userID" :value="sc_sec.userID">{{sc_sec.name + ' ' + sc_sec.surname}}</b-form-select-option>
          </b-form-select>
        </td>
        <td class="align-middle">
          <b-form-select v-model="section.sc_lead" :options="scl_options" id="addSecSelect3">
            <b-form-select-option v-for="sc_lead in a_sc_lead" :key="sc_lead.userID" :value="sc_lead.userID">{{sc_lead.name + ' ' + sc_lead.surname}}</b-form-select-option>
          </b-form-select>
        </td>
        <td class="align-middle">
          <div><button type="button" class="btn btn-sm btn-outline-primary btn-block" @click="editSection(section.name,section.tech_sec,section.sc_sec,section.sc_lead,section.sectionID)">Сохранить</button></div>
          <div class="mt-2"><button type="button" class="btn btn-sm btn-outline-danger btn-block" @click="deleteSection(section.sectionID)">Удалить</button></div>
        </td>
      </tr>
      </tbody>
    </table>
    </b-overlay>
  </b-container>
</template>

<script>
export default {
  name: "SectionList",
  data: () => ({
    sections: [],
    name: "",
    tech_sec: "",
    sc_sec: "",
    sc_lead: "",
    a_tech_sec: [],
    a_sc_sec: [],
    a_sc_lead: [],
    ts_options: [,
    ],
    scs_options: [
    ],
    scl_options: [
    ],
    show: false,
  }),
  async mounted() {
    await this.reload()
  },

  async middleware({store, redirect}) {
    let role = await store.getters['login/role']
    if (role != 'ADMIN') {
      return redirect('/')
    }
  },

  methods: {
    async addSection() {
      await this.$axios.$post("/api/sections/createSection", {
        name: this.name,
        tech_sec: this.tech_sec,
        sc_sec: this.sc_sec,
        sc_lead: this.sc_lead,
      })
      this.$bvModal.hide('addSect')
      await this.reload();
    },
    async editSection(name, tech_sec, sc_sec, sc_lead, secID) {
      await this.$axios.$post("/api/sections/editSection", {
        name: name,
        tech_sec: tech_sec,
        sc_sec: sc_sec,
        sc_lead: sc_lead,
        sectionID: secID
      })
      await this.reload();
    },
    async deleteSection(secID) {
      await this.$axios.$post("/api/sections/deleteSection", {
        sectionID: secID
      })
      await this.reload();
    },
    async reload() {
      this.show = true;
      let response = await this.$axios.$post("/api/sections/getSections",{});
      this.sections = response.payload.sections;
      console.log(response = await this.$axios.$post("api/users/getUsersByRole",{role:"TECH_SEC"}));
      this.a_tech_sec = response.payload.users;
      response = await this.$axios.$post("api/users/getUsersByRole",{role:"SC_SEC"});
      this.a_sc_sec = response.payload.users;
      response = await this.$axios.$post("api/users/getUsersByRole",{role:"SC_LEAD"});
      this.a_sc_lead = response.payload.users;
      this.show = false;
    }
  }
}
</script>

<style scoped>
NuxtLink {
  color: black;
}

</style>
