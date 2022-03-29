import { Form } from 'react-bootstrap';

const RadioField = ({ field, label, options, handleChange }) => {
  return (
    <Form.Group className="position-relative mb-3" onChange={handleChange}>
      <Form.Label>{label}</Form.Label>
      {options.map((item, i) => (
        <Form.Check
          className="mx-3"
          key={i}
          required
          name={field.name}
          type="radio"
          label={item.label}
          value={item.value}
        />
      ))}
    </Form.Group>
  );
};

export default RadioField;
