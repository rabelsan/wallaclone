import React from 'react';
import T from 'prop-types';
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { withNamespaces } from 'react-i18next';

import useForm from '../../../hooks/useForm';
import styles from './SignupForm.module.css';

function LoginForm({ loggedUserId, onSubmit, loading, t }) {
  const [form, handleChange] = useForm({
    nickname: '',
    email: '',
    password: '',
    password2: '',
  });
  const { nickname, email, password, password2 } = form;
  const credentials = { nickname, email, password };

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
        name="nickname"
        className="styles.input"
        prefix={<UserOutlined />}
        placeholder={t("Nickname")}
        onChange={handleChange}
        value={nickname}
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
      <Input.Password
        name="password"
        className="styles.input"
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        placeholder={t("Password")}
        onChange={handleChange}
        value={password}
      />
      <Input.Password
        name="password2"
        className="styles.input"
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        placeholder={t("Verify password")}
        onChange={handleChange}
        value={password2}
      />
      <Button type="primary" htmlType="submit" disabled={!canSubmit()} block>
        {t(loggedUserId ? 'Edit user' : 'Sign up')}
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default withNamespaces()(LoginForm);
