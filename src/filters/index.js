import Vue from "vue";

import moment from 'moment'

Vue.filter('setDateTimeFormat', function (value) {
    if (!value) return ''
      return moment(value).format('MMMM Do YYYY, hh:mm')
    }
  )