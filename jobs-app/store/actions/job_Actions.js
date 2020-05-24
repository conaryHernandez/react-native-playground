import axios from 'axios';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { API_KEY } from '../../keys';

import { FETCH_JOBS } from './types';

import * as JOB_DATA from '../../data/IndeedJobData.json'; // Dummy data
import { Alert } from 'react-native';

export const fetchJobs = (region, cb) => {
  return async (dispatch) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      const { latitude, longitude } = region;

      Location.setApiKey(API_KEY);
      try {
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        // FETCH CALL TO API const { data } = await axios.get('../../data/IndeedJobData.json');

        console.log('uh?');
        console.log('JOB_DATA', JSON.parse(JOB_DATA));

        dispatch({
          type: FETCH_JOBS,
          payload: JSON.parse(JOB_DATA),
        });
        cb();
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Permissions required');
    }
  };
};
