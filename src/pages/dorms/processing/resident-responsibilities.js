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
  SuccessText,
  Spinner
} from '../../../components/UI/';
import { ResidentResponsibilitiesText } from '../../../components/Dorms/';
import classes from './resident-responsibilities.module.css';

import config from '../../../aws-exports';
Amplify.configure({ ...config, ssr: true });

const ResidentResponsibilitiesPage = ({
  verified,
  navLinks,
  name,
  id,
  userVersion,
  residentresponsibilities
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
            residentresponsibilities: true,
            _version: userVersion
          }
        })
      );
      setError(null);
      setLoading(false);
      setSuccess('Successfully signed form.');
    } catch (error) {
      console.log(error);
      return setError('An error has occured, please try again later.');
    }
  };

  return (
    <DefaultLayout navLinks={navLinks}>
      <ImageBanner
        backgroundImage={bannerBackgroundImage}
        heroText="In-Processing"
        heroSubText="Fill out the forms so we know you're coming."
      />
      <Subtitle>Resident Responsibilities</Subtitle>
      <Content>
        <AlertBox
          title="Notice"
          message="These responsibilities serve as excerpts from our Unaccompanied Housing (UH) Guide for residents. Expanded information and expectations regarding our campus is located in the JBA Dorm Guide (located on the home page)."
        />
      </Content>
      <Content className={classes.flex}>
        {verified ? (
          <>
            <ResidentResponsibilitiesText title="Social Visits">
              Cohabiting/Overnight/Long Term guests or visitors{' '}
              <u>are not authorized.</u> All guests must be at least 18 years
              old, escorted at all times and are prohibitied between hours
              2400-0600 hours. Dependents and minors are not permitted in the
              dormitories unless accompanied by their parent/sponsor. Remember,
              you are responsible for the conduct of your guests and can be held
              responsible for their actions and behavior.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Laundry Facility/Individual">
              Authorized for UH residents use ONLY. Notify the UH Office of
              equipment that does not work properly and submit through the work
              orders page or dorm app -- make sure you provide the dorm number
              and machine number (if applicable). Security of your clothing
              while utilizing the laundry is your responsibility. Left clothing
              will be disposed when items have been there longer than two days.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Leave or Extended TDY to include Deployments">
              If you leave your room unoccupied for extended periods (over three
              days or longer for leave), you must notify the UH office. For
              deployments, you must notify the UH office 30 days prior to
              departure to ensure they inspect your quarters weekly. Failure to
              do so may result in your liability of damage and repairs to your
              quarters and/or adjoining room. Note: Do not turn off your HVAC
              systems during your absence.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Damages">
              Document all discrepencies and submit to the UH Office immediately
              (via Work Orders page, Dorm App or Call). Damages found upon
              checkout will be the responsibility of the occupant. Utilize your
              Conditions Checklist upon check-in for additional documentation if
              issues present prior to recieving the room.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Resuse Disposal and Recycling">
              Place your room trash and garbage in the provided dumpsters
              located outside of your respective building. NOT outside of your
              room door. DO NOT PLACE GARBAGE ON THE GROUND AREA OUTSIDE OF THE
              DUMPSTER. Recycling is mandatory on JB Andrews. Do not dispose of
              unwanted personal bulky items, electronics, etc. in the regular
              dumpster but contact the Base Recycling Center.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Quiet Hours/Noise Control">
              Due to the variety of shift workers residing within the campus
              dormitories, quiet hours are 24 hours a day and will be followed.
              Excessive noise, from any source, such as stereos, musical
              instruments, televisions, guests, etc. that can be heard beyond
              the limits of the occupant&apos;s room at any time is strictly
              prohibited. This policy extends to parking lots, outside
              pavillions, designated smoking areas, and dayrooms/lounges.
              Shift-Worker signs are available for use from the UH Office and
              will be placed in your window for visibility.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Security">
              Always ensure your room is locked and windows secured when you
              leave your room. DO NOT hide your key anywhere outside your room.
              DO NOT tamper with window screens or windows to gain access to
              rooms. Each dorm is equipped with 24/7 video camera surveillance
              for the safety and security of residents. If you suspect that a
              crime has been committed, notify law enforcement immediately. Call
              Security Forces for vandalism, theft, and damage or unlawful entry
              to the Air Force property, at (301)981-2001.
            </ResidentResponsibilitiesText>
            <span className={classes.subtitle}>CLEANING STANDARDS</span>
            <ResidentResponsibilitiesText title="General">
              All surfaces must be clean. This includes removal of dirt, debris,
              mold, mildew, stains, soap scum, sticky residue and dust. Floor
              surfaces must be free of heel marks, swept, mopped, vacuumed and
              shampooed. Glass areas must be free of streaks. Furniture
              including drawers/cabinets must be cleaned and polished.
              Upholstered furniture must be clean and stain-free. Appliances
              must be free of food particles, grease and mold to include the
              interior, exterior, top and bottom.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Windows">
              Occupants are responsible for cleaning the inside and outside of
              windows, tracks and windowsills. Report damaged or missing screens
              via the Work Orders page, Dorm App, or to the UH office. For
              security reasons, lock windows when you leave the room.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Kitchen">
              Give special attention to maintaning appliances and cabinets;
              clean ovens, top burners, and broiler units regularly to prevent
              grease buildup, which can quickly become a fire hazard. Do not use
              oven cleaner on self-cleaning ovens. Clean refrigerator interiors
              frequently to remove food deposits. Do not use sharp instruments
              to remove ice when defrosting and do not use gritty or harsh
              detergents when cleaning. Do not pour grease down any drains or
              toilets as it can solidify in the pipes and cause stoppages. Be
              careful to keep hot pots, pans and utensils off countertops to
              avoid permanent damage. We reccomend non-adhesive shelf paper for
              inside drawers and cabinets to avoid damaging surfaces on removal.
              Clean walls periodically to prevent grease buildup.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Bathroom">
              Because of the potential for bacteria growth, bathroom areas
              require special care. Clean the toilet inside and out with a
              disinfectant type cleaner weekly. Clean shower/tub (doors
              included), sink, vanity, countertop, medicine cabinet, mirrior and
              toothrbush holder. Do not leave soap scum or other residue on
              walls. Mold in the bathroom tends to accumlate quickly. Clean mold
              areas frequently. Cleaning advice and suggested cleaning items are
              available from the UH Office.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Floors">
              Clean tile and baseboard surfaces weekly to prevent build-up of
              soil. Remove streaks and stains immediately to prevent staining.
              Vacuum carpet at least once a week and shampoo at least monthly or
              as needed. Vacuum cleaners and carpet shampooers are available for
              loan from the UH Office.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Walls/Ceiling">
              Walls and ceilings must be free of marks and cobwebs. Use mild
              soap and warm water for cleaning walls. Clean light fixtures,
              ceiling fan (including bulb covers/blades), doors and HVAC vents.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Mold">
              Due to the local climate, Mold is not uncommon (particularly worse
              during the summer months). Our Mold policy and mold information is
              located under &quot;Documents&quot; under &quot;Mold&quot; on the
              JBA Dorm App. YOU MUST review the policy and ensure compliance.
            </ResidentResponsibilitiesText>
            <span className={classes.subtitle}>TERMINATING RESIDENCY</span>
            <ResidentResponsibilitiesText title="Terminating Residency">
              In order to terminate residency one of the following is required:
              <ul>
                <li>PCS or End of Active Service</li>
                <li>
                  E-4 with 3 Years of Service (unless 6 months Time On Station
                  remains)
                </li>
                <li>
                  Become eligible to recieve BAH with or without dependent rate
                </li>
                <ul>
                  <li>
                    <b>
                      Marriage:&nbsp;can move out 60 days prior to mariage date
                      with First Sergeant Approval including Memo to UH Office,
                      and must provide Mariage Certificate to UH Office upon
                      marriage.
                    </b>
                  </li>
                  <li>
                    <b>BAH Waitlist:&nbsp;</b>UH Office mantains waitlist based
                    on seniority (rank/TIS) and implements when occupancy
                    percentage is over 95% (Sq/CC or First Sergeant must approve
                    once initiated)
                  </li>
                  <li>
                    <b>Hardship:&nsbp;</b>considered to be unique and unusual
                    circumstances that imposes an extraordinary burden on the
                    member not normally encountered by other members of similar
                    grade at that installation (initiated and routed via First
                    Sergeant to UH Office)
                  </li>
                  <li>
                    <b>316/WG CC Exception to Policy:&nbsp;</b>designed for
                    residents who fall with the guidelines of the policy (policy
                    available via UH Office upon request); the ETP must be
                    drafted, approved, and routed through your First Sergeant to
                    the UH Office.
                  </li>
                </ul>
              </ul>
              A 30-day notice of termination is required (excluding short notice
              Seperation or PCS) and given to residents who meet above criteria.
              Do not wait for orders, as soon as you know about your change in
              status, contact the UH Office.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Pre-Termination Inspection">
              Preliminary inspection will be accomplished 30-45 days prior to
              termination in order to assess your room/shared space (furnishings
              included) for potential damages and provides the cleaning
              requirements. It includes reviewing checkout procedures and
              provides us an opportunity to answer your questions. During the
              inspection, the UH Dorm Leader will compare your filed Room
              Condition Checklist with the current room condition. Identifies
              routine maintenance requirements and reviews damages beyond normal
              wear and tear. The Dorm Leader will also confirm all furnishings
              are present and compare the condition to that identified upon
              check-in.
            </ResidentResponsibilitiesText>
            <ResidentResponsibilitiesText title="Final Inspection/Check-Out">
              This is the final inspection to make sure you have met the
              cleaning standards and to identify maintenance requirements not
              noted at your pre-termination inspection (furnishings location and
              condition will be checked). All personal belongings must be out of
              the room and storage cage area. If you fail your final inspection
              you must correct the discrepancies and schedule a re-inspection.
              Once final inspection is approved; you will be given a Termination
              Letter from the UH Office (if applicable to your situation). This
              letter will be taken to Base Finance by you and is what starts the
              BAH process. You will not recieve this letter prior to your final
              out.
            </ResidentResponsibilitiesText>
            <span className={classes.subtitle}>
              Submitting your name in the form below constitutes reciept and
              acceptance of all resident responsibilties as conditions of
              occupancy.
            </span>
            {!residentresponsibilities && (
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
            {residentresponsibilities && (
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
          residentresponsibilities: userData.residentresponsibilities || false
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

export default ResidentResponsibilitiesPage;
