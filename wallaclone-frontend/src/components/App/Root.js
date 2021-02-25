import React from 'react';
import { Provider } from 'react-redux';
// import { Router } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import i18n from "i18next";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <div>{i18n.t('Ups! Something went wrong.')}</div>;
    }

    return this.props.children;
  }
}

const Root = ({ children, store, history }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  </ErrorBoundary>
);

export default Root;
