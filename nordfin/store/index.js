export const state = () => ({
    user: null,
    users: [],
    client: {},
    clientNotifications: [],
    clientTransactions: [],
    kycfiles: []
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
    },
    STORE_NOTIFICATIONS(state, notifications) {
      state.clientNotifications = [...notifications]
    },
    STORE_TRANSACTIONS(state, transactions) {
      state.clientTransactions = [...transactions]
    },
    KYC_FILES(state, files) {
      state.kycfiles = [...files]
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
    },
    storeNotifications({commit}, notifications) {
      commit('STORE_NOTIFICATIONS', notifications)
    },
    storeTransactions({commit}, transactions) {
      commit('STORE_TRANSACTIONS', transactions)
    },
    storeFile({commit}, files) {
      commit('KYC_FILES', files)
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
    },
    clientNotifications(state) {
      return state.clientNotifications
    },
    clientTransactions(state) {
      return state.clientTransactions
    },
    kycFiles(state) {
      return state.kycfiles
    }
}