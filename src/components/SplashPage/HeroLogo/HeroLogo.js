import classes from './HeroLogo.module.css';

const HeroLogo = () => {
  return (
    <div className={classes['hero-logo']}>
      <h1>Joint Base Andrews</h1>
      <h3>Military Housing Office</h3>
    </div>
  );
};

export default HeroLogo;
