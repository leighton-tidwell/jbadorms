import React from 'react';
import Amplify, { withSSRContext } from 'aws-amplify';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
Amplify.configure({ ...config, ssr: true });

import DefaultLayout from '../../../layouts/dorms/default';
import ImageBanner from '../../../components/UI/ImageBanner';
import Content from '../../../components/UI/Content';
import Subtitle from '../../../components/UI/Subtitle';
import AlertBox from '../../../components/UI/AlertBox';

import classes from './daily-checklist.module.css';

const DailyChecklistPage = ({ navLinks }) => {
  const bannerBackgroundImage = '/images/processing_banner.png';
  const doc = [{ uri: 'https://dev.jbamho.com/files/bay-o-checklist.docx' }];

  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="In-Processing"
        heroSubText="Fill out the forms so we know you're coming."
      />
      <Subtitle>Bay Orderly Checklist</Subtitle>
      <Content>
        <AlertBox
          title="Notice"
          message="Download this form, fill it out and return it to the Dorm Office for processing."
        />
      </Content>
      <Content className={classes.flex}>
        <DocViewer
          className={classes.reactDocViewer}
          pluginRenderers={DocViewerRenderers}
          documents={doc}
        />
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
      props: {
        authenticated: false,
        navLinks: getNavItems(false)
      }
    };
  }
};

export default DailyChecklistPage;
