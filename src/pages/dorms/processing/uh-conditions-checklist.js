import React from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
Amplify.configure({ ...config, ssr: true });

import DefaultLayout from '../../../layouts/dorms/default';
import ImageBanner from '../../../components/UI/ImageBanner';
import Content from '../../../components/UI/Content';
import Subtitle from '../../../components/UI/Subtitle';
import AlertBox from '../../../components/UI/AlertBox';

import classes from './uh-conditions-checklist.module.css';

const ConditionsChecklistPage = ({ navLinks }) => {
  const bannerBackgroundImage = '/images/processing_banner.png';
  const doc = [
    { uri: 'https://dev.jbamho.com/files/conditions-checklist.docx' }
  ];

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
        />
      </Content>
      <Content className={classes.flex}>
        {typeof window !== 'undefined' && (
          <DocViewer
            className={classes.reactDocViewer}
            pluginRenderers={DocViewerRenderers}
            documents={doc}
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
