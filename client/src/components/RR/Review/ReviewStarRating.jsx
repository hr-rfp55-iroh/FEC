import React from 'react';
import PropTypes from 'prop-types';

class ReviewStarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.handleSelectOption = this.handleSelectOption.bind(this);
  }

  handleSelectOption(e) {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    const { name, selections } = this.props;
    const { text } = this.state;
    const displayText = selections[text];
    return (
      <div className="star">
        <div className="review-rating" onChange={this.handleSelectOption}>
          <input type="radio" id={`5star${name}`} name={`review-rating-${name}`} value="5" required />
          <label htmlFor={`5star${name}`} ></label>
          <input type="radio" id={`4star${name}`} name={`review-rating-${name}`} value="4" />
          <label htmlFor={`4star${name}`} ></label>
          <input type="radio" id={`3star${name}`} name={`review-rating-${name}`} value="3" />
          <label htmlFor={`3star${name}`} ></label>
          <input type="radio" id={`2star${name}`} name={`review-rating-${name}`} value="2" />
          <label htmlFor={`2star${name}`} ></label>
          <input type="radio" id={`1star${name}`} name={`review-rating-${name}`} value="1" />
          <label htmlFor={`1star${name}`} ></label>
        </div>
        <p>{displayText}</p>
      </div>
    );
  }
}

ReviewStarRating.propTypes = {
  name: PropTypes.string,
  selections: PropTypes.objectOf(PropTypes.any),
};

ReviewStarRating.defaultProps = {
  name: '',
  selections: {},
};

export default ReviewStarRating;
