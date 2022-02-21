import classes from './SplashNavigation.module.css';
import Link from 'next/link';

const links = [
  {
    id: 1,
    title: (
      <>
        Community
        <br />
        Housing
      </>
    )
  },
  {
    id: 2,
    title: (
      <>
        Privatized
        <br />
        Housing
      </>
    )
  },
  {
    id: 3,
    title: (
      <>
        Furnishings
        <br />
        Management
      </>
    )
  },
  {
    id: 4,
    title: (
      <>
        Unaccompanied
        <br />
        Housing
      </>
    ),
    href: '/dorms'
  }
];

const SplashNavigation = () => {
  return (
    <div className={classes['splash-navigation']}>
      <div className={classes.grid}>
        {links.map(link => (
          <Link href={link.href || '/under-construction'} key={link.id}>
            <a className={classes.element}>{link.title}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SplashNavigation;
