import React, { useState } from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import { createWorkOrders } from '../../../graphql/mutations';
import getNavItems from '../../../api/getNavItems';
import DefaultLayout from '../../../layouts/dorms/default';
import {
  AlertBox,
  ImageBanner,
  Subtitle,
  Content
} from '../../../components/UI/';
import { WorkOrderForm } from '../../../components/Dorms/';

import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const WorkOrdersPage = ({
  navLinks,
  verified,
  name,
  phone,
  room,
  building
}) => {
  const bannerBackgroundImage = '/images/carousel_two.png';
  const [loading, setLoading] = useState(false);

  const handleNewWorkOrder = async newWorkOrder =>
    new Promise((resolve, reject) => {
      setLoading(true);
      API.graphql(graphqlOperation(createWorkOrders, { input: newWorkOrder }))
        .then(() => {
          setLoading(false);
          resolve(true);
        })
        .catch(error => {
          setLoading(false);
          reject(false);
          console.log(error);
        });
    });

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
            loading={loading}
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
