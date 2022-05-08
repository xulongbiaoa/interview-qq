import React, { Suspense, createContext, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { ConfigProvider } from 'antd';
import routes from './pages';
import { TitleProvider, useTitle } from './component/Title'
import NotFound from './pages/Warning/NotFound';
import {
  Route,
  Switch,
} from 'react-router-dom';
import './styles/main.scss';
import './App.scss';


export const context = createContext({})

function App() {

  return (
    <Suspense fallback="">
      <TitleProvider>
        <div className="App">
          <ConfigProvider>
            <MetaTags>
              {/* <!-- HTML Meta Tags --> */}
              <meta
                name="description"
                content="better user experience, much lower fees and much stronger service."
              />
              {/* <!-- Google / Search Engine Tags --> */}
              <meta
                itemProp="name"
                content="BTC.com Pool, a better bitcoin mining pool"
              />
              <meta itemProp="image" content="" />
              {/* <!-- Facebook Meta Tags --> */}
              <meta property="og:url" content="https://pool.btc.com" />
              <meta property="og:type" content="website" />
              <meta
                property="og:title"
                content="BTC.com Pool, a better bitcoin mining pool"
              />
              <meta
                property="og:description"
                content="BTC.com pool is a whole new choice for bitcoin miners. BTC.com pool is with much more stable architecture, much better user experience, much lower fees and much stronger service."
              />
              <meta property="og:image" content="" />
              {/* <!-- Twitter Meta Tags --> */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:title"
                content="BTC.com Pool, a better bitcoin mining pool"
              />
              <meta
                name="twitter:description"
                content="BTC.com pool is a whole new choice for bitcoin miners. BTC.com pool is with much more stable architecture, much better user experience, much lower fees and much stronger service."
              />
              <meta name="twitter:image" content="" />
            </MetaTags>
            <Switch>
              {routes.map((route) => {
                const { component, path, ...rest } = route;

                const Component = React.lazy(component);
                if (route.requiresAuth) {
                  return (
                    <Route
                      key={route.path}
                      path={path}
                      render={() => (
                        <React.Suspense fallback={<></>}>
                          <Component
                            key={Math.random()}
                          />
                        </React.Suspense>

                      )}
                    />
                  );
                } else {
                  return (
                    <Route key={Math.random()} {...rest} path={path}>
                      <Component key={Math.random()} />
                    </Route>
                  );
                }
              })}
              <Route key="404" component={NotFound} />
            </Switch>
          </ConfigProvider>
        </div>
      </TitleProvider>
    </Suspense>
  );
}

export default App;
