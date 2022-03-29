import { Form } from 'react-bootstrap';
import Loader from '../../components/Loader';

const UploadField = ({
  field,
  label,
  placeholder,
  uploading,
  uploadFileHandler,
}) => {
  // const uploadFileHandler = () => {};

  return (
    <>
      <Form.Group controlId={field.name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type="text" placeholder={placeholder}></Form.Control>
        <Form.Control type="file" onChange={uploadFileHandler} />
        {uploading && <Loader />}
      </Form.Group>
    </>
  );
};

export default UploadField;
