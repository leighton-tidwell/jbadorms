import { useState, useEffect } from 'react';
import classes from './AlertBox.module.css';
import { Icon } from '../';

const AlertBox = ({
  title,
  message,
  type = 'info',
  containerStyle,
  className,
  closable
}) => {
  const [visible, setVisible] = useState(true);
  const backgroundColor =
    type === 'info'
      ? '#083052'
      : type === 'error'
      ? 'rgb(151, 8, 8)'
      : 'rgb(11, 112, 33)';

  useEffect(() => {
    setVisible(true);
  }, [message]);

  return (
    visible && (
      <div
        className={`${classes.container} ${className ? className : ''}`}
        style={{ background: backgroundColor, ...containerStyle }}
      >
        <div className={classes['title-container']}>
          <Icon name="infoOutlined" />
          <div className={classes.title}>{title}</div>
          {closable && (
            <div
              style={{ margin: 0, padding: 0, cursor: 'pointer' }}
              onClick={() => setVisible(!visible)}
            >
              <Icon name="closeOutlined" />
            </div>
          )}
        </div>
        <div className={classes.body}>{message}</div>
      </div>
    )
  );
};

export default AlertBox;
