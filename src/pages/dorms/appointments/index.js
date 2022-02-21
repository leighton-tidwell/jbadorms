import React, { useState } from 'react';
import Amplify, { graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import getNavItems from '../../../api/getNavItems';
import DefaultLayout from '../../../layouts/dorms/default';
import {
  ImageBanner,
  Subtitle,
  Content,
  AlertBox
} from '../../../components/UI/';
import { AppointmentScheduler } from '../../../components/Dorms/';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const Appointments = ({ navLinks, verified, name, phone, email }) => {
  const bannerBackgroundImage = '/images/appointment_banner.png';

  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="Make an Appointment"
        heroSubText="Get the help you need, soon."
      />
      <Subtitle>Talk to an ADL</Subtitle>
      <Content>
        {verified ? (
          <AppointmentScheduler name={name} phone={phone} email={email} />
        ) : (
          <AlertBox
            title="We don't know you're coming yet!"
            message="To make an appointment you must first fill in the Assignment Data Form under the Processing link. After we have recieved your form, we will verify your account. After verification, you will be able to make an appointment."
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
          email: userData.email,
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

export default Appointments;
