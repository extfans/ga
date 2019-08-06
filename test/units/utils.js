import Ga from '@extfans/ga';
import { TRACKING_ID, USER_ID } from './consts';

export function createGa() {
  return new Ga({
    trackingId: TRACKING_ID,
    userId: USER_ID
  });
}