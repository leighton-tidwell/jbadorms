import classes from './Content.module.css';
import { ContentWrapper } from '../';

const Content = props => {
  return (
    <ContentWrapper>
      <div
        className={`${classes.container} ${
          props.className ? props.className : ''
        }`}
        style={{
          padding: `${props.padding === true ? '1em' : ''}`,
          ...props.style
        }}
      >
        {props.children}
      </div>
    </ContentWrapper>
  );
};

export default Content;
