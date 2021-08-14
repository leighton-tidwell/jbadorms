// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notifications, Users, DormBuildings, DormRooms, AssignmentDataForm, Events, JBAContacts, FAQ, HoursOfBusiness, DormContacts, Wings, Units } = initSchema(schema);

export {
  Notifications,
  Users,
  DormBuildings,
  DormRooms,
  AssignmentDataForm,
  Events,
  JBAContacts,
  FAQ,
  HoursOfBusiness,
  DormContacts,
  Wings,
  Units
};