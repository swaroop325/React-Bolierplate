import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Landing,
  LoginPage,
  Products,
  SignUp,
  UnAuthorized,
  Verify,
} from './Pages';
import { PrivateRoute } from './Global';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={'/'} component={Landing} />
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/login'} component={LoginPage} />
      <PrivateRoute exact path={'/products'} component={Products} />
      <Route exact path={'/verify'} component={Verify} />
      <Route exact path={'/unauthorized'} component={UnAuthorized} />
    </Switch>
  );
};

export default Routes;
