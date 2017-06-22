import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '1334674446102168',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  co: 'ca',
};

// Helper function
const buildJobsUrl = (zip, q) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, q, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, query, callback) => async (dispatch) => {
  // convert lat and long to zip code
  try {
    //let zip = await reverseGeocode(region);
    let zip = 'Toronto, ON';
    const url = buildJobsUrl(zip, query);
    console.log('url', url);

    // Make a request to api
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();

  } catch (err) {
    console.log(err);
  }
};

export const likeJob = (job) => {
  return {
    type: LIKE_JOB,
    payload: job
  };
};

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS
  };
};
