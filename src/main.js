import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store/store';
import 'nprogress/nprogress.css';
import DateFilter from './fiters/date';

Vue.filter('date', DateFilter);
Vue.use(Vuelidate);
// be careful with those.
// EVERY component will have access to those.
// also - it has to ve declared above the Vue instance
// Vue.mixin({
//   mounted() {
//     console.log('I am a mixed into every component');
//   },
// });

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  );


  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig,
  );
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
