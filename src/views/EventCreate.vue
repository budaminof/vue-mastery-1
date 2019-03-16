<template>
  <div>
    <h2>Create and Event, {{user.name}}</h2>
    <p>Mapped getters {{catLength}} categories</p>
    <p>{{getEventById(5928101)}}</p>
    <ul>
      <li v-for="(category, i) in categories" :key="i">{{category}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['catLength', 'getEventById']),
    ...mapState(['user', 'categories']),
  },
};
</script>

<style scoped>
</style>
