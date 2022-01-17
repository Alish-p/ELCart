import { Spinner } from 'react-bootstrap';

const Loader = ({ size }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: size === 'sm' ? '50px' : '100px',
        height: size === 'sm' ? '50px' : '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

Loader.defaultProps = {
  size: 'lg',
};
export default Loader;
