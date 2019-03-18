/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
export const namespaced = true;

export const state = {
  notifications: [],
};

// eslint-disable-next-line prefer-const
let nextId = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    });
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id,
    );
  },
};

// notice the naming here, because we are in namespaced modules
// so when ever we call those actions we reffer to the module name.
export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification);
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove);
  },
};
