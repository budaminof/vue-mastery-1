<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <BaseIcon/>
    <router-link
      v-if="page !== 1"
      :to="{ name: 'event-list', query: {page: page - 1 }}"
      rel="prev"
    >PREVUES PAGE</router-link>
    <span v-if="page !== 1">|</span>
    <router-link
      v-if="eventsTotalCount > page * 3"
      :to="{ name: 'event-list', query: {page: page + 1 }}"
      rel="next"
    >NEXT PAGE</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventCard from '../components/EventCard.vue';

export default {
  components: { EventCard },
  created() {
    this.$store.dispatch('fetchEvents', { perPage: 3, page: this.page });
  },
  computed: {
    page() {
      return Number(this.$route.query.page) || 1;
    },
    ...mapState(['events', 'eventsTotalCount']),
  },
};
</script>
