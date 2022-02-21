import { useState, useEffect } from 'react';
import classes from './DynamicModal.module.css';
import { Button, Icon, Input, Spinner } from '..';

const DynamicModal = ({
  onCancel,
  onConfirm,
  title = 'Add new entry',
  show,
  form
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    onConfirm(formData).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setFormData({});
  }, [show]);

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
            {form.map(item => {
              if (item.type === 'text') {
                return (
                  <div className={classes.form_item} key={item.name}>
                    <label className={classes.label}>{item.label}</label>
                    <Input
                      type={item.type}
                      name={item.name}
                      value={formData[item.name]}
                      onChange={handleChange}
                    />
                  </div>
                );
              }
            })}
            <div className={classes.control}>
              <Button
                disabled={loading}
                onClick={handleSubmit}
                className={classes.button}
              >
                {loading ? <Spinner /> : 'Save'}
              </Button>
              <Button
                disabled={loading}
                onClick={onCancel}
                className={classes.button}
                error
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DynamicModal;
