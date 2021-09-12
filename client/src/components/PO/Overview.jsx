import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import Information from './Information';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.getProductInfo = this.getProductInfo.bind(this);

    this.state = {
      title: '',
      desc: '',
      cat: '',
      price: '',
    };
  }

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo() {
    const { selected } = this.props;

    axios.get(`/po/info/${selected}`)
      .then((results) => {
        const {
          name,
          description,
          category,
          default_price,
        } = results.data;
        this.setState({
          title: name,
          desc: description,
          cat: category,
          price: default_price,
        });
      });
  }

  render() {
    const {
      title,
      desc,
      cat,
      price,
    } = this.state;

    return (
      <div id="product-overview">
        <div id="po-gallery-pnl">
          <li>Image Gallery</li>
        </div>
        <div id="po-info-pnl">
          <StarRating />
          <Information category={cat} name={title} price={price} />
          <li>Style Selector</li>
          <li>Share on Social Media</li>
        </div>
        <div id="po-overview-pnl">
          {desc}
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  selected: PropTypes.number,
};

Overview.defaultProps = {
  selected: 1,
};

export default Overview;
