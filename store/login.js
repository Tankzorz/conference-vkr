export const state = () => ({
  loggedIn: false,
  token: "",
  name: "",
  surname: "",
  email: "",
  role: "",
  userID: ""
})

export const mutations = {
  toggleStatus(state) {
    if(state.loggedIn==false) state.loggedIn = true
    else state.loggedIn = false
  },
  setName(state, name) {
    state.name = name;
  },
  setSurname(state, surname) {
    state.surname = surname;
  },
  setEmail(state, email) {
    state.email = email;
  },
  setRole(state, role) {
    state.role = role;
  },
  setUserId(state, userID) {
    state.userID = userID;
  }
}
export const actions = {
  authUser({commit}, arr_resp) {
    commit("toggleStatus")
    commit("setName", arr_resp[0])
    commit("setSurname", arr_resp[1])
    commit("setEmail", arr_resp[2])
    commit("setRole",arr_resp[3])
    commit("setUserId",arr_resp[4])
  },
  unLogin({commit}) {
    commit("toggleStatus")
    commit("setName", '')
    commit("setSurname", '')
    commit("setEmail", '')
    commit("setRole",'')
    commit("setUserId",null)
  }
}
export const getters = {
  name: s => s.name,
  role: s => s.role,
  userID: s => s.userID,
}
