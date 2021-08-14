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
export const getAssignmentDataForm = /* GraphQL */ `
  query GetAssignmentDataForm($id: ID!) {
    getAssignmentDataForm(id: $id) {
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
export const listAssignmentDataForms = /* GraphQL */ `
  query ListAssignmentDataForms(
    $filter: ModelAssignmentDataFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssignmentDataForms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAssignmentDataForms = /* GraphQL */ `
  query SyncAssignmentDataForms(
    $filter: ModelAssignmentDataFormFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAssignmentDataForms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getEvents = /* GraphQL */ `
  query GetEvents($id: ID!) {
    getEvents(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getJBAContacts = /* GraphQL */ `
  query GetJBAContacts($id: ID!) {
    getJBAContacts(id: $id) {
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
export const listJBAContacts = /* GraphQL */ `
  query ListJBAContacts(
    $filter: ModelJBAContactsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJBAContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        phone
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
export const syncJBAContacts = /* GraphQL */ `
  query SyncJBAContacts(
    $filter: ModelJBAContactsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncJBAContacts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        phone
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
export const getFAQ = /* GraphQL */ `
  query GetFAQ($id: ID!) {
    getFAQ(id: $id) {
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
export const listFAQS = /* GraphQL */ `
  query ListFAQS(
    $filter: ModelFAQFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFAQS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        answer
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
export const syncFAQS = /* GraphQL */ `
  query SyncFAQS(
    $filter: ModelFAQFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFAQS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        question
        answer
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
export const getHoursOfBusiness = /* GraphQL */ `
  query GetHoursOfBusiness($id: ID!) {
    getHoursOfBusiness(id: $id) {
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
export const listHoursOfBusinesses = /* GraphQL */ `
  query ListHoursOfBusinesses(
    $filter: ModelHoursOfBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHoursOfBusinesses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        dayOfWeek
        hours
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
export const syncHoursOfBusinesses = /* GraphQL */ `
  query SyncHoursOfBusinesses(
    $filter: ModelHoursOfBusinessFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHoursOfBusinesses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        dayOfWeek
        hours
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
export const getDormContacts = /* GraphQL */ `
  query GetDormContacts($id: ID!) {
    getDormContacts(id: $id) {
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
export const listDormContacts = /* GraphQL */ `
  query ListDormContacts(
    $filter: ModelDormContactsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDormContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
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
export const syncDormContacts = /* GraphQL */ `
  query SyncDormContacts(
    $filter: ModelDormContactsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDormContacts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        phone
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
export const getWings = /* GraphQL */ `
  query GetWings($id: ID!) {
    getWings(id: $id) {
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
export const listWings = /* GraphQL */ `
  query ListWings(
    $filter: ModelWingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        wing
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
export const syncWings = /* GraphQL */ `
  query SyncWings(
    $filter: ModelWingsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        wing
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
export const getUnits = /* GraphQL */ `
  query GetUnits($id: ID!) {
    getUnits(id: $id) {
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
export const listUnits = /* GraphQL */ `
  query ListUnits(
    $filter: ModelUnitsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        unit
        wing
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
export const syncUnits = /* GraphQL */ `
  query SyncUnits(
    $filter: ModelUnitsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUnits(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        unit
        wing
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
