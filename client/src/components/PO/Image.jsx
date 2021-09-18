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

Image.propTypes = {
  index: PropTypes.number,
  setPhotoIndex: PropTypes.func,
  thumb: PropTypes.string,
};

Image.defaultProps = {
  index: 0,
  setPhotoIndex: null,
  thumb: '',
};

export default Image;
