import React from 'react';
import { connect } from 'react-redux'; 
import T from 'prop-types';
import { Alert } from 'antd';

import { login } from '../../../store/actions';
import SignupForm from './SignupForm';
import { getUi } from '../../../store/selectors';
import { withNamespaces } from 'react-i18next';
import Layout from '../../layout';

function SignupPage ({ onLogin, loading, error, t}) {
  return (
    <Layout title={t("Sign up")}>
      <SignupForm onSubmit={onLogin} loading={loading}/>
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
  onLogin: T.func.isRequired,
  loading: T.bool.isRequired,
  error: T.string,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

export default connect(getUi, dispatch => ({
  onLogin: (crendentials, history) => dispatch(login(crendentials, history)),
}))(withNamespaces()(SignupPage));

