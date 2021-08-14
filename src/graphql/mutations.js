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
export const createAssignmentDataForm = /* GraphQL */ `
  mutation CreateAssignmentDataForm(
    $input: CreateAssignmentDataFormInput!
    $condition: ModelAssignmentDataFormConditionInput
  ) {
    createAssignmentDataForm(input: $input, condition: $condition) {
      id
      name
      email
      phone
      dodId
      dob
      sex
      rank
      dateOfRank
      dateEnteredMilitary
      wing
      unit
      officeSymbol
      flight
      dutyPhone
      supervisorName
      supervisorPhone
      sponsorName
      sponsorPhone
      carMake
      carModel
      carYear
      licensePlateNumber
      expectedArrivalDate
      expiryTime
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateAssignmentDataForm = /* GraphQL */ `
  mutation UpdateAssignmentDataForm(
    $input: UpdateAssignmentDataFormInput!
    $condition: ModelAssignmentDataFormConditionInput
  ) {
    updateAssignmentDataForm(input: $input, condition: $condition) {
      id
      name
      email
      phone
      dodId
      dob
      sex
      rank
      dateOfRank
      dateEnteredMilitary
      wing
      unit
      officeSymbol
      flight
      dutyPhone
      supervisorName
      supervisorPhone
      sponsorName
      sponsorPhone
      carMake
      carModel
      carYear
      licensePlateNumber
      expectedArrivalDate
      expiryTime
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteAssignmentDataForm = /* GraphQL */ `
  mutation DeleteAssignmentDataForm(
    $input: DeleteAssignmentDataFormInput!
    $condition: ModelAssignmentDataFormConditionInput
  ) {
    deleteAssignmentDataForm(input: $input, condition: $condition) {
      id
      name
      email
      phone
      dodId
      dob
      sex
      rank
      dateOfRank
      dateEnteredMilitary
      wing
      unit
      officeSymbol
      flight
      dutyPhone
      supervisorName
      supervisorPhone
      sponsorName
      sponsorPhone
      carMake
      carModel
      carYear
      licensePlateNumber
      expectedArrivalDate
      expiryTime
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createEvents = /* GraphQL */ `
  mutation CreateEvents(
    $input: CreateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    createEvents(input: $input, condition: $condition) {
      id
      title
      date
      _ttl
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateEvents = /* GraphQL */ `
  mutation UpdateEvents(
    $input: UpdateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    updateEvents(input: $input, condition: $condition) {
      id
      title
      date
      _ttl
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvents = /* GraphQL */ `
  mutation DeleteEvents(
    $input: DeleteEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    deleteEvents(input: $input, condition: $condition) {
      id
      title
      date
      _ttl
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createJBAContacts = /* GraphQL */ `
  mutation CreateJBAContacts(
    $input: CreateJBAContactsInput!
    $condition: ModelJBAContactsConditionInput
  ) {
    createJBAContacts(input: $input, condition: $condition) {
      id
      title
      phone
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateJBAContacts = /* GraphQL */ `
  mutation UpdateJBAContacts(
    $input: UpdateJBAContactsInput!
    $condition: ModelJBAContactsConditionInput
  ) {
    updateJBAContacts(input: $input, condition: $condition) {
      id
      title
      phone
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteJBAContacts = /* GraphQL */ `
  mutation DeleteJBAContacts(
    $input: DeleteJBAContactsInput!
    $condition: ModelJBAContactsConditionInput
  ) {
    deleteJBAContacts(input: $input, condition: $condition) {
      id
      title
      phone
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createFAQ = /* GraphQL */ `
  mutation CreateFAQ(
    $input: CreateFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    createFAQ(input: $input, condition: $condition) {
      id
      question
      answer
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateFAQ = /* GraphQL */ `
  mutation UpdateFAQ(
    $input: UpdateFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    updateFAQ(input: $input, condition: $condition) {
      id
      question
      answer
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteFAQ = /* GraphQL */ `
  mutation DeleteFAQ(
    $input: DeleteFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    deleteFAQ(input: $input, condition: $condition) {
      id
      question
      answer
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createHoursOfBusiness = /* GraphQL */ `
  mutation CreateHoursOfBusiness(
    $input: CreateHoursOfBusinessInput!
    $condition: ModelHoursOfBusinessConditionInput
  ) {
    createHoursOfBusiness(input: $input, condition: $condition) {
      id
      dayOfWeek
      hours
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateHoursOfBusiness = /* GraphQL */ `
  mutation UpdateHoursOfBusiness(
    $input: UpdateHoursOfBusinessInput!
    $condition: ModelHoursOfBusinessConditionInput
  ) {
    updateHoursOfBusiness(input: $input, condition: $condition) {
      id
      dayOfWeek
      hours
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteHoursOfBusiness = /* GraphQL */ `
  mutation DeleteHoursOfBusiness(
    $input: DeleteHoursOfBusinessInput!
    $condition: ModelHoursOfBusinessConditionInput
  ) {
    deleteHoursOfBusiness(input: $input, condition: $condition) {
      id
      dayOfWeek
      hours
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createDormContacts = /* GraphQL */ `
  mutation CreateDormContacts(
    $input: CreateDormContactsInput!
    $condition: ModelDormContactsConditionInput
  ) {
    createDormContacts(input: $input, condition: $condition) {
      id
      name
      phone
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateDormContacts = /* GraphQL */ `
  mutation UpdateDormContacts(
    $input: UpdateDormContactsInput!
    $condition: ModelDormContactsConditionInput
  ) {
    updateDormContacts(input: $input, condition: $condition) {
      id
      name
      phone
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteDormContacts = /* GraphQL */ `
  mutation DeleteDormContacts(
    $input: DeleteDormContactsInput!
    $condition: ModelDormContactsConditionInput
  ) {
    deleteDormContacts(input: $input, condition: $condition) {
      id
      name
      phone
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createWings = /* GraphQL */ `
  mutation CreateWings(
    $input: CreateWingsInput!
    $condition: ModelWingsConditionInput
  ) {
    createWings(input: $input, condition: $condition) {
      id
      wing
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateWings = /* GraphQL */ `
  mutation UpdateWings(
    $input: UpdateWingsInput!
    $condition: ModelWingsConditionInput
  ) {
    updateWings(input: $input, condition: $condition) {
      id
      wing
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteWings = /* GraphQL */ `
  mutation DeleteWings(
    $input: DeleteWingsInput!
    $condition: ModelWingsConditionInput
  ) {
    deleteWings(input: $input, condition: $condition) {
      id
      wing
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createUnits = /* GraphQL */ `
  mutation CreateUnits(
    $input: CreateUnitsInput!
    $condition: ModelUnitsConditionInput
  ) {
    createUnits(input: $input, condition: $condition) {
      id
      unit
      wing
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUnits = /* GraphQL */ `
  mutation UpdateUnits(
    $input: UpdateUnitsInput!
    $condition: ModelUnitsConditionInput
  ) {
    updateUnits(input: $input, condition: $condition) {
      id
      unit
      wing
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUnits = /* GraphQL */ `
  mutation DeleteUnits(
    $input: DeleteUnitsInput!
    $condition: ModelUnitsConditionInput
  ) {
    deleteUnits(input: $input, condition: $condition) {
      id
      unit
      wing
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
