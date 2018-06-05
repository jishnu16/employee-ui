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
    let {props} = this;
    this.props.actions.updateRatingValue(nextValue, props.topic, props.id, props.template);
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
  actions: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  // let id = ownProps.id;
  // let topic = ownProps.topic;
  // let template = ownProps.template;
  // let rating = ownProps.rating;
  //
  // // let noOfRating = Object.values(rating);
  return {
    id: ownProps.id,
    rating: ownProps.rating,
    topic: ownProps.topic,
    template: ownProps.template
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ratingActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rating);