<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />

      Тестовое задание
    </v-app-bar-title>
    <v-spacer>
      <v-btn :to="{ name: 'AdsAdd' }"
        color="primary"
      >Новое объявление</v-btn>
    </v-spacer>
  </v-app-bar>
</template>

<script setup>
  //
</script>
