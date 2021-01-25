import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { projectService, alertService, accountService } from '@/_services';
import { Role } from '@/_helpers';

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const user = accountService.userValue;

  const initialValues = {
    title: '',
    managerName: '',
    description: '',
    mainImageUrl: '',
    progress: 0,
    startDate: '',
    expectedEndDate: '',
    manager: ''
    // actualEndDate: ''
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    managerName: Yup.string().required('Manager Name is required'),
    description: Yup.string().required('Description is required'),
    mainImageUrl: Yup.string().required('Main image Url is required'),
    progress: Yup.number().required('Progress is required'),
    startDate: Yup.date().required('Start date is required'),
    expectedEndDate: Yup.date().required('Expected end date is required')
    //actualEndDate: Yup.string()
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

  function updateProject(id, fields, setSubmitting) {
    projectService
      .update(id, fields)
      .then(() => {
        alertService.success('Update successful', { keepAfterRouteChange: true });
        history.push('..');
      })
      .catch(error => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  useEffect(() => {
    if (user.role === Role.Manager) {
      initialValues.manager = user.id;
    }
  }, []);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, isSubmitting, setFieldValue, handleChange, values }) => {
        useEffect(() => {
          // get project and set form fields
          if (!isAddMode) {
            projectService.getById(id).then(project => {
              const fields = [
                'title',
                'managerName',
                'description',
                'mainImageUrl',
                'progress',
                'startDate',
                'expectedEndDate',
                'manager'
                //'actualEndDate'
              ];
              fields.forEach(field => setFieldValue(field, project[field], false));
            });
          }
        }, []);

        return (
          <Form>
            <h1>{isAddMode ? 'Add Project' : 'Edit Project'}</h1>
            <div className="form-row">
              <div className="form-group col">
                <label>Title</label>
                <Field
                  name="title"
                  type="text"
                  className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}
                />
                <ErrorMessage name="title" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col" hidden={user.role !== Role.Admin}>
                <label>Manager</label>
                <Field
                  name="manager"
                  type="text"
                  className={'form-control' + (errors.manager && touched.manager ? ' is-invalid' : '')}
                />
                <ErrorMessage name="manager" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-5">
                <label>Manager Name</label>
                <Field
                  name="managerName"
                  type="text"
                  className={'form-control' + (errors.managerName && touched.managerName ? ' is-invalid' : '')}
                />
                <ErrorMessage name="managerName" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-5">
                <label>Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')}
                />
                <ErrorMessage name="description" component="div" className="invalid-feedback" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Main Image Url</label>
                <Field
                  name="mainImageUrl"
                  type="text"
                  className={'form-control' + (errors.mainImageUrl && touched.mainImageUrl ? ' is-invalid' : '')}
                />
                <ErrorMessage name="mainImageUrl" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col-7">
                <label>Progress</label>
                <Field
                  name="progress"
                  type="number"
                  className={'form-control' + (errors.progress && touched.progress ? ' is-invalid' : '')}
                />
                <ErrorMessage name="progress" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group col">
                <TextField
                  fullWidth
                  id="startDate"
                  name="startDate"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={values.startDate}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <TextField
                  fullWidth
                  id="expectedEndDate"
                  type="date"
                  name="expectedEndDate"
                  label="Expected End Date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={values.expectedEndDate}
                  onChange={handleChange}
                  error={touched.expectedEndDate && Boolean(errors.expectedEndDate)}
                  helperText={touched.expectedEndDate && errors.expectedEndDate}
                />
                <ErrorMessage name="expectedEndDate" component="div" className="invalid-feedback" />
              </div>
              {/*<div className="form-group col">
                <TextField
                  fullWidth
                  id="actualEndDate"
                  type="date"
                  name="actualEndDate"
                  InputLabelProps={{
                    shrink: true
                  }}
                  label="Actual End Date"
                  value={formik.values.actualEndDate}
                  onChange={formik.handleChange}
                  error={formik.touched.actualEndDate && Boolean(formik.errors.actualEndDate)}
                  helperText={formik.touched.actualEndDate && formik.errors.actualEndDate}
                />
                <ErrorMessage name="actualEndDate" component="div" className="invalid-feedback" />
              </div>*/}
            </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Save
              </button>
              <Link to={isAddMode ? '.' : '..'} className="btn btn-link">
                Cancel
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
export { AddEdit };
