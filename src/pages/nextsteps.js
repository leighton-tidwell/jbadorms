import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { listUsers } from '../graphql/queries';
import { updateUsers } from '../graphql/mutations';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure({ ...config, ssr: true });

import classes from './nextsteps.module.css';

import Content from '../components/UI/Content';
import Subtitle from '../components/UI/Subtitle';
import Select from '../components/UI/Select';
import Button from '../components/UI/Button';

const NextStepsPage = ({ userData }) => {
  const router = useRouter();
  const userTypes = [
    {
      id: 1,
      value: 'I am looking to in-process a dorm.',
      type: 'dorm'
    },
    {
      id: 2,
      value: 'I am a staff member of JBA Dorms.',
      type: 'dormstaff'
    },
    {
      id: 3,
      value: 'I am a staff member of JBA MHO.',
      type: 'mhostaff'
    }
  ];
  const [userType, setUserType] = useState(userTypes[0].type);

  const typeChangeHandler = option => {
    const userTypeSearch = userTypes.find(type => type.value === option);
    setUserType(userTypeSearch.type);
  };

  const submitChoiceHandler = async () => {
    if (!userType) return;
    const updateUserType = await API.graphql(
      graphqlOperation(updateUsers, {
        input: {
          id: userData.id,
          userType: userType,
          _version: userData._version
        }
      })
    );
    router.push('/dorms/');
  };
  return (
    <>
      <Subtitle>Next Steps</Subtitle>
      <Content className={classes.flex}>
        <div className={classes.title}>Tell us why you&#39;re here:</div>
        <Select options={userTypes} onSelect={typeChangeHandler} />
        <Button onClick={submitChoiceHandler}>Confirm Selection</Button>
      </Content>
    </>
  );
};

export const getServerSideProps = async context => {
  const { Auth, API } = withSSRContext(context);
  let props = {};

  // Get Auth
  try {
    const user = await Auth.currentAuthenticatedUser();
    props.id = user.attributes.sub;
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const userData = await API.graphql(
    graphqlOperation(listUsers, {
      filter: { id: { eq: props.id } }
    })
  );

  const selectedUserData = userData.data.listUsers.items[0] || null;
  props.userData = selectedUserData;
  if (selectedUserData.userType)
    return {
      redirect: {
        destination: '/dorms',
        permanent: false
      }
    };

  return { props: props };
};

export default NextStepsPage;
