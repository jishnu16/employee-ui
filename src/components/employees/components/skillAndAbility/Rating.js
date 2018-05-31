/* eslint-disable import/default */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import StarRatingComponent from 'react-star-rating-component';
import * as ratingActions from '../../../../actions/ratingActions';

class Rating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.rating
    };
    this.onStarClick = this.onStarClick.bind(this);
  }

  onStarClick(nextValue) {
    this.props.actions.updateRating(nextValue, this.props.title, this.props.template);
    this.setState({rating: nextValue});
  }

  render() {
    return (
      <div>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick}
        />
      </div>
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  actions: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  let {template} = ownProps;
  let {title} = ownProps;
  let rating = Object.values(title);
  return {
    rating: rating[0]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ratingActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
