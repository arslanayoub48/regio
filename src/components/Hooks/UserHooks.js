import { useEffect, useState } from "react";
import { getLoggedinUser } from "../../services/axios";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  var token = userProfileSession && userProfileSession;
  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    var token = userProfileSession && userProfileSession;
    setUserProfile(userProfileSession ? userProfileSession : null);
    setLoading(token ? false : true);
  }, []);

  return { userProfile, loading, token };
};

export { useProfile };
