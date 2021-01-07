import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { projectService, alertService } from '@/_services';

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const initialValues = {
    title: '',
    managerName: '',
    description: '',
    progress: 0,
    startDate: '',
    expectedEndDate: '',
    actualEndDate: '',
    mainImageUrl: ''
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    managerName: Yup.string().required('Manager Name is required'),
    description: Yup.string().required('Description is required'),
    mainImageUrl: Yup.string().required('Main image Url is required'),
    progress: Yup.number().required('Progress is required'),
    startDate: Yup.date().required('Start date is required'),
    expectedEndDate: Yup.date().required('Expected end date is required'),
    actualEndDate: Yup.date()
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      createProject(fields, setSubmitting);
    } else {
      updateProject(id, fields, setSubmitting);
    }
  }

  function createProject(fields, setSubmitting) {
    projectService
      .create(fields)
      .then(() => {
        alertService.success('Project added successfully', { keepAfterRouteChange: true });
        history.push('.');
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error(error);
      });
  }
}
export { AddEdit };
