import React from 'react';
import T from 'prop-types';
import { Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { withNamespaces } from 'react-i18next';

import useForm from '../../../hooks/useForm';
import styles from './SignupForm.module.css';

function LoginForm({ onSubmit, loading, t }) {
  const [form, handleChange] = useForm({
    name: '',
    email: '',
    password: '',
    remember: false,
  });
  const { name, email, password, password2, remember } = form;
  const credentials = { name, email, password, remember };

  const canSubmit = () => {
    return !loading && email && password && password2 && (password === password2);
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.input}>
      <Input 
        inputType={null}
        name="user"
        className="styles.input"
        prefix={<UserOutlined />}
        placeholder={t("Nickname")}
        onChange={handleChange}
        value={name}
      />
      <Input 
        inputType={null}
        name="email"
        className="styles.input"
        prefix={<MailOutlined />}
        placeholder={t("Email")}
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
      <Input
        inputType="Password"
        name="password2"
        className="styles.input"
        prefix={<LockOutlined />}
        placeholder={t("Verify password")}
        onChange={handleChange}
        value={password2}
      />
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
