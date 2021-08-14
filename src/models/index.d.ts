import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NotificationsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DormBuildingsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DormRoomsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AssignmentDataFormMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EventsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type JBAContactsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FAQMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type HoursOfBusinessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DormContactsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WingsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UnitsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Notifications {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Notifications, NotificationsMetaData>);
  static copyOf(source: Notifications, mutator: (draft: MutableModel<Notifications, NotificationsMetaData>) => MutableModel<Notifications, NotificationsMetaData> | void): Notifications;
}

export declare class Users {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phone: string;
  readonly rank?: string;
  readonly dormbuilding?: number;
  readonly dormroom?: number;
  readonly verified: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}

export declare class DormBuildings {
  readonly id: string;
  readonly dormbuilding: number;
  readonly capacity: number;
  readonly DormRooms?: (DormRooms | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<DormBuildings, DormBuildingsMetaData>);
  static copyOf(source: DormBuildings, mutator: (draft: MutableModel<DormBuildings, DormBuildingsMetaData>) => MutableModel<DormBuildings, DormBuildingsMetaData> | void): DormBuildings;
}

export declare class DormRooms {
  readonly id: string;
  readonly dormbuildingsID?: string;
  readonly dormroom: number;
  readonly dormresident?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<DormRooms, DormRoomsMetaData>);
  static copyOf(source: DormRooms, mutator: (draft: MutableModel<DormRooms, DormRoomsMetaData>) => MutableModel<DormRooms, DormRoomsMetaData> | void): DormRooms;
}

export declare class AssignmentDataForm {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly dodId: number;
  readonly dob: string;
  readonly sex: string;
  readonly rank: string;
  readonly dateOfRank: string;
  readonly dateEnteredMilitary: string;
  readonly wing: string;
  readonly unit: string;
  readonly officeSymbol: string;
  readonly flight: string;
  readonly dutyPhone: string;
  readonly supervisorName: string;
  readonly supervisorPhone: string;
  readonly sponsorName: string;
  readonly sponsorPhone: string;
  readonly carMake: string;
  readonly carModel: string;
  readonly carYear: string;
  readonly licensePlateNumber: string;
  readonly expectedArrivalDate: string;
  readonly _ttl: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AssignmentDataForm, AssignmentDataFormMetaData>);
  static copyOf(source: AssignmentDataForm, mutator: (draft: MutableModel<AssignmentDataForm, AssignmentDataFormMetaData>) => MutableModel<AssignmentDataForm, AssignmentDataFormMetaData> | void): AssignmentDataForm;
}

export declare class Events {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly _ttl: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Events, EventsMetaData>);
  static copyOf(source: Events, mutator: (draft: MutableModel<Events, EventsMetaData>) => MutableModel<Events, EventsMetaData> | void): Events;
}

export declare class JBAContacts {
  readonly id: string;
  readonly title: string;
  readonly phone: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<JBAContacts, JBAContactsMetaData>);
  static copyOf(source: JBAContacts, mutator: (draft: MutableModel<JBAContacts, JBAContactsMetaData>) => MutableModel<JBAContacts, JBAContactsMetaData> | void): JBAContacts;
}

export declare class FAQ {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FAQ, FAQMetaData>);
  static copyOf(source: FAQ, mutator: (draft: MutableModel<FAQ, FAQMetaData>) => MutableModel<FAQ, FAQMetaData> | void): FAQ;
}

export declare class HoursOfBusiness {
  readonly id: string;
  readonly dayOfWeek: string;
  readonly hours: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<HoursOfBusiness, HoursOfBusinessMetaData>);
  static copyOf(source: HoursOfBusiness, mutator: (draft: MutableModel<HoursOfBusiness, HoursOfBusinessMetaData>) => MutableModel<HoursOfBusiness, HoursOfBusinessMetaData> | void): HoursOfBusiness;
}

export declare class DormContacts {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<DormContacts, DormContactsMetaData>);
  static copyOf(source: DormContacts, mutator: (draft: MutableModel<DormContacts, DormContactsMetaData>) => MutableModel<DormContacts, DormContactsMetaData> | void): DormContacts;
}

export declare class Wings {
  readonly id: string;
  readonly wing: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Wings, WingsMetaData>);
  static copyOf(source: Wings, mutator: (draft: MutableModel<Wings, WingsMetaData>) => MutableModel<Wings, WingsMetaData> | void): Wings;
}

export declare class Units {
  readonly id: string;
  readonly unit: string;
  readonly wing: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Units, UnitsMetaData>);
  static copyOf(source: Units, mutator: (draft: MutableModel<Units, UnitsMetaData>) => MutableModel<Units, UnitsMetaData> | void): Units;
}