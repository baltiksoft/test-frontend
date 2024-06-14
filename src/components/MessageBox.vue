<template>
  <v-snackbar
      :color="color"
      v-model="showError"
      :timeout="20000"
  >
    {{ text }}
    <template v-slot:actions>
      <v-btn
          variant="text"
          small
          @click="showError = false"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'error',
    },
    text: {
      type: String,
      default: 'Ошибка',
      require: true,
    },
  },
  data() {
    return {
      showError: false,
    }
  },
  watch: {
    visible(val) {
      this.showError = val
    },
    showError(val) {
      if (!val)
        this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>