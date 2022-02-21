import React from 'react';
import Amplify, { withSSRContext } from 'aws-amplify';
import getNavItems from '../../../api/getNavItems';
import dynamic from 'next/dynamic';
import DefaultLayout from '../../../layouts/dorms/default';
import {
  ImageBanner,
  Content,
  Subtitle,
  AlertBox
} from '../../../components/UI/';
import classes from './briefing.module.css';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

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
