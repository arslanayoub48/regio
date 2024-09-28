import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProfile } from "../components/Hooks/UserHooks";
import { updateBearerToken } from "../services/axios";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();

  useEffect(() => {
    if (userProfile && !loading && token) {
      updateBearerToken(token);
    } else if (!userProfile && loading && !token) {
      //logout
    }
  }, [token, userProfile, loading, dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const PublicProtectedRoute = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();

  useEffect(() => {
    if (userProfile && !loading && token) {
      updateBearerToken(token);
    } else if (!userProfile && loading && !token) {
      //logout
    }
  }, [token, userProfile, loading, dispatch]);

  if (userProfile && !loading && token) {
    return (
      <Navigate
        to={{ pathname: "/dashboard", state: { from: props.location } }}
      />
    );
  }
  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute, PublicProtectedRoute };
