import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { routeList } from './routes'
import { LazyComponentLoader } from './routes/lazy-component-loader';
import { AppointmentProvider } from './context/AppointmentProvider';


export default function router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppointmentProvider>
          
        <Routes>
          {routeList.map((route, index) => {
            if (route.redirect) {
              return (
                <Route
                  key={index}
                  path={route.route()}
                  Component={() => (
                    <Navigate
                      to={
                        route.redirect as string
                      }
                      replace={true}
                    />
                  )}
                />
              );
            }

            return (
              <Route
                key={index}
                path={route.route()}
                Component={() => (
                  <LazyComponentLoader
                    route={route}
                  />
                )}
              />
            );
          })}
        </Routes>
        
        </AppointmentProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
