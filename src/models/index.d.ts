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

type FAQMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WingsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UnitsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AppointmentsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WorkOrdersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Notifications {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly expiryTime: number;
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
  readonly userType?: string;
  readonly dormbuilding?: number;
  readonly dormroom?: number;
  readonly residentresponsibilities?: boolean;
  readonly mattressagreement?: boolean;
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
  readonly expiryTime: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AssignmentDataForm, AssignmentDataFormMetaData>);
  static copyOf(source: AssignmentDataForm, mutator: (draft: MutableModel<AssignmentDataForm, AssignmentDataFormMetaData>) => MutableModel<AssignmentDataForm, AssignmentDataFormMetaData> | void): AssignmentDataForm;
}

export declare class Events {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly expiryTime: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Events, EventsMetaData>);
  static copyOf(source: Events, mutator: (draft: MutableModel<Events, EventsMetaData>) => MutableModel<Events, EventsMetaData> | void): Events;
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

export declare class Appointments {
  readonly id: string;
  readonly service: string;
  readonly employeeName: string;
  readonly employeeEmail: string;
  readonly dateOfAppointment: string;
  readonly timeOfAppointment: string;
  readonly nameOfResident: string;
  readonly emailOfResident: string;
  readonly phoneOfResident: string;
  readonly expiryTime: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Appointments, AppointmentsMetaData>);
  static copyOf(source: Appointments, mutator: (draft: MutableModel<Appointments, AppointmentsMetaData>) => MutableModel<Appointments, AppointmentsMetaData> | void): Appointments;
}

export declare class WorkOrders {
  readonly id: string;
  readonly phone: string;
  readonly name: string;
  readonly rank: string;
  readonly building: string;
  readonly roomNumber: string;
  readonly urgency: string;
  readonly requestType: string;
  readonly description: string;
  readonly permission: boolean;
  readonly escort: boolean;
  readonly securingYourItems: boolean;
  readonly expiryTime: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<WorkOrders, WorkOrdersMetaData>);
  static copyOf(source: WorkOrders, mutator: (draft: MutableModel<WorkOrders, WorkOrdersMetaData>) => MutableModel<WorkOrders, WorkOrdersMetaData> | void): WorkOrders;
}