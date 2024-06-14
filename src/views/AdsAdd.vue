

<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <div>
        <v-btn
          color="primary"
          :to="{ name: 'AdsHome' }"
        >
          Назад
        </v-btn>
      </div>

      <v-sheet class="mx-auto" width="500">
        <v-form v-model="validAds" @submit.prevent>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Наименование объявления"
            :disabled="loading"
          ></v-text-field>

          <v-text-field
            v-model="price"
            :rules="priceRules"
            label="Цена"
            suffix="у.е."
            :disabled="loading"
          ></v-text-field>

          <v-textarea
            label="Описание объявления"
            v-model="description"
            variant="filled"
            :rules="descRules"
            :disabled="loading"
            auto-grow
          ></v-textarea>

          <div>
            <v-btn
              density="compact"
              icon="mdi-plus"
              :disabled="loading"
              @click="add"
            ></v-btn>
            Добавить ссылку на фото
          </div>
          <div v-bind:key="index" v-for="(item, index) in filenames">
            <v-text-field
              v-model="item.value"
              label="Ссылка на файл"
              :disabled="loading"
            ></v-text-field>
          </div>

          <v-btn
            class="mt-2"
            type="submit"
            color="primary"
            block
            :disabled="!validAds || loading"
            @click="submit"
          >Добавить</v-btn>
        </v-form>
      </v-sheet>

      <message-box
        :visible="showError"
        :text="error"
        @close="showError = false"
      />
    </v-responsive>
  </v-container>
</template>

<script>
import MessageBox from "@/components/MessageBox.vue";
import AdsService from "@/services/ads.service";

export default {
  name: "AdsAdd",
  components: {MessageBox},
  data() {
    return {
      loading: false,
      error: null,
      showError: false,
      name: null,
      validAds: false,
      nameRules: [
        value => {
          if (value?.length < 200 && value?.length >= 5)
            return true

          if (value?.length <= 5)
            return 'Наименование объявления должно быть не менее 5 символов'

          return 'Наименование объявления должно быть не более 200 символов'
        },
      ],
      descRules: [
        value => {
          if (value?.length >= 5  && value?.length < 1000) return true

          return 'Описание объявления должно быть не более 1000 символов и не менее 5 символов'
        },
      ],
      priceRules: [
        value => {
          if (/[^0-9]/.test(value)) {
            return 'Должны быть указаны цифрах'
          }

          if (value?.length > 20) {
            return 'Слишком большое число'
          }

          return true
        },
      ],
      description: null,
      price: 0,
      filenames: [],
    }
  },
  methods: {
    submit () {
      this.append()
    },
    add() {
      if (this.filenames.length === 3) {
        this.error = 'Больше трёх ссылок вводить нельзя'
        this.showError = true
        return
      }
      this.filenames.push({ value: '' })
    },
    append() {

      let object = {
        'name': this.name,
        'description': this.description,
        'price': parseInt(this.price),
        'filenames': this.filenames
      }
      console.log(object)

      AdsService.setAds(object)
        .then((response) => {
          this.loading = false

          if (!response.data.success) {
            this.error = response.data.message
            this.showError = true
            return
          }

          alert('Объявление записано')

          this.name = null
          this.description = null
          this.price = 0
          this.filenames = []
        })
        .catch((e) => {
          console.log(e)
          this.error = "Ошибка при записи объявления"
          this.loading = false
          this.showError = true
        })
    },
  },
}
</script>

<style scoped>

</style>
