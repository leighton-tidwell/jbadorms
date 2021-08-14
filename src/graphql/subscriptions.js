/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNotifications = /* GraphQL */ `
  subscription OnCreateNotifications {
    onCreateNotifications {
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
export const onUpdateNotifications = /* GraphQL */ `
  subscription OnUpdateNotifications {
    onUpdateNotifications {
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
export const onDeleteNotifications = /* GraphQL */ `
  subscription OnDeleteNotifications {
    onDeleteNotifications {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers {
    onCreateUsers {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers {
    onUpdateUsers {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers {
    onDeleteUsers {
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
export const onCreateDormBuildings = /* GraphQL */ `
  subscription OnCreateDormBuildings {
    onCreateDormBuildings {
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
export const onUpdateDormBuildings = /* GraphQL */ `
  subscription OnUpdateDormBuildings {
    onUpdateDormBuildings {
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
export const onDeleteDormBuildings = /* GraphQL */ `
  subscription OnDeleteDormBuildings {
    onDeleteDormBuildings {
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
export const onCreateDormRooms = /* GraphQL */ `
  subscription OnCreateDormRooms {
    onCreateDormRooms {
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
export const onUpdateDormRooms = /* GraphQL */ `
  subscription OnUpdateDormRooms {
    onUpdateDormRooms {
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
export const onDeleteDormRooms = /* GraphQL */ `
  subscription OnDeleteDormRooms {
    onDeleteDormRooms {
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
export const onCreateAssignmentDataForm = /* GraphQL */ `
  subscription OnCreateAssignmentDataForm {
    onCreateAssignmentDataForm {
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
export const onUpdateAssignmentDataForm = /* GraphQL */ `
  subscription OnUpdateAssignmentDataForm {
    onUpdateAssignmentDataForm {
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
export const onDeleteAssignmentDataForm = /* GraphQL */ `
  subscription OnDeleteAssignmentDataForm {
    onDeleteAssignmentDataForm {
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
export const onCreateEvents = /* GraphQL */ `
  subscription OnCreateEvents {
    onCreateEvents {
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
export const onUpdateEvents = /* GraphQL */ `
  subscription OnUpdateEvents {
    onUpdateEvents {
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
export const onDeleteEvents = /* GraphQL */ `
  subscription OnDeleteEvents {
    onDeleteEvents {
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
export const onCreateJBAContacts = /* GraphQL */ `
  subscription OnCreateJBAContacts {
    onCreateJBAContacts {
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
export const onUpdateJBAContacts = /* GraphQL */ `
  subscription OnUpdateJBAContacts {
    onUpdateJBAContacts {
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
export const onDeleteJBAContacts = /* GraphQL */ `
  subscription OnDeleteJBAContacts {
    onDeleteJBAContacts {
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
export const onCreateFAQ = /* GraphQL */ `
  subscription OnCreateFAQ {
    onCreateFAQ {
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
export const onUpdateFAQ = /* GraphQL */ `
  subscription OnUpdateFAQ {
    onUpdateFAQ {
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
export const onDeleteFAQ = /* GraphQL */ `
  subscription OnDeleteFAQ {
    onDeleteFAQ {
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
export const onCreateHoursOfBusiness = /* GraphQL */ `
  subscription OnCreateHoursOfBusiness {
    onCreateHoursOfBusiness {
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
export const onUpdateHoursOfBusiness = /* GraphQL */ `
  subscription OnUpdateHoursOfBusiness {
    onUpdateHoursOfBusiness {
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
export const onDeleteHoursOfBusiness = /* GraphQL */ `
  subscription OnDeleteHoursOfBusiness {
    onDeleteHoursOfBusiness {
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
export const onCreateDormContacts = /* GraphQL */ `
  subscription OnCreateDormContacts {
    onCreateDormContacts {
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
export const onUpdateDormContacts = /* GraphQL */ `
  subscription OnUpdateDormContacts {
    onUpdateDormContacts {
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
export const onDeleteDormContacts = /* GraphQL */ `
  subscription OnDeleteDormContacts {
    onDeleteDormContacts {
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
export const onCreateWings = /* GraphQL */ `
  subscription OnCreateWings {
    onCreateWings {
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
export const onUpdateWings = /* GraphQL */ `
  subscription OnUpdateWings {
    onUpdateWings {
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
export const onDeleteWings = /* GraphQL */ `
  subscription OnDeleteWings {
    onDeleteWings {
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
export const onCreateUnits = /* GraphQL */ `
  subscription OnCreateUnits {
    onCreateUnits {
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
export const onUpdateUnits = /* GraphQL */ `
  subscription OnUpdateUnits {
    onUpdateUnits {
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
export const onDeleteUnits = /* GraphQL */ `
  subscription OnDeleteUnits {
    onDeleteUnits {
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
