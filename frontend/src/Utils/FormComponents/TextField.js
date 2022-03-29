import { Form } from 'react-bootstrap';

const TextField = ({ field, form, type, label, placeholder, size }) => {
  const meta = form.getFieldMeta(field.name);
  return (
    <Form.Group className="mb-3" controlId={field.name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        size={size}
        type={type}
        placeholder={placeholder}
        {...field}
        isInvalid={meta.touched && meta.error}
      />
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextField;
