import React, { useState } from 'react';
import Amplify, { graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import AppointmentScheduler from '../../../components/Dorms/Appointments/AppointmentScheduler';
import DefaultLayout from '../../../layouts/dorms/default';
import AlertBox from '../../../components/UI/AlertBox';

const Appointments = ({ navLinks, verified, name, phone, email }) => {
  const [userIsVerified, setUserIsVerified] = useState(verified);
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
            message="To make an appointment you must first download this form and send it to blahblah@us.af.mil. After we have recieved your completed form, we will verify your account and you will be allowed to make an appointment."
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
