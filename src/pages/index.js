import classes from './index.module.css';
import { HeroLogo, SplashNavigation } from '../components/SplashPage/';

const Splashpage = () => {
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <HeroLogo />
        <SplashNavigation />
      </div>
    </div>
  );
};

export default Splashpage;
