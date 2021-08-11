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