import { onRequest } from 'firebase-functions/v2/https';
import hotelAPIsApp from './hotelAPIsHandler.js';

export const hotelAPIsHandler = onRequest(hotelAPIsApp);
