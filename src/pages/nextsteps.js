import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { listUsers } from '../graphql/queries';
import { updateUsers } from '../graphql/mutations';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure({ ...config, ssr: true });

import classes from './nextsteps.module.css';

import { Content, Subtitle, Select, Button, Spinner } from '../components/UI/';

const NextStepsPage = ({ userData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const userTypes = [
    {
      label: 'I am looking to in-process a dorm.',
      value: 'dorm'
    },
    {
      label: 'I am a staff member of JBA Dorms.',
      value: 'dormstaff'
    }
  ];

  const baseOptions = [
    {
      label: 'JB Andrews',
      value: 'JB Andrews'
    }
  ];
  const [userType, setUserType] = useState(null);

  const handleChangeUserType = e => {
    setUserType(e.target.value);
  };

  const submitChoiceHandler = () => {
    if (!userType) return;
    setLoading(true);
    API.graphql(
      graphqlOperation(updateUsers, {
        input: {
          id: userData.id,
          userType: userType,
          _version: userData._version
        }
      })
    )
      .then(() => {
        setLoading(false);
        router.push('/dorms/');
      })
      .catch(error => console.log(error));
  };
  return (
    <>
      <Subtitle>Next Steps</Subtitle>
      <Content className={classes.flex}>
        <div className={classes.title}>What installation are you at:</div>
        <Select options={baseOptions} value="JB Andrews" />
        <div className={classes.title} style={{ marginTop: '1em' }}>
          Tell us why you&#39;re here:
        </div>
        <Select
          options={userTypes}
          onSelect={handleChangeUserType}
          value={userType}
          name="userType"
        />
        <Button disabled={loading} onClick={submitChoiceHandler}>
          {loading ? <Spinner /> : 'Confirm Selection'}
        </Button>
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
