import React from 'react';
import uuid from 'react-uuid';
import Amplify, { withSSRContext } from 'aws-amplify';
import getNavItems from '../../../api/getNavItems';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import DefaultLayout from '../../../layouts/dorms/default';
import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import RoomGallery from '../../../components/Dorms/RoomGallery/RoomGallery';

import classes from './index.module.css';

const RoomsPage = ({ navLinks }) => {
  const bannerBackgroundImage = '/images/rooms_banner.png';
  const buildingOneImages = [
    {
      id: uuid(),
      src: '/images/rooms/building1_1.png',
      alt: 'An image'
    },
    {
      id: uuid(),
      src: '/images/rooms/building1_2.png',
      alt: 'An image'
    },
    {
      id: uuid(),
      src: '/images/rooms/building1_3.png',
      alt: 'An image'
    },
    {
      id: uuid(),
      src: '/images/rooms/building1_4.png',
      alt: 'An image'
    },
    {
      id: uuid(),
      src: '/images/rooms/building1_5.png',
      alt: 'An image'
    },
    {
      id: uuid(),
      src: '/images/rooms/building1_6.png',
      alt: 'An image'
    }
  ];
  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="Dual Airmen dorms with kitchenette"
        heroSubText="See your potential dorm room"
      />
      <Subtitle>Dorm Room Gallery</Subtitle>
      <Content className={classes.grid}>
        Building 1657
        <RoomGallery images={buildingOneImages} />
      </Content>
      <Content className={classes.grid}>
        Building 1658
        <RoomGallery images={buildingOneImages} />
      </Content>
      <Content className={classes.grid}>
        Building 1659
        <RoomGallery images={buildingOneImages} />
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

export default RoomsPage;
