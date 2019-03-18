/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import EventService from '../../services/EventService';

export const namespaced = true;

export const state = {
  events: [],
  eventsTotalCount: 0,
  event: {},
};

export const mutations = {
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
};

export const actions = {
  // commit from the context, and event as a payload
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then((payload) => {
        commit('ADD_EVENT', payload.data);
        const notification = {
          type: 'success',
          message: 'Success, we added your event!',
        };
        dispatch('notifications/add', notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was a problem while trying to create your event: ${error.message}`,
        };
        dispatch('notifications/add', notification, { root: true });
        throw error;
      });
  },
  // payloads in Mutations and Actions
  // can be single variable OR an object
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit('SET_EVENTS', response.data);
        commit('SET_EVENTS_COUNT', response.headers['x-total-count']);
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was a problem while trying to get all the events: ${error.message}`,
        };
        // this allows the dispatcher to go to the root store, to the notifications
        // module and get the action.
        dispatch('notifications/add', notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    const currentEvent = getters.getEventById(id);
    if (currentEvent) {
      commit('SET_EVENT', currentEvent);
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data);
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: `There was a problem while trying to get the event: ${error.message}`,
          };
          dispatch('notifications/add', notification, { root: true });
        });
    }
  },
};

export const getters = {
  getEventById: state => id => state.events.find(event => event.id === id),
};
