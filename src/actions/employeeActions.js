import {ajaxCallError, beginAjaxCall} from "./ajaxStatueActions";
import * as types from '../constants/constant';
import axios from 'axios';

export function createEmployeeSuccess(employee) {
  return {type: types.CREATE_EMPLOYEE_SUCCESS, employee};
}

export function loadEmployeesSuccess(employees) {
  return {type: types.LOAD_EMPLOYEES_SUCCESS, employees};
}

export function loadEmployees() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.get("http://localhost:8080/employees").then(res => {
      dispatch(loadEmployeesSuccess(res.data));
    }).catch(error => {
      throw (error);
    });
  };
}

export function saveEmployee(employee) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return axios.post("http://localhost:8080/employee", employee).then(res => {
      if (res.status === 200) {
        dispatch(createEmployeeSuccess(res.data));
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}
