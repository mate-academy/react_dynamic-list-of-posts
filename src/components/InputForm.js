import React from 'react';
import { Form, Input } from 'semantic-ui-react';

function InputForm({ filtering }) {
  const inputChanged = (event) => {
    filtering(event.target.value);
  };

  return (
    <div className="input">
      <Form>
        <Form.Input
          id="form-input-control"
          onChange={inputChanged}
          control={Input}
          label="Find posts"
          placeholder="Please type what do you want to find"
        />
      </Form>
    </div>
  );
}

export default InputForm;
