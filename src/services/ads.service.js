import axios from 'axios'


class AdsService {

    // загрузить все объявления
    getAdsAll(offset, limit, sort, type) {
        return axios.get(import.meta.env.VITE_API_URL + `ads/${offset}/${limit}/${sort}/${type}`)
    }

    // загрузить объявление
    getAds(slug) {
      return axios.get(import.meta.env.VITE_API_URL + `ads/${slug}/fields/photo,description`)
    }

    // добавить объявление
    setAds(object) {
      return axios.post(import.meta.env.VITE_API_URL + 'ads', object)
    }
}

export default new AdsService()
