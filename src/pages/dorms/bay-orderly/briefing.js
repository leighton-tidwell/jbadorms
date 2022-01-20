import React from 'react';
import Amplify, { withSSRContext } from 'aws-amplify';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
import dynamic from 'next/dynamic';
Amplify.configure({ ...config, ssr: true });

import DefaultLayout from '../../../layouts/dorms/default';
import ImageBanner from '../../../components/UI/ImageBanner';
import Content from '../../../components/UI/Content';
import Subtitle from '../../../components/UI/Subtitle';
import AlertBox from '../../../components/UI/AlertBox';

import classes from './briefing.module.css';

const BriefingPage = ({ navLinks }) => {
  const bannerBackgroundImage = '/images/processing_banner.png';
  const doc = [{ uri: 'https://jbamho.com/files/bay-o-briefing.docx' }];

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
      <Subtitle>Bay Orderly Briefing</Subtitle>
      <Content>
        <AlertBox
          title="Notice"
          message="This is the official Bay Orderly Briefing, after reading this use the Bay Orderly Checklist to complete your tasks."
        />
      </Content>
      <Content className={classes.flex}>
        <CustomDocViewer doc={doc} />
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

export default BriefingPage;
