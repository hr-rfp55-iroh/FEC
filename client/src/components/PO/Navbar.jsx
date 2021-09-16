import React from 'react';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  const { previous, next } = props;

  return (
    <div id="navbar-products">
      <button
        className="nav-button"
        type="button"
        onClick={previous}
      >
        PREVIOUS
      </button>
      <button
        className="nav-button"
        type="button"
        onClick={next}
      >
        NEXT
      </button>
    </div>
  );
};

Navbar.propTypes = {
  previous: PropTypes.func,
  next: PropTypes.func,
};

Navbar.defaultProps = {
  previous: null,
  next: null,
};

export default Navbar;
