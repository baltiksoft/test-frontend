<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">

      <div v-if="!loading" style="margin: 5px;">
        Страница - {{ currentPage + 1}}
        <v-btn
          v-if="currentPage !== 0"
          color="primary"
          @click="currentPage--"
        >Пред.страница</v-btn>
        <v-btn
          v-if="ads.length === 10"
          color="primary"
          @click="currentPage++"
        >След.страница</v-btn>
      </div>
      <div v-if="!loading" style="margin: 5px;">
        Сортировка по
        <v-btn
          v-if="sortPrice"
          color="primary"
          @click="sortPrice=!sortPrice"
        >Дате добавления</v-btn>
        <v-btn
          v-if="!sortPrice"
          color="primary"
          @click="sortPrice=!sortPrice"
        >Цене</v-btn>
        в порядке
        <v-btn
          v-if="sortDesc"
          color="primary"
          @click="sortDesc=!sortDesc"
        >Возрастания</v-btn>
        <v-btn
          v-if="!sortDesc"
          color="primary"
          @click="sortDesc=!sortDesc"
        >Убывания</v-btn>
      </div>

      <v-progress-circular
        color="primary"
        v-if="loading"
        indeterminate
        class="text-center"
      ></v-progress-circular>
      <div v-if="ads.length > 0" >
        <v-list v-bind:key="index" v-for="(item, index) in ads" style="border-bottom: 1px dashed;">
          <v-list-item :to="{ name: 'AdsShow', params: { id: item.slug } }">
            <v-list-item-title  >{{ index + 1 }} - {{ item.name }}</v-list-item-title>
            <v-img
              v-if="item.filename"
              :src="item.filename"
              :aspect-ratio="1"
              class="bg-white"
              height="200"
            ></v-img>
            <div class="text-right text-blue-accent-1">Цена: <strong>{{ item.price }} у.е.</strong></div>
          </v-list-item>

        </v-list>

      </div>
      <div v-else-if="!loading">
        На странице {{ currentPage+1 }}  нет объявлений
      </div>
    </v-responsive>
    <message-box
      :visible="showError"
      :text="error"
      @close="showError = false"
    />
  </v-container>
</template>

<script>
import AdsService from "@/services/ads.service"
import MessageBox from "@/components/MessageBox"

export default {
  name: "AdsAll",
  components: {MessageBox},
  data() {
    return {
      loading: false,
      error: null,
      showError: false,
      ads: [],
      currentPage: 0,
      limit: 10,
      sortPrice: true,
      sortDesc: true,
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
      this.ads = []
      AdsService.getAdsAll(this.currentPage*this.limit, this.limit, this.sortPrice ? 'price' : 'created_at', this.sortDesc ? 'desc' : 'asc')
        .then((response) => {
          this.loading = false

          if (!response.data.success) {
            this.error = response.data.message
            this.showError = true
            return
          }

          // console.log(response)
          this.ads = response.data.data
          //console.log(this.ads)
        })
        .catch((e) => {
          console.log(e)
          this.error = "Ошибка при загрузке объявлений"
          this.loading = false
          this.showError = true
        })
    },
  },
  watch: {
    currentPage(val) {
      console.log(val)
        this.initialize()
    },
    sortPrice(val) {
      console.log(val)
      this.initialize()
    },
    sortDesc(val) {
      console.log(val)
      this.initialize()
    }
  }
}
</script>
