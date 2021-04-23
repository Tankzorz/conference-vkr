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
          <td class="align-middle"><span>{{ th.firstName + ' ' + th.surname }}</span></td>
          <td class="align-middle"><span>{{ th.project_lead }}</span></td>
          <td class="align-middle"><span>{{ th.university }}</span></td>
          <td class="align-middle">
            <button type="button" class="btn btn-sm btn-outline-primary btn-block" @click="downloadThesis(th.thesisID)">Скачать</button>
          </td>
        </tr>
        </tbody>
      </table>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "thesises",
  data: () => ({
    thesis:[],
    show: false,
  }),

  mounted() {
    this.reload()
  },

  methods: {
    async reload() {
      this.show = true;
      console.log(this.status)
      let response = await this.$axios.$post("/api/thesises/getThesisesByStatus", {
        status: "ACCEPTED"
      });
      this.thesis = response.payload.thesises
      this.show = false;
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
  }
}
</script>

<style scoped>

</style>
