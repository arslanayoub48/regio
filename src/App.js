import "./assets/scss/themes.scss";
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/scss/themes.scss";
import DashboardLayout from "./pages/DashboardLayout";
import { Toaster } from "react-hot-toast";
import { authProtectedRoutes, publicRoutes } from "./routes/allRoutes";
import { AuthProtected, PublicProtectedRoute } from "./routes/AuthProtected";
import React from "react";
function App() {
  // const { demoSlice } = useSelector(state => state.demo)
  // console.log('demoSlice', demoSlice)
  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <Routes>
            <Route>
              {publicRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={
                    <PublicProtectedRoute>
                      <route.component />
                    </PublicProtectedRoute>
                  }
                  key={idx}
                  exact={true}
                />
              ))}
            </Route>

            <Route>
              {authProtectedRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={
                    <AuthProtected>
                      <DashboardLayout>{<route.component />}</DashboardLayout>
                    </AuthProtected>
                  }
                  key={idx}
                  exact={true}
                />
              ))}
            </Route>
          </Routes>
        </Router>
      </React.Fragment>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
        position="bottom right"
      />
    </div>
  );
}

export default App;
