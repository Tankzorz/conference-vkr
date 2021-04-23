<template>
  <b-container fluid="">
    <div class="conf">
      <div class="container">
        <div class="pt-5"></div>
        <div class="pt-5"></div>
        <p class="text-center mt-4 pb-5 mb-0">Научная конференция — форма организации научной деятельности, при которой исследователи (не обязательно учёные или студенты) представляют и обсуждают свои работы. Обычно заранее (в информационном письме либо стендовом объявлении) сообщается о теме, времени и месте проведения конференции. Затем начинается сбор тезисов докладов и иногда организационных взносов.</p>
        <div class="pb-5"></div>
      </div>
    </div>
    <div id="contact">
      <div class="pt-5"></div>
      <h1 class="text-center font-weight-bold mt-3 mb-3">Контакты</h1>
      <div class="pb-5"></div>
      <div class="contacts">
        <div class="row m-0">
          <div class="col-md p-0">
            <p class="text-center text-uppercase pt-5">Номер телефона:</p>
            <a class="tel" href="#"><p class="text-justify mt-3 pb-5 mb-0 text-center text-uppercase">+8 (800) 555-35-35</p></a>
          </div>
          <div class="col-md p-0">
            <p class="text-center text-uppercase pt-md-5">Наша почта:</p>
            <a class="tel" href="#"><p class="text-justify mt-3 pb-5 mb-0 text-center">example@mail.ru</p></a>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "index",
  middleware: 'index',
  async fetch({store}) {
    await store.dispatch('breadcrumbs/Breadcrumbs', 'main')
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.conf {
  background: url(~assets/conf.jpg) 100% 100% no-repeat;
  background-attachment: fixed;
  text-shadow: #000 0 0 10px;
  color: #FFF;
  background-size: cover;
}

.contacts {
  background: url(~assets/phone.jpg) 100% 100% no-repeat;
  text-shadow: #000 0 0 10px;
  color: #FFF;
  background-attachment: fixed;
}

@media screen and (min-width: 1200px) {
  p {
    font-size: 25px;
  }
  .conf .container h1 {
    font-size: 100px;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  p {
    font-size: 22px;
  }
  .conf .container h1 {
    font-size: 85px;
  }
}


@media screen and (min-width: 576px) and (max-width: 991px) {
  p {
    font-size: 18px;
  }
  .conf .container h1 {
    font-size: 70px;
  }
}

@media screen and (max-width: 575px) {
  p {
    font-size: 16px;
  }
  .conf .container h1 {
    font-size: 55px;
  }
}

.conf .container h1 {
  color: #85C6D7;
}

.tel {
  color: inherit;
}

.tel:hover {
  color: inherit;
}
</style>
