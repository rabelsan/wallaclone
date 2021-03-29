import React from 'react';
import { connect } from 'react-redux';
import i18n from '../../utils/i18n';
import { Link, NavLink } from 'react-router-dom';
import { Layout as DesignLayout, Space } from 'antd';

import styles from './Header.module.css';
import { LogoutButton } from '../auth';
import { withNamespaces } from 'react-i18next';
import { getLoggedUserToken } from '../../store/selectors';

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
}

const { Header: DesignHeader } = DesignLayout;

const Header = ({loggedUserToken, t}) => (
  <DesignHeader className={styles.header}>
    <Space size="large" className={styles.nav}>
      <Link to="/">{t('Adverts')}</Link>
      <Link to="/adverts/new">{t('New advert')}</Link>
    </Space>
    <Space size="large">
      { 
        loggedUserToken
        ? <NavLink to="/signup" className={styles.enableCursor} isActive={() => true}>{t('Edit user')}</NavLink>
        : <NavLink to="/signup" className={styles.enableCursor} isActive={() => true}>{t('Sign up')}</NavLink>
      }
      {
        loggedUserToken
        ? <NavLink to="/login" className={styles.disableCursor} isActive={() => false} onClick={(e) => e.preventDefault()}>{t('Login')}</NavLink>
        : <NavLink to="/login" className={styles.enableCursor} isActive={() => true}>{t('Login')}</NavLink>
      }
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

export default connect(state => ({ loggedUserToken: getLoggedUserToken(state) }))(
  withNamespaces()(Header)
);
