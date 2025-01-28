import * as functions from 'firebase-functions';
import hotelAPIsApp from './hotelAPIsHandler.js';

export const hotelAPIsHandler = functions.https.onRequest(hotelAPIsApp);
