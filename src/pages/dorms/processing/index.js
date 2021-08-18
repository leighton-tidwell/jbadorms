import React, { useState } from 'react';
import uuid from 'react-uuid';
import Amplify, { graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import AlertBox from '../../../components/UI/AlertBox';
import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import DefaultLayout from '../../../layouts/dorms/default';

import ProcessingNavigation from '../../../components/Dorms/ProcessingNavigation/ProcessingNavigation';
import IncomingAirmenChecklist from '../../../components/Dorms/ProcessingForms/IncomingAirmenChecklist';

import classes from './index.module.css';

const Processing = ({ navLinks, verified }) => {
  const bannerBackgroundImage = '/images/processing_banner.png';
  const [userIsVerified, setUserIsVerified] = useState(verified);
  const [selectedForm, setSelectedForm] = useState(<IncomingAirmenChecklist />);
  const [navOptions, setNavOptions] = useState([
    {
      id: uuid(),
      name: 'Incoming Airmen',
      active: true,
      component: <IncomingAirmenChecklist />
    },
    {
      id: uuid(),
      name: 'Assignment Data',
      active: false,
      component: <div></div>
    },
    {
      id: uuid(),
      name: 'Conditions Checklist',
      active: false,
      component: <div></div>
    },
    {
      id: uuid(),
      name: 'Resident Responsibilities',
      active: false,
      component: <div></div>
    },
    {
      id: uuid(),
      name: 'Mattress Protectors',
      active: false,
      component: <div></div>
    }
  ]);

  const handleNavigationChange = key => {
    setNavOptions(prevNavOptions => {
      const newOptions = prevNavOptions.map(option => {
        if (option.id === key) setSelectedForm(option.component);
        return {
          id: option.id,
          name: option.name,
          active: option.id === key ? true : false,
          component: option.component
        };
      });
      return newOptions;
    });
  };

  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="In-Processing Done Easy"
        heroSubText="Fill out the forms so we know you're coming."
      />
      <Subtitle>Start Inprocessing</Subtitle>
      <Content className={`${classes.flex} ${classes.transparent}`}>
        {verified ? (
          <>
            <ProcessingNavigation
              navigationLinks={navOptions}
              onChangeForm={handleNavigationChange}
            />
            {selectedForm}
          </>
        ) : (
          <AlertBox
            title="We don't know you're coming yet!"
            message="To submit a work order you must first fill in the Assignment Data Form under the Processing link. After we have recieved your form, we will verify your account."
          />
        )}
      </Content>
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const { Auth, API } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    let verified = false;
    const isUserVerified = await API.graphql(
      graphqlOperation(listUsers, {
        filter: { id: { eq: user.username } }
      })
    );
    const userData = isUserVerified.data.listUsers.items[0];
    if (userData.verified) verified = true;
    if (userData.userType)
      return {
        props: {
          authenticated: true,
          username: user.username,
          navLinks: getNavItems(true),
          verified: verified
        }
      };
    return {
      redirect: {
        destination: '/nextsteps',
        permanent: false
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};

export default Processing;
