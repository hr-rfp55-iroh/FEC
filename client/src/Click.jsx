/* eslint-disable react/forbid-prop-types */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Click = (props) => {
  const { widget, children } = props;

  const handleClick = (e) => {
    const element = e.target.toString();
    const time = Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(Date.now());

    const obj = {
      element,
      widget,
      time,
    };

    // DEMO PURPOSES: console.log(obj);

    axios.post('/click', obj)
      .then(() => {})
      .catch((err) => {
        throw err;
      });
  };

  return (
    < >
      {React.Children.map(children,
        (child) => React.cloneElement(child,
          { onClick: handleClick }))}
    </>
  );
};

Click.propTypes = {
  widget: PropTypes.string,
  children: PropTypes.node,
};

Click.defaultProps = {
  widget: '',
  children: null,
};

export default Click;
