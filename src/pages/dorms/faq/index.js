import React from 'react';
import uuid from 'react-uuid';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import getNavItems from '../../../api/getNavItems';
import { listEvents, listFAQS } from '../../../graphql/queries';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

import DefaultLayout from '../../../layouts/dorms/default';
import ImageBanner from '../../../components/UI/ImageBanner';
import Subtitle from '../../../components/UI/Subtitle';
import Content from '../../../components/UI/Content';
import FaqElement from '../../../components/Dorms/FAQ/FaqElement';

import classes from './index.module.css';

const FaqPage = ({ navLinks, faqList }) => {
  const bannerBackgroundImage = '/images/faq_banner.png';
  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="Frequently Asked Questions"
        heroSubText="Have a question? We have an answer."
      />
      <Subtitle>FAQ</Subtitle>
      <Content className={classes.flex}>
        {faqList.map(faq => (
          <FaqElement
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </Content>
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const { Auth } = withSSRContext(context);

  const getFaqs = async () => {
    const getFaqsList = await API.graphql({
      query: listFAQS,
      authMode: 'API_KEY'
    });
    const faqList = getFaqsList.data.listFAQS.items.map(faq => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer
    }));

    return faqList;
  };
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        authenticated: true,
        username: user.username,
        navLinks: getNavItems(true),
        faqList: await getFaqs()
      }
    };
  } catch (error) {
    return {
      props: {
        authenticated: false,
        navLinks: getNavItems(false),
        faqList: await getFaqs()
      }
    };
  }
};

export default FaqPage;
