import React from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import { createAssignmentDataForm } from '../../../graphql/mutations';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import DefaultLayout from '../../../layouts/dorms/default';
import ImageBanner from '../../../components/UI/ImageBanner';
import Content from '../../../components/UI/Content';
import Subtitle from '../../../components/UI/Subtitle';
import AlertBox from '../../../components/UI/AlertBox';
import DataForm from '../../../components/Dorms/ProcessingForms/DataForm';

const UhAssignmentDataFormPage = ({
  name,
  phone,
  email,
  navLinks,
  verified
}) => {
  const bannerBackgroundImage = '/images/processing_banner.png';

  const addDataFormHandler = async details => {
    try {
      console.log(details);
      const formData = await API.graphql(
        graphqlOperation(createAssignmentDataForm, { input: details })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="In-Processing"
        heroSubText="Fill out the forms so we know you're coming."
      />
      <Subtitle>Assignment Data Form</Subtitle>
      <Content>
        <AlertBox
          title="Notice"
          message="If you have already filled this form out, please wait for dorm staff to verify your account. Do not re-submit the form unless you are asked."
        />
      </Content>
      <Content>
        <DataForm
          onSubmit={addDataFormHandler}
          userName={name}
          userPhone={phone}
          userEmail={email}
        />
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
    return {
      props: {
        authenticated: true,
        name: user.attributes.name,
        phone: user.attributes.phone_number,
        email: user.attributes.email,
        navLinks: getNavItems(true),
        verified: verified
      }
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};

export default UhAssignmentDataFormPage;
