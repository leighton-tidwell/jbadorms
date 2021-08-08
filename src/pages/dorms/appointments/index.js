import React, { useEffect } from 'react';
import { useAuth } from '../../../context/AuthUserProvider';
import { useRouter } from 'next/router';

import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import AppointmentScheduler from '../../../components/Dorms/Appointments/AppointmentScheduler';
import DefaultLayout from '../../../layouts/dorms/default';

const Appointments = props => {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const bannerBackgroundImage = '/images/appointment_banner.png';

  useEffect(() => {
    if (!loading && !authUser) router.push('/dorms');
  }, [loading, authUser, router]);

  return (
    <DefaultLayout>
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

export default Appointments;
