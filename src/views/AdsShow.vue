<template>
  <div>
    <v-btn
      color="primary"
      @click="$router.go(-1)"
    >
      Назад
    </v-btn>
    <v-progress-circular
      color="primary"
      v-if="loading"
      indeterminate
      class="text-center"
    ></v-progress-circular>
    <div v-if="!loading && !showError">
      <h1>{{ ad.name }}</h1>
      <div class="font-weight-bold text-blue left-0">Цена - {{ ad.price }} у.е.</div>
      <v-row>
      <v-col v-bind:key="index" v-for="(item, index) in ad.filenames" style="margin: 5px;">
        <v-img
          v-if="item.filename"
          :src="item.filename"
          :aspect-ratio="1"
          class="bg-white"
          height="200"
        ></v-img>
      </v-col>
      </v-row>
      <p>{{ ad.description}}</p>
    </div>
    <message-box
      :visible="showError"
      :text="error"
      @close="showError = false"
    />
  </div>
</template>


<script>
import AdsService from "@/services/ads.service"
import MessageBox from "@/components/MessageBox"

export default {
  name: "AdsShow",
  components: {MessageBox},
  data() {
    return {
      loading: false,
      error: null,
      showError: false,
      ad: null,
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize() {
      this.loading = true
      this.error = null
      this.showError = false
      this.ad = null
      AdsService.getAds(this.$route.params.id)
        .then((response) => {
          this.loading = false

          if (!response.data.success) {
            this.error = response.data.message
            this.showError = true
            return
          }

          this.ad = response.data.data
          console.log(this.ad)
        })
        .catch((e) => {
          console.log(e)
          this.error = "Ошибка при загрузке объявления"
          this.loading = false
          this.showError = true
        })
    },
  },
}
</script>


<style scoped>

</style>
