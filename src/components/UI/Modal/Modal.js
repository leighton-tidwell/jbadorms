import classes from './Modal.module.css';
import { Button, Icon } from '..';

const Modal = ({ message, onCancel, title = 'Notice!', show }) => {
  return (
    show && (
      <div className={classes.container}>
        <div className={classes.modal}>
          <div className={classes.title}>
            <span className={classes.title_text}>{title}</span>
            <div
              style={{ margin: 0, padding: 0, cursor: 'pointer' }}
              onClick={onCancel}
            >
              <Icon name="closeOutlined" />
            </div>
          </div>
          <div className={classes.body}>
            <div className={classes.message}>{message}</div>
            <div className={classes.control}>
              <Button onClick={onCancel} className={classes.button}>
                Okay
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
