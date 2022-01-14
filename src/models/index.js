// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notifications, Users, DormBuildings, DormRooms, AssignmentDataForm, Events, FAQ, Wings, Units, Appointments, WorkOrders } = initSchema(schema);

export {
  Notifications,
  Users,
  DormBuildings,
  DormRooms,
  AssignmentDataForm,
  Events,
  FAQ,
  Wings,
  Units,
  Appointments,
  WorkOrders
};