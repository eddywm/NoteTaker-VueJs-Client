<template>
  <v-alert error dismissible @input="onClose" :value="true" class="alert-text">
      {{ text }}
  </v-alert>
</template>
<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>
<style>
  .alert-text {
    font-weight: bold;
    font-size: 18px;
  }
</style>

