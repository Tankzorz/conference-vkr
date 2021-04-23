<template>
  <b-container fluid>
    <button type="button" class="btn btn-primary mb-2" data-toggle="modal" data-target="#addThesis">Добавить тезис</button>
    <div class="modal fade" id="addThesis" tabindex="-1" role="dialog" aria-labelledby="add" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTitle">Добавить тезис</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="thesisName">Название</label>
              <input type="text" class="form-control" id="thesisName">
            </div>
            <div class="mb-3">
              <label for="univ">Университет</label>
              <input type="text" class="form-control" id="univ">
            </div>
            <div class="mb-3">
              <label for="projLead">Научный руководитель</label>
              <input type="text" class="form-control" id="projLead">
            </div>
            <div class="mb-3">
              <label for="addThesisSelect">Секция</label>
              <select class="form-control" id="addThesisSelect">
                <option>Секция 1</option>
                <option>Секция 2</option>
              </select>
            </div>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="thesisFile">
              <label class="custom-file-label" for="thesisFile" data-browse="Выбрать">Выберите файл</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
            <button type="button" class="btn btn-primary">Добавить</button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Название</th>
        <th scope="col">Университет</th>
        <th scope="col">Научный руководитель</th>
        <th scope="col">Секция</th>
        <th scope="col">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="align-middle"><span>Название</span></td>
        <td class="align-middle"><span>Университет</span></td>
        <td class="align-middle"><span>Научный руководитель</span></td>
        <td class="align-middle"><span>Секция</span></td>
        <td class="align-middle">
          <div><button type="button" class="btn btn-sm btn-outline-primary btn-block">Скачать</button></div>
          <div class="mt-2"><button type="button" class="btn btn-sm btn-outline-danger btn-block">Удалить</button></div>
        </td>
      </tr>
      <tr>
        <td class="align-middle"><span>Название</span></td>
        <td class="align-middle"><span>Университет</span></td>
        <td class="align-middle"><span>Научный руководитель</span></td>
        <td class="align-middle"><span>Секция</span></td>
        <td class="align-middle">
          <div><button type="button" class="btn btn-sm btn-outline-primary btn-block">Скачать</button></div>
          <div class="mt-2"><button type="button" class="btn btn-sm btn-outline-danger btn-block">Удалить</button></div>
        </td>
      </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
export default {
  name: "ThesisList"
}
</script>

<style scoped>

</style>
