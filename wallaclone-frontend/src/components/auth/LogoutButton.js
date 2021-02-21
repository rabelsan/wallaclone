import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

//import T from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';

import { logout } from '../../api/auth';
import ConfirmationButton from '../shared/ConfirmationButton';
import { getLoggedUserToken } from '../../store/selectors';
import { authLogout } from '../../store/actions';
import { withNamespaces } from 'react-i18next';

function LogoutButton ( {t, ...props}) {
  const loggedUserToken = useSelector(getLoggedUserToken);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authLogout());

  return( 
    <ConfirmationButton
      danger
      icon={<LogoutOutlined />}
      shape="round"
      type="dashed"
      disabled={!(!!loggedUserToken)}
      confirmationProps={{
        title: t('Close session'),
        content: t('Are you sure you want to disconnect?'),
        okText: t('Yes'),
        cancelText: t('No'),
        okButtonProps: {
          danger: true,
        },
      }}
      onConfirm={() => logout().then(onLogout)}
    />
  );
}

//LogoutButton.propTypes = {
//  onLogout: T.func.isRequired,
//};

export default withNamespaces()(LogoutButton);
