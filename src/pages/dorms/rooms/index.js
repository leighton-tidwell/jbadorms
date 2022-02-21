import React from 'react';
import uuid from 'react-uuid';
import Amplify, { withSSRContext } from 'aws-amplify';
import getNavItems from '../../../api/getNavItems';
import DefaultLayout from '../../../layouts/dorms/default';
import { ImageBanner, Subtitle, Content } from '../../../components/UI/';
import { RoomGallery } from '../../../components/Dorms/';
import classes from './index.module.css';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

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
        <div className={classes.building}>Building 1657</div>
        <RoomGallery images={buildingOneImages} />
      </Content>
      <Content className={classes.grid}>
        <div className={classes.building}>Building 1658</div>
        <RoomGallery images={buildingOneImages} />
      </Content>
      <Content className={classes.grid}>
        <div className={classes.building}>Building 1659</div>
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
