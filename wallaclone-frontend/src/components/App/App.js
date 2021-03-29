import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PrivateRoute, LoginPage, SignupPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import NotFoundPage from './NotFoundPage';
import { getLoggedUserId } from '../../store/selectors';

function App () {
  const loggedUserId = useSelector(getLoggedUserId);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/login" exact>
            {({ history }) => <LoginPage history={history} />}
        </Route>
        <Route path="/signup" exact>
            {({ history }) => <SignupPage loggedUserId={loggedUserId} history={history} />}
        </Route>
        <Route path="/adverts" exact component={AdvertsPage} />
        <PrivateRoute path="/adverts/new" exact component={NewAdvertPage} />
        <PrivateRoute path="/adverts/:id" exact component={AdvertPage} />
        <Route path="/404" exact>
          {NotFoundPage}
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
