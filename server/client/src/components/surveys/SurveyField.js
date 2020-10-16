//SurveyField contains logic to render a single label and text input
import React from 'react';

//show text input itself, add propss
export default ({ input, label, meta: { error, touched } }) => {     //meta中2 properties
  // console.log(props.input);
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
