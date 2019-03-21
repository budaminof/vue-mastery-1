<template>
  <div>
    <label v-if="label">{{label}}</label>
    <select type="text" :value="value" @change="updateValue" v-bind="$attrs">
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === value"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  // ATTRAS will not work for styling attributes.
  // VUE3 will have attras include styling
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: [String, Number],
    options: {
      type: Array,
      required: true,
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style scoped>
</style>
