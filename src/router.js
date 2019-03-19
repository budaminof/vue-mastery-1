/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import EventCreate from './views/EventCreate.vue';
import EventList from './views/EventList.vue';
import EventShow from './views/EventShow.vue';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true,
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routerFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then((event) => {
          routeTo.params.event = event;
          next();
        });
      },
    },
    {
      path: '/create',
      name: 'event-create',
      component: EventCreate,
    },
  ],
});

router.beforeEach((routeTo, routerFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
