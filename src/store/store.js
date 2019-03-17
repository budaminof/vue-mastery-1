/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import * as user from '@/store/modules/user';
import * as event from '@/store/modules/event';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
  },
  state: {
    categories: ['sustainability', 'nature', 'animal welfare',
      'housing', 'education', 'food', 'community'],
  },
});

// ACTIONS, MUTATIONS AND GETTERS are always registered under the global namespace,
// (root which is $store) even when using modules.
// We can have multiple Actions/Mutaions using the same name =>
// so if you are doing an action which should dispatch in multiple modules actions
//  - you can do that. BUT - we can end up with naming collisions!
// so we implement MODULE NameSpacing:
// this.$store.dispatch('modulesName/actionName');

// MUTATIONS should only be called from Actions inside the current Module.
