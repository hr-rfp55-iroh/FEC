import React from 'react';
import PropTypes from 'prop-types';

const FilterLabel = (props) => {
  const { filter, handleRatingFilterClick, handleRemoveFilterClick } = props;
  const handleLabelClick = (e) => {
    handleRatingFilterClick(Number(e.target.value));
  };
  const handleRemoveClick = () => {
    handleRemoveFilterClick();
  };
  return (
    <div>
      {filter.map((rating) => (
        <button type="button" className="filter-label" value={rating} onClick={handleLabelClick}>
          {rating}
          &nbsp;star
        </button>
      ))}
      <button type="button" className="filter-label" onClick={handleRemoveClick}>x</button>
    </div>

  );
};

FilterLabel.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.number),
  handleRatingFilterClick: PropTypes.func,
  handleRemoveFilterClick: PropTypes.func,
};

FilterLabel.defaultProps = {
  filter: [],
  handleRatingFilterClick: () => {},
  handleRemoveFilterClick: () => {},
};

export default FilterLabel;
