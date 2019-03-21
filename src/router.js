/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import EventCreate from './views/EventCreate.vue';
import EventList from './views/EventList.vue';
import EventShow from './views/EventShow.vue';
import NotFound from './views/NotFound.vue';
import NetworkIssue from './views/NetworkIssue.vue';
import Example from './views/ExampleVue.vue';
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
        store.dispatch('event/fetchEvent', routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event;
            next();
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return next({ name: '404', params: { resource: 'event' } });
            }
            return next({ name: 'network-issue' });
          });
      },
    },
    {
      path: '/create',
      name: 'event-create',
      component: EventCreate,
    },
    {
      path: '/example',
      name: 'Example',
      component: Example,
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true,
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue,
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } },
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
