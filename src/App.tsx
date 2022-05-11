import React, { Suspense, createContext, useEffect } from 'react';

import { ConfigProvider } from 'antd';
import routes from './pages';
import { TitleProvider } from './context/titleContext';
import NotFound from './pages/Warning/NotFound';
import { useTranslation } from 'react-i18next'
import {
  Route,
  Switch,
} from 'react-router-dom';
import './styles/main.scss';
import './App.scss';
import { LOCALES_MAP } from 'common/config/localeConfig';
import axios from 'axios';
import Layout from 'component/layout';
export const context = createContext({})

//deploy 22.5.12

function App() {
  const { i18n } = useTranslation('common');
  useEffect(() => {
    axios.get('/api/user').then(res => {
      console.log(res)
    })
  }, [])

  return (
    <Suspense fallback="">
      <TitleProvider>
        <div className="App">
          <ConfigProvider locale={LOCALES_MAP[i18n.language]?.antdLocale}>
            <Layout>
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
            </Layout>
          </ConfigProvider>
        </div>
      </TitleProvider>
    </Suspense>
  );
}

export default App;
