import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CTX } from 'store';

import NotFound from 'containers/NotFound';
import MainScreen from 'containers/MainScreen';
import Contact from 'containers/Contact';
import ProductDetails from 'containers/ProductDetails';
import Checkout from 'containers/Checkout';
import Terms from 'containers/TermsConditions'
import Categories from 'containers/Categories'
import Category from 'containers/Category'
import Sidenav from 'components/Sidenav/Sidenav';

const routikner = [
  {
    path: "/",
    component: MainScreen,
    exact: true
  },
  {
    path: "/contact",
    component: Contact,
    exact: true
  },
  {
    path: "/product/:id",
    component: ProductDetails,
    exact: false
  },
  {
    path: "/categories",
    component: Categories,
    exact: true
  },
  {
    path: "/category/:cat",
    component: Category,
    exact: false
  },
  {
    path: "/checkout",
    component: Checkout,
    exact: true
  },
  {
    path: "/policies",
    component: Terms,
    exact: true
  },
];

const Routes = () => {
  const [appState, dispatch] = React.useContext(CTX);

  return (
    <Router>
    <div className={appState.activeScreen ? `app-container d-flex ${appState.activeScreen}` : 'app-container d-flex'}>
        <Switch>
          {routikner.map((route, i) => <Route key={i} path={route.path} component={route.component} exact={route.exact} />)}
          <Route component={NotFound} />
        </Switch>
    </div>
    <Sidenav />    
  </Router>
  )
}

export default Routes;
