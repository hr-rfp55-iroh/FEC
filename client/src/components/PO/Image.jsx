import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  const { index, thumb, setPhotoIndex } = props;

  return (
    <div
      onClick={() => { setPhotoIndex(index); }}
      onKeyPress={() => {}}
      tabIndex={0}
      role="button"
      value={index}
      className="image-thumb"
    >
      <img
        alt="thumb"
        src={thumb}
      />
    </div>
  );
};

export default Image;
