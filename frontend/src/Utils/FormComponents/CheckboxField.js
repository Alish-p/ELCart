import { Form } from 'react-bootstrap';

const CheckboxField = ({ field, label, handleChange }) => {
  return (
    <Form.Group className="position-relative mb-3" onChange={handleChange}>
      <Form.Label>{label}</Form.Label>
      <Form.Check className="mx-3" name={field.name} type="checkbox" />
    </Form.Group>
  );
};

export default CheckboxField;
