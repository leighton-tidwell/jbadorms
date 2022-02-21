import classes from './Button.module.css';

const Button = ({
  className,
  button,
  type,
  onClick,
  children,
  error,
  ...props
}) => {
  return (
    <button
      className={`${classes.button} ${className && className} ${
        error ? classes.error : ''
      }`}
      type={button || type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
