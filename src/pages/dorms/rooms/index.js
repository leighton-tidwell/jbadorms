import React from 'react';
import uuid from 'react-uuid';

import DefaultLayout from '../../../layouts/dorms/default';
import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import RoomGallery from '../../../components/Dorms/RoomGallery/RoomGallery';

import classes from './index.module.css';

const RoomsPage = () => {
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
    <DefaultLayout>
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

export default RoomsPage;
