import { useEffect, useState } from "react";
import MyTasks from "../../components/profile/MyTasks";
import { getModulesInProfile } from "../../services/api/user";
import { useSelector } from "react-redux";
import { administrationSubMenu } from "../../components/layout/LayoutMenuData";
import PersonalDetails from "../../components/profile/PersonalDetails";
import Payments from "../../components/profile/Payments";
import withRouter from "../../components/common/withRouter";
import { useSearchParams } from "react-router-dom";
const UserProfile = (props) => {
  const { userProfile, adminRole } = useSelector((state) => state.Auth);
  const [loader, setLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const tabsList = [
    {
      title: "Payments",
      component: Payments,
    },
    {
      title: "Personal Details",
      component: PersonalDetails,
    },
    {
      title: "My Posts (12)",
      component: MyTasks,
      key: "posts",
    },
    {
      title: "Family",
      component: "",
    },
    {
      title: "Change Password",
      component: "",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabsList[0]);
  const API_URLS = [
    {
      label: "Products",
      slug: "product",
    },
    {
      label: "Search & Find",
      slug: "search-find",
    },
    {
      label: "Help offered",
      slug: "help-offered",
    },
    {
      label: "Help Searched",
      slug: "help-searched",
    },
    {
      label: "Events",
      slug: "event",
    },
    {
      label: "Food Events",
      slug: "food-event",
    },
    {
      label: "Rentals",
      slug: "rental",
    },
    {
      label: "Orders",
      slug: "order",
    },
    {
      label: "Resources",
      slug: "resource",
    },
  ];

  const [data, setData] = useState({});

  const fetchData = async () => {
    setLoader(true);
    try {
      for (const url of API_URLS) {
        const slug = url.slug;
        try {
          const response = await delayedRequest(slug, 1000);
          setData((prevData) => ({ ...prevData, [slug]: response.data?.data }));
        } catch (error) {}
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (userProfile?.id && activeTab?.key == "posts") {
      fetchData();
    }
  }, [userProfile, activeTab]);

  const delayedRequest = (url, delay) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await getModulesInProfile(url, userProfile.id);
        resolve(response);
      }, delay);
    });
  };
  useEffect(() => {
    if (searchParams.get("tab") && searchParams.get("tab") == "payment") {
      setActiveTab(tabsList[0]);
    }
  }, [props.router]);
  return (
    <div className="pb-4 d-flex">
      <div className="profile-card shadow-sm flex-1">
        <div className="profile-header border-bottom">
          <ul className="mb-0 list-unstyled px-2 d-flex align-items-center">
            {tabsList.map((list, key) => (
              <li
                className={`me-4 px-3 py-3 cursor-pointer ${
                  activeTab.title == list.title ? "active" : ""
                }`}
                key={`profile-tab-list-${key + 1}`}
                onClick={() => {
                  props.router.navigate("/profile");
                  setActiveTab(list);
                }}
              >
                {list.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-body px-3 pb-4 pt-0">
          {activeTab?.component ? (
            <activeTab.component
              loader={loader}
              data={data}
              urls={API_URLS}
              setData={setData}
              router={props.router}
            />
          ) : (
            <div className="py-4">{activeTab.title}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserProfile);
