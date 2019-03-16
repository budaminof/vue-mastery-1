/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import EventService from './services/EventService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: '123vbn', name: 'Bud Aminof',
    },
    categories: ['sustainability', 'nature', 'animal welfare',
      'housing', 'education', 'food', 'community'],
    events: [],
    eventsTotalCount: 0,
    event: {},
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_COUNT(state, count) {
      state.eventsTotalCount = Number(count);
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    // commit from the context, and event as a payload
    async createEvent({ commit }, event) {
      const payload = await EventService.postEvent(event);
      commit('ADD_EVENT', payload.data);
    },
    // payloads in Mutations and Actions
    // can be single variable OR an object
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit('SET_EVENTS', response.data);
          commit('SET_EVENTS_COUNT', response.headers['x-total-count']);
        })
        .catch((error) => {
          console.log('OPSI', error);
        });
    },
    fetchEvent({ commit, getters }, id) {
      const currentEvent = getters.getEventById(id);
      if (currentEvent) {
        commit('SET_EVENT', currentEvent);
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data);
          })
          .catch((error) => {
            console.log('opsi', error);
          });
      }
    },
  },
  getters: {
    getEventById: state => id => state.events.find(event => event.id === id),
  },
});
