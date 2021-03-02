import React from 'react';
import T from 'prop-types';
import { Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { withNamespaces } from 'react-i18next';

import useForm from '../../../hooks/useForm';
import styles from './LoginForm.module.css';

function LoginForm({ onSubmit, loading, t }) {
  const [form, handleChange] = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const { email, password, remember } = form;
  const credentials = { email, password, remember };

  const canSubmit = () => {
    return !loading && email && password;
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.input}>
      <Input 
        inputType={null}
        name="email"
        className="styles.input"
        prefix={<MailOutlined />}
        placeholder={t("Email or Nickname required")}
        onChange={handleChange}
        value={email}
      />
      <Input
        inputType="Password"
        name="password"
        className="styles.input"
        prefix={<LockOutlined />}
        placeholder={t("Password")}
        onChange={handleChange}
        value={password}
      />
      <Checkbox
        name="remember"
        className={styles.input}
        onChange={handleChange}
        checked={remember}
      >
        {t('Remember me')}
      </Checkbox>
      <Button type="primary" htmlType="submit" disabled={!canSubmit()} block>
        {t('Log In')}
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default withNamespaces()(LoginForm);
