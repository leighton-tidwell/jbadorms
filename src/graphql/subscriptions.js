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
