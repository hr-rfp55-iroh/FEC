import React from 'react';

const Click = (props) => {
  const { children } = props;

  const handleClick = (e) => {
    const element = e.target;
    const time = Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(Date.now());

    console.log(element, time);
  };

  return (
    < >
      {React.Children.map(children,
        (child) => React.cloneElement(child,
          { onClick: handleClick }))}
    </>
  );
};

export default Click;
