import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ROUTER from '@common/constants/router';
import Root from '@src/container/root';
import Resume from '@src/container/resume';

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        {/* 👇 一定要添加 exact */}
        <Route path={ROUTER.root} exact component={Root} />
        <Route path={ROUTER.resumen} exact component={Resume} />
      </Switch>
      {/* 重定向到首页 */}
      <Redirect to={ROUTER.root} />
    </HashRouter>
  );
};

export default Router;