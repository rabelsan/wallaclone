import React from 'react';
import { connect } from 'react-redux'; 
import T from 'prop-types';
import { Alert } from 'antd';

import { signup, editUser } from '../../../store/actions';
import SignupForm from './SignupForm';
import { getUi } from '../../../store/selectors';
import { withNamespaces } from 'react-i18next';
import Layout from '../../layout';

function SignupPage ({ loggedUserId, onSignup, onEditUser, loading, error, t}) {
  return (
    <Layout title={t(loggedUserId ? 'Edit user' : 'Sign up')}>
      <SignupForm loggedUserId={loggedUserId} onSubmit={loggedUserId ? onEditUser: onSignup} loading={loading}/>
      {error && (
        <Alert
          closable 
          message={error}
          showIcon
          type="error"
          style={{ marginTop: 24 }}
        />
      )}
    </Layout>
  );
}

SignupPage.propTypes = {
  onSignup: T.func.isRequired,
  onEditUser: T.func.isRequired,
  loading: T.bool.isRequired,
  error: T.string,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

export default connect(getUi, dispatch => ({
  onSignup: (crendentials, history) => dispatch(signup(crendentials, history)),
  onEditUser: (crendentials, history) => dispatch(editUser(crendentials, history)),
}))(withNamespaces()(SignupPage));

