export const state = () => ({
    user: null,
    users: null
  });

export const mutations = {
    STORE_USER(state, user) {
      state.user = user
    },
    STORE_USERS(state, users) {
      state.users = users
    }
  }

export const actions = {
    storeUser({commit}, user) {
      commit('STORE_USER', user)
    },
    storeUsers({commit}, users) {
      commit('STORE_USERS', users)
    }
  }

export const getters = {
    user(state) {
      return state.user
    },
    users(state) {
      return state.users
    }
}