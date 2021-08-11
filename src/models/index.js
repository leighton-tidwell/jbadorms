// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notifications, Users, DormBuildings, DormRooms } = initSchema(schema);

export {
  Notifications,
  Users,
  DormBuildings,
  DormRooms
};