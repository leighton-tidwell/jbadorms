// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Users, DormBuildings, DormRooms } = initSchema(schema);

export {
  Users,
  DormBuildings,
  DormRooms
};