import React from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import getNavItems from '../../../api/getNavItems';
import dynamic from 'next/dynamic';
import DefaultLayout from '../../../layouts/dorms/default';
import {
  ImageBanner,
  Content,
  Subtitle,
  AlertBox
} from '../../../components/UI/';
import classes from './uh-conditions-checklist.module.css';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const ConditionsChecklistPage = ({ navLinks }) => {
  const bannerBackgroundImage = '/images/processing_banner.png';
  const doc = [{ uri: 'https://jbamho.com/files/conditions-checklist.docx' }];

  const CustomDocViewer = dynamic(
    () => import('../../../components/Dorms/DocumentViewer/DocViewer'),
    { ssr: false }
  );

  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="In-Processing"
        heroSubText="Fill out the forms so we know you're coming."
      />
      <Subtitle>Conditions Checklist</Subtitle>
      <Content>
        <AlertBox
          title="Notice"
          message="Download this form, fill it out and return it to the Dorm Office for processing."
          containerStyle={{ width: '100%' }}
        />
      </Content>
      <Content className={classes.flex}>
        <CustomDocViewer doc={doc} />
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
          id: userData.id,
          name: user.attributes.name,
          userVersion: userData._version,
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
    console.log(error);
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};

export default ConditionsChecklistPage;
