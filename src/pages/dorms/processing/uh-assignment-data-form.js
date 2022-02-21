import React from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers, listWings, listUnits } from '../../../graphql/queries';
import { createAssignmentDataForm } from '../../../graphql/mutations';
import getNavItems from '../../../api/getNavItems';
import DefaultLayout from '../../../layouts/dorms/default';
import {
  ImageBanner,
  Content,
  Subtitle,
  AlertBox
} from '../../../components/UI/';
import { DataForm } from '../../../components/Dorms/';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const UhAssignmentDataFormPage = ({
  name,
  phone,
  email,
  navLinks,
  wings,
  units
}) => {
  const bannerBackgroundImage = '/images/processing_banner.png';

  const addDataFormHandler = details =>
    new Promise((resolve, reject) => {
      API.graphql(
        graphqlOperation(createAssignmentDataForm, { input: details })
      )
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });

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
          containerStyle={{ width: '100%' }}
        />
      </Content>
      <Content style={{ maxWidth: '100%' }}>
        <DataForm
          onSubmit={addDataFormHandler}
          userName={name}
          userPhone={phone}
          userEmail={email}
          wings={wings}
          units={units}
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
    const getWingData = await API.graphql(graphqlOperation(listWings));
    const wingData = getWingData.data.listWings.items;
    const getUnitData = await API.graphql(graphqlOperation(listUnits));
    const unitData = getUnitData.data.listUnits.items;

    const userData = isUserVerified.data.listUsers.items[0];
    if (userData.verified) verified = true;
    if (userData.userType)
      return {
        props: {
          authenticated: true,
          name: user.attributes.name,
          phone: user.attributes.phone_number,
          email: user.attributes.email,
          navLinks: getNavItems(true),
          verified: verified,
          wings: wingData,
          units: unitData
        }
      };
    return {
      redirect: {
        destination: '/nextsteps',
        permanent: false
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
