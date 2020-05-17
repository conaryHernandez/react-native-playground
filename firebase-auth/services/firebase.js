import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'https://us-central1-one-time-password-eceb2.cloudfunctions.net',
});
