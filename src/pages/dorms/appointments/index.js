import React from 'react';
import Amplify, { withSSRContext } from 'aws-amplify';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import AppointmentScheduler from '../../../components/Dorms/Appointments/AppointmentScheduler';
import DefaultLayout from '../../../layouts/dorms/default';

const Appointments = ({ navLinks }) => {
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
        <AppointmentScheduler />
      </Content>
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        authenticated: true,
        username: user.username,
        navLinks: getNavItems(true)
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
