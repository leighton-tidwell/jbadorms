import React, { useState } from 'react';
import Amplify, { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listUsers } from '../../../graphql/queries';
import { updateUsers } from '../../../graphql/mutations';
import getNavItems from '../../../api/getNavItems';
import DefaultLayout from '../../../layouts/dorms/default';
import {
  ImageBanner,
  Content,
  Subtitle,
  AlertBox,
  Input,
  Button,
  ErrorText,
  SuccessText,
  Spinner
} from '../../../components/UI/';
import classes from './mandatory-use-of-mattress-protectors.module.css';
import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const MandatoryMattressPage = ({
  verified,
  navLinks,
  name,
  id,
  userVersion,
  mattressagreement
}) => {
  const bannerBackgroundImage = '/images/processing_banner.png';

  const [enteredName, setEnteredName] = useState(name);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (!enteredName) return setError('You must enter your name.');

    try {
      setLoading(true);
      await API.graphql(
        graphqlOperation(updateUsers, {
          input: {
            id: id,
            mattressagreement: true,
            _version: userVersion
          }
        })
      );
      setError(null);
      setSuccess('Successfully signed form.');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('An error has occured.');
    }
  };

  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="In-Processing"
        heroSubText="Fill out the forms so we know you're coming."
      />
      <Subtitle>Mandatory Use of Mattress Protectors</Subtitle>
      <Content>
        <AlertBox
          title="Notice"
          message="These guidelines are excerpts from an official memorandum to dormitory residents. By agreeing to these terms you agree that if you fail to use a mattress protector you will be charged $200.00 to replace the mattress."
        />
      </Content>
      <Content className={classes.flex}>
        {verified ? (
          <>
            <span className={classes.title}>
              MEMORANDUM FOR DORMITORY RESIDENTS
            </span>
            <span className={classes.title}>FROM: 316 CES/CEIHD</span>
            <span className={classes.title}>
              SUBJECT: Mandatory Use Of Mattress Protectors
            </span>
            <ol className={classes.list}>
              <li className={classes['list-item']}>
                Bed bugs and other virulent pathogens make their homes in
                mattress fabric. Each resident where this is the first duty
                station is provided a set of linen and a mattress protector upon
                arrival. For your health and safety, you are required to have a
                mattress protector on your mattress. If the existing mattress
                cover is torn or dirty, a replacement will be provided by the UH
                Office.
              </li>
              <li className={classes['list-item']}>
                The cost of a new mattress is $200.00. Protect yourself and
                future residents; use the mattress protector. If the mattress
                protector is not used, the mattress will be replaced at your
                expense prior to final out processing.
              </li>
              <li className={classes['list-item']}>
                Should you have questions and/or concerns, please contact the UH
                Superintendent, MSgt Gregory Merski 301-981-4479.
              </li>
            </ol>
            <span className={classes.agreement}>
              I understand that if I do not use the mattress protector, I will
              be charged $200.00 to replace the mattress.
            </span>
            {!mattressagreement && (
              <form className={classes.form} onSubmit={handleFormSubmit}>
                <div className={classes['form-control']}>
                  <label className={classes.label}>Name:</label>
                  <Input
                    className={classes.input}
                    value={enteredName}
                    disabled
                    type="text"
                  />
                </div>
                {error && (
                  <AlertBox
                    type="error"
                    title="Error!"
                    message={error}
                    closable
                  />
                )}
                {success && (
                  <AlertBox
                    type="success"
                    title="Success!"
                    message={success}
                    closable
                  />
                )}
                {!success && (
                  <Button disabled={loading} className={classes.button}>
                    {loading ? <Spinner /> : 'Sign'}
                  </Button>
                )}
              </form>
            )}
            {mattressagreement && (
              <SuccessText>
                You&apos;ve already filled this form out!
              </SuccessText>
            )}
          </>
        ) : (
          <AlertBox
            title="We don't know you're coming yet!"
            message="To submit a work order you must first fill in the Assignment Data Form under the Processing link. After we have recieved your form, we will verify your account."
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
          verified: verified,
          mattressagreement: userData.mattressagreement || false
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

export default MandatoryMattressPage;
