export const state = () => ({
    user: null,
    users: [],
    client: {}
  });

export const mutations = {
    STORE_USER(state, user) {
      state.user = user
    },
    STORE_USERS(state, users) {
      state.users = users
    },
    STORE_CLIENT(state, client) {
      state.client = client
    }
  }

export const actions = {
    storeUser({commit}, user) {
      commit('STORE_USER', user)
    },
    storeUsers({commit}, users) {
      commit('STORE_USERS', users)
    },
    storeClient({commit}, client) {
      commit('STORE_CLIENT', client)
    }
  }

export const getters = {
    user(state) {
      return state.user
    },
    users(state) {
      return state.users
    },
    client(state) {
      return state.client
    }
}