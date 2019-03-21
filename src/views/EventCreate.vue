<template>
  <div>
    <h1>CREATE AN EVENT</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="field"
      />

      <h3>Name & describe your event</h3>
      <BaseInput label="Title" v-model="event.title" type="text" placeholder="Title" class="field"/>

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
      />

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <DatePicker v-model="event.date" placeholder="Select a date"/>
      </div>

      <BaseSelect label="Select a time" :options="times" v-model="event.time" class="field"/>

      <BaseButton type="submit" buttonClass="-fill-gradient">SUBMIT</BaseButton>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker';
import NProgress from 'nprogress';

export default {
  components: { DatePicker },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i += 1) {
      times.push(`${i}:00`);
    }
    return {
      event: this.createNewEventObject(),
      times,
      categories: this.$store.state.categories,
    };
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.$store.dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({ name: 'event-show', params: { id: this.event.id } });
          this.event = this.createNewEventObject();
        })
        .catch((err) => {
          console.log(err);
          NProgress.done();
        });
    },
    createNewEventObject() {
      const organizer = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);
      return {
        id,
        organizer,
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      };
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
