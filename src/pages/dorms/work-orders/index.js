import React, { useState } from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import { createWorkOrders } from '../../../graphql/mutations';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import AlertBox from '../../../components/UI/AlertBox';
import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import DefaultLayout from '../../../layouts/dorms/default';

import WorkOrderForm from '../../../components/Dorms/WorkOrderForms/WorkOrderForm';

import classes from './index.module.css';

const WorkOrdersPage = ({
  navLinks,
  verified,
  name,
  phone,
  room,
  building
}) => {
  const bannerBackgroundImage = '/images/carousel_two.png';
  const [userIsVerified, setUserIsVerified] = useState(verified);

  const handleNewWorkOrder = async newWorkOrder => {
    try {
      const createWorkOrder = await API.graphql(
        graphqlOperation(createWorkOrders, { input: newWorkOrder })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="Something wrong with your dorm?"
        heroSubText="Fill out a work order so we can fix it."
      />
      <Subtitle>Work Order Form</Subtitle>
      <Content>
        {verified ? (
          <WorkOrderForm
            fetchedBuilding={building}
            fetchedName={name}
            fetchedRoom={room}
            fetchedPhone={phone}
            onSubmit={handleNewWorkOrder}
          />
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
          name: userData.name,
          room: userData.dormroom,
          building: userData.dormbuilding,
          phone: userData.phone,
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

export default WorkOrdersPage;
