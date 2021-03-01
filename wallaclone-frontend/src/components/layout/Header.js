import React from 'react';
import i18n from '../../utils/i18n';
import { Link } from 'react-router-dom';
import { Layout as DesignLayout, Space } from 'antd';

import styles from './Header.module.css';
import { LogoutButton } from '../auth';
import { withNamespaces } from 'react-i18next';

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
}

const { Header: DesignHeader } = DesignLayout;

const Header = ({t}) => (
  <DesignHeader className={styles.header}>
    <Space size="large" className={styles.nav}>
      <Link to="/">{t('Adverts')}</Link>
      <Link to="/adverts/new">{t('New advert')}</Link>
    </Space>
    <Space size="large">
      <Link to="/">{t('Sign up')}</Link>
      <Link to="/login">{t('Login')}</Link>
    </Space>
    <Space size="small">
      <div className={styles.div}>
        <button onClick={() => changeLanguage('es')}>es</button>
        <button onClick={() => changeLanguage('en')}>en</button>
      </div>
      <LogoutButton className={styles.button}>{t('Logout')}</LogoutButton>
    </Space>
  </DesignHeader>
);

export default withNamespaces()(Header);
