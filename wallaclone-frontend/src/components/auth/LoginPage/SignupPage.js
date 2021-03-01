import React from 'react';
import { connect } from 'react-redux'; 
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

import { login } from '../../../store/actions';
import LoginForm from './LoginForm';
import { getUi } from '../../../store/selectors';
import { withNamespaces } from 'react-i18next';
import Layout from '../../layout';

function LoginPage ({ onLogin, loading, error, t}) {
  return (
    <Layout title={t("Signup")}>
      <LoginForm onSubmit={onLogin} loading={loading}/>
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

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
  loading: T.bool.isRequired,
  error: T.string,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

export default connect(getUi, dispatch => ({
  onLogin: (crendentials, history) => dispatch(login(crendentials, history)),
}))(withNamespaces()(LoginPage));

