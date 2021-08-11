/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNotifications = /* GraphQL */ `
  query GetNotifications($id: ID!) {
    getNotifications(id: $id) {
      id
      name
      email
      subject
      message
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        subject
        message
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotifications = /* GraphQL */ `
  query SyncNotifications(
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        email
        subject
        message
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      email
      name
      phone
      rank
      dormbuilding
      dormroom
      verified
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        phone
        rank
        dormbuilding
        dormroom
        verified
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        name
        phone
        rank
        dormbuilding
        dormroom
        verified
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDormBuildings = /* GraphQL */ `
  query GetDormBuildings($id: ID!) {
    getDormBuildings(id: $id) {
      id
      dormbuilding
      capacity
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      DormRooms {
        nextToken
        startedAt
      }
    }
  }
`;
export const listDormBuildings = /* GraphQL */ `
  query ListDormBuildings(
    $filter: ModelDormBuildingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDormBuildings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dormbuilding
        capacity
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDormBuildings = /* GraphQL */ `
  query SyncDormBuildings(
    $filter: ModelDormBuildingsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDormBuildings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dormbuilding
        capacity
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDormRooms = /* GraphQL */ `
  query GetDormRooms($id: ID!) {
    getDormRooms(id: $id) {
      id
      dormbuildingsID
      dormroom
      dormresident
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listDormRooms = /* GraphQL */ `
  query ListDormRooms(
    $filter: ModelDormRoomsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDormRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dormbuildingsID
        dormroom
        dormresident
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDormRooms = /* GraphQL */ `
  query SyncDormRooms(
    $filter: ModelDormRoomsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDormRooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dormbuildingsID
        dormroom
        dormresident
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
