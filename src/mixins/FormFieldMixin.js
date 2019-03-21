// eslint-disable-next-line import/prefer-default-export
export const formFieldMixin = {
  // ATTRAS will not work for styling attributes.
  // VUE3 will have attras include styling
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
