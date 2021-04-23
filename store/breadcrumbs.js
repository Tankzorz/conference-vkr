export const state = () => ({
  items: [
    {
      text: 'Главная',
      to: '/'
    }
  ]
})

export const mutations = {
  setMain(state) {
    state.items = [
      {
        text: 'Главная',
        to: '/'
      }
    ]
  },
  setSections(state) {
    state.items = [
      {
        text: 'Главная',
        to: '/'
      },
      {
        text: 'Секции',
        to: 'Sections'
      }
    ]
  }
}

export const actions = {
  async Breadcrumbs({commit}, a) {
    switch(a) {
      case 'main':
        commit('setMain')
        break;
      case 'section':
        commit('setSections')
        break;
    }
  }
}

export const getters = {
  items: s => s.items
}
