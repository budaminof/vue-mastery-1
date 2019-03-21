<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input type="text" :value="value" @input="updateValue" v-bind="$attrs">
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/FormFieldMixin.js';

export default {
  mixins: [formFieldMixin],
};
</script>

<style scoped>
</style>
