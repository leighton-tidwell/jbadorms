import Amplify, { withSSRContext } from 'aws-amplify';
import getNavItems from '../../api/getNavItems';
import DefaultLayout from '../../layouts/dorms/default';
import { Carousel } from '../../components/UI/';
import {
  QuickLinks,
  Contact,
  MapSection,
  ContentBanner,
  AdditionalInformation
} from '../../components/Dorms/';
import config from '../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const HomePage = ({ navLinks }) => {
  return (
    <DefaultLayout navLinks={navLinks}>
      <Carousel />
      <QuickLinks />
      <Contact />
      <MapSection />
      <ContentBanner />
      <AdditionalInformation />
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

export default HomePage;
