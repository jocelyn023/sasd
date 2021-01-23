  import {
    listAllCitys
  } from '@/api/common'
  export default {
    data() {
      return {
        cityObj: {},
      };
    },
    mounted() {
      let cityObj = window.localStorage.getItem("cityObj");
      let isRequest = true;
      if (cityObj) {
        cityObj = JSON.parse(cityObj)
        if (cityObj.expire && cityObj.expire > new Date().getTime()) {
          isRequest = false
        }
      }
      if (!isRequest) {
        this.cityObj = cityObj.data;
      } else {
        this.getCitys();
      }
    },

    methods: {
      getCitys() {
        listAllCitys({}).then(res => {
          this.cityObj = this.getCityObj(res.data)
          window.localStorage.setItem("cityObj", JSON.stringify({
            "expire": new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
            data: this.cityObj
          }))
        })
      },
      getCityObj(list) {
        let obj = {
          province_list: {},
          city_list: {},
          county_list: {}
        }
        list.forEach(item => {
          obj.province_list[item.value] = item.label;
          item.children.forEach(city => {
            obj.city_list[city.value] = city.label;
            // if (city.children) {
            //   city.children.forEach(county => {
            //     obj.county_list[county.value] = county.label
            //   })
            // }
          })
        })
        return obj
      },
    }
  };