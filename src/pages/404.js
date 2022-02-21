import { Subtitle, Content } from '../components/UI/';
import Link from 'next/link';
import classes from './404.module.css';

const Error404 = () => {
  return (
    <>
      <Subtitle>This page was not found.&nbsp;</Subtitle>
      <Content className={classes.flex}>
        <div className={classes.redirect}>
          <Link href="/">
            <a className={classes.inline} style={{ marginTop: '1em' }}>
              Click here to go home!
            </a>
          </Link>
        </div>
      </Content>
    </>
  );
};

export default Error404;
