import { Field, Form, Formik } from 'formik';

export const SearchBar = ({ onSubmit }) => {
  return (
    <>
      <Formik
        initialValues={{ query: ' ' }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values.query.trim());
          resetForm();
        }}
      >
        <Form>
          <Field
            as="input"
            autoComplete="off"
            placeholder="Search movie..."
            name="query"
            autoFocus
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </>
  );
};
