export const state = () => ({
    transactions: [],
    notifications: []
});

export const mutations = {
    UPDATE_NOTIFICATIONS(state, notifications) {
        state.notifications = [...notifications]
    },
    UPDATE_TRANSACTIONS(state, transactions) {
        state.transactions = [...transactions]
    }
}

export const actions = {
    storeNotifications({commit}, notifications) {
        commit('UPDATE_NOTIFICATIONS', notifications)
    },
    storeTransactions({commit}, transactions) {
        commit('UPDATE_TRANSACTIONS', transactions)
    }
}

export const getters = {
    notifications(state) {
        return state.notifications;
    },
    transactions(state) {
        return state.transactions;
    }
}
