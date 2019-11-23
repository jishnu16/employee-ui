/* eslint-disable import/namespace */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import _ from 'lodash';

import * as skillsAndAbilitiesActions from '../../../actions/skillsAndAbilitiesActions';
import SkillsAndAbilitiesTemplate from './SkillsAndAbilitiesTemplate';

class SkillsAndAbilities extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      saving: false,
      skillsAndAbilities: Object.assign({}, this.props.skillsAndAbilities)
    };

    this.onSave = this.onSave.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.skillsAndAbilities.employeeId !== nextProps.skillsAndAbilities.employeeId) {
      this.setState({skillsAndAbilities: nextProps.skillsAndAbilities});
    }
  }

  onSave(event) {
    event.preventDefault();
    this.setState({saving: true});
    if (this.props.rating.length > 0) {
      this.props.actions.saveSkillsAndAbilities(this.props.rating, this.props.id)
        .then(() => {
          this.setState({saving: false});
          toastr.success("Skills and Abilities updated");
        })
        .catch(error => {
          toastr.error(error);
          this.setState({saving: false});
        });
    } else {
      this.setState({saving: false});
    }
  }

  render() {
    let {skillsAndAbilities} = this.state;
    let keys = Object.keys(skillsAndAbilities);
    let currentSubset = _.pull(keys, "employeeId");
    return (
      <div className="col-md-12">
        <form>
          <div className="container-fluid">
            {currentSubset.map((each, i) =>
              <SkillsAndAbilitiesTemplate
                key={i}
                skillsAndAbilities={skillsAndAbilities[each]}
                subset={each}
                id={this.props.id}/>
            )}
          </div>
          <input
            name="submit"
            disabled={this.state.saving}
            value={this.state.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={this.onSave}
          />
        </form>
      </div>
    );
  }
}

SkillsAndAbilities.propTypes = {
  rating: PropTypes.array.isRequired,
  skillsAndAbilities: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired
};


function mapStateToProps(state, ownProps) {
  let id = ownProps.id;
  return {
    skillsAndAbilities: ownProps.skillsAndAbilities,
    rating: state.rating,
    id: id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(skillsAndAbilitiesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsAndAbilities);