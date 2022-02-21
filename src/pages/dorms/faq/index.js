import React from 'react';
import Amplify, { API, withSSRContext } from 'aws-amplify';
import getNavItems from '../../../api/getNavItems';
import { listFAQS } from '../../../graphql/queries';
import DefaultLayout from '../../../layouts/dorms/default';
import { ImageBanner, Subtitle, Content } from '../../../components/UI/';
import { FaqElement } from '../../../components/Dorms/';
import classes from './index.module.css';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

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
    const faqList = getFaqsList.data.listFAQS.items
      .filter(b => !b._deleted)
      .map(faq => ({
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
