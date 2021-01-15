import Vue from 'vue'
import axios from 'axios'
import config from '../../config'

const axiosConfig = {
  baseURL: config.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4000/',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  },
  withCredentials: true,
};

Vue.prototype.$axios = axios.create(axiosConfig);