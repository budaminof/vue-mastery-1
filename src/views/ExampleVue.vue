<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="What's your email"
      v-model="email"
      @blur="$v.email.$touch()"
      :class="{error: $v.email.$error}"
    >
    <div v-if="$v.email.$error" class="-text-error">
      <p v-if="!$v.email.email">Please enter a valid email</p>
      <p v-if="!$v.email.required">Email is required</p>
    </div>
    <button type="submit" :disabled="$v.$invalid">SUBMIT</button>
    <p v-if="$v.$anyError" class="-text-error">Please fill out this freaking form!</p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      email: null,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    submit() {
      //set all field as touch - in case the user did not touch some required fields
      // so we can trigger the validation
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log("SUBMITTED", this.email);

      }
    }
  }
}
</script>

<style scoped>
</style>
