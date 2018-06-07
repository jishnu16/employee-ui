/* eslint-disable import/default */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {bindActionCreators} from 'redux';

import Avatar from '../avtar/Avatar';
import ProjectExperience from '../projectExperience/ProjectExperience';
import BasicDetails from '../basic/BasicDetails';
import LeaveHistory from '../leaveHistory/LeaveHistory';
import SkillsAndAbilities from '../skillsAndAbilities/SkillsAndAbilities';
import * as defaultData from '../defaultData/defaultData';
import * as employeeActions from '../../../../actions/employeeActions';

class ViewEmployee extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      employee: Object.assign({}, this.props.employee),
      skillsAndAbilities: Object.assign({}, this.props.skillsAndAbilities),
      id: this.props.id
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.employee.employeeId !== nextProps.employee.employeeId){
      this.setState({employee: nextProps.employee});
    }
    if (this.props.skillsAndAbilities.employeeId !== nextProps.skillsAndAbilities.employeeId){
      this.setState({skillsAndAbilities: nextProps.skillsAndAbilities});
    }
  }

    render() {
    let {state} = this;
    return (
      <div>
        <Avatar id={this.state.id}/>
        <BasicDetails basicDetails={state.employee}/>
        <SkillsAndAbilities skillsAndAbilities={state.skillsAndAbilities} id={state.id}/>
        {state.employee.projectExperience !== undefined &&
        <ProjectExperience projectExperience={state.employee.projectExperience}/>
        }
        {state.employee.leaveHistory !== undefined &&
        <LeaveHistory leaveHistory={state.employee.leaveHistory}/>
        }
      </div>
    );
  }
}

ViewEmployee.propTypes = {
  employee: PropTypes.object.isRequired,
  skillsAndAbilities: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  let employee = defaultData.employee;
  let skillsAndAbilities = null;
  let id = ownProps.params.id;

  if (id && state.employees.length > 0) {
    employee = _.find(state.employees, {employeeId: parseInt(id)});
  }

  if (id && state.skillsAndAbilities.length > 0) {
    skillsAndAbilities = _.find(state.skillsAndAbilities, {employeeId: parseInt(id)});
  }
  if (skillsAndAbilities == undefined ) {
    skillsAndAbilities = defaultData.skillsAndAbilities;
  }

  return {
    employee: employee,
    skillsAndAbilities: skillsAndAbilities,
    id: id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(employeeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployee);
