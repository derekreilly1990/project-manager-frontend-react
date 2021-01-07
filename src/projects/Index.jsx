import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { AddEdit } from './AddEdit';

function Projects({ match }) {
  const { path } = match;

  return (
    <div className="p-4">
      <div className="container">
        <Switch>
          <Route exact path={path} component={List} myProp={'this is a prop'} />
          <Route path={`${path}/add`} component={AddEdit} />
          <Route path={`${path}/edit/:id`} component={AddEdit} />
          <Route path={`${path}/view/:id`} component={AddEdit} />
        </Switch>
      </div>
    </div>
  );
}

export { Projects };
