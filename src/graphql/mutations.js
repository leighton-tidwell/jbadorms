/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNotifications = /* GraphQL */ `
  mutation CreateNotifications(
    $input: CreateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    createNotifications(input: $input, condition: $condition) {
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
export const updateNotifications = /* GraphQL */ `
  mutation UpdateNotifications(
    $input: UpdateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    updateNotifications(input: $input, condition: $condition) {
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
export const deleteNotifications = /* GraphQL */ `
  mutation DeleteNotifications(
    $input: DeleteNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    deleteNotifications(input: $input, condition: $condition) {
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
export const createDormBuildings = /* GraphQL */ `
  mutation CreateDormBuildings(
    $input: CreateDormBuildingsInput!
    $condition: ModelDormBuildingsConditionInput
  ) {
    createDormBuildings(input: $input, condition: $condition) {
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
export const updateDormBuildings = /* GraphQL */ `
  mutation UpdateDormBuildings(
    $input: UpdateDormBuildingsInput!
    $condition: ModelDormBuildingsConditionInput
  ) {
    updateDormBuildings(input: $input, condition: $condition) {
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
export const deleteDormBuildings = /* GraphQL */ `
  mutation DeleteDormBuildings(
    $input: DeleteDormBuildingsInput!
    $condition: ModelDormBuildingsConditionInput
  ) {
    deleteDormBuildings(input: $input, condition: $condition) {
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
export const createDormRooms = /* GraphQL */ `
  mutation CreateDormRooms(
    $input: CreateDormRoomsInput!
    $condition: ModelDormRoomsConditionInput
  ) {
    createDormRooms(input: $input, condition: $condition) {
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
export const updateDormRooms = /* GraphQL */ `
  mutation UpdateDormRooms(
    $input: UpdateDormRoomsInput!
    $condition: ModelDormRoomsConditionInput
  ) {
    updateDormRooms(input: $input, condition: $condition) {
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
export const deleteDormRooms = /* GraphQL */ `
  mutation DeleteDormRooms(
    $input: DeleteDormRoomsInput!
    $condition: ModelDormRoomsConditionInput
  ) {
    deleteDormRooms(input: $input, condition: $condition) {
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
