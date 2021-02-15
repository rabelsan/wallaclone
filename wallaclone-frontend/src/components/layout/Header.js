import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as DesignLayout, Space } from 'antd';

import styles from './Header.module.css';
import { LogoutButton } from '../auth';
import LanguageSelector from '../../i18n/LanguageSelector';
import { withTranslation } from 'react-i18next'


const { Header: DesignHeader } = DesignLayout;

const Header = ({t}) => (
  <DesignHeader className={styles.header}>
    <Space size="large" className={styles.nav}>
      <Link to="/">{t('Adverts')}</Link>
      <Link to="/adverts/new">{t('New advert')}</Link>
    </Space>
    <Space size="small">
    <LogoutButton className={styles.button}>Logout</LogoutButton>
    </Space>
  </DesignHeader>
);

export default withTranslation()(Header);
