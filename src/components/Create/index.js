/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Flex, Header } from "../styled";
import FormField from "./FormField";
import Select from "./Select";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";
import { saveNewEmployee, editEmployee } from "../../redux/employees/actionCreators";

const Create = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const employees = useSelector(state => state.employees.employees_records);
  const existingEmployee = employees.find(e => e.id.toString() === id);

  console.log(existingEmployee);

  // Map existing employee versus new values
  const initialValues = existingEmployee || {
    firstName: "",
    surname: "",
    email: "",
    age: "",
    jobTitle: "",
    jobStatus: "",
  };

  const submitForm = useCallback(
    employee => {
      // console.log(employee);

      // checking if employee exists, hence will do update instead of add
      if (existingEmployee) {
        console.log(true);
        dispatch(editEmployee(employee));
      } else {
        console.log(false);
        dispatch(saveNewEmployee(employee));
      }

      history.goBack();
    },
    [dispatch]
  );

  const jobStatusDropdown = [
    { key: "Select an option", value: "" },
    { key: "Active", value: "ACTIVE" },
    { key: "Leave of Absence", value: "LEAVE_OF_ABSENCE" },
    { key: "Terminated", value: "TERMINATED" },
  ];

  return (
    <>
      <Header>{existingEmployee ? "Update Employee" : "Create New Employee"}</Header>
      <Formik
        validationSchema={formValidationSchema}
        onSubmit={submitForm}
        initialValues={initialValues}
      >
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Flex alignItems="left" direction="column" width="300px">
            <FormField name="firstName" placeholder="First name" />

            <FormField name="surname" placeholder="Surname" />

            <FormField name="email" placeholder="Email" />

            <FormField name="age" placeholder="Age" />

            <FormField name="jobTitle" placeholder="Job Title" />

            <Select label="Job Status" name="jobStatus" options={jobStatusDropdown} />

            <FormButtons />
          </Flex>
        </Flex>
      </Formik>
    </>
  );
};

export default Create;
