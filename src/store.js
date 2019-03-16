import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: '123vbn', name: 'Bud Aminof',
    },
    categories: ['sustainability', 'nature', 'animal welfare',
      'housing', 'education', 'food', 'community'],
    events: [
      {
        id: 5928101,
        user: {
          id: 'abc123',
          name: 'Adam',
        },
        category: 'animal welfare',
        organizer: 'Adam',
        title: 'Cat Cabaret',
        description: 'Yay felines!',
        location: 'Meow Town',
        date: '2019-01-03T21:54:00.000Z',
        time: '2:00',
        attendees: [
          {
            name: 'Jonathan',
          },
          {
            name: 'Bud',
          },
          {
            name: 'Ryan',
          },
        ],
      },
      {
        id: 8419988,
        user: {
          id: 'abc123',
          name: 'Adam',
        },
        category: 'animal welfare',
        organizer: 'Adam',
        title: 'Kitty Cluster',
        description: 'Yay cats!',
        location: 'Catlandia',
        date: '2019-01-31T22:09:00.000Z',
        time: '7:00',
        attendees: [
          {
            name: 'Jonathan',
          },
          {
            name: 'Bud',
          },
          {
            name: 'Ryan',
          },
          {
            name: 'Erin',
          },
        ],
      },
      {
        id: 4582797,
        user: {
          id: 'abc123',
          name: 'Adam',
        },
        category: 'animal welfare',
        organizer: 'Adam',
        title: 'Puppy Parade',
        description: 'Yay pups!',
        location: 'Puptown ',
        date: '2019 - 02 - 02T23: 27: 00.000Z',
        time: '1:00',
        attendees: [
          {
            name: 'Bud',
          },
          {
            name: 'Erin',
          },
        ],
      },
    ],
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    catLength: state => state.categories.length,
    getEventById: state => id => state.events.find(event => event.id === id),
  },
});
