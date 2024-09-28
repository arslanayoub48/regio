import { useSelector } from "react-redux";
import { administrationSubMenu } from "../../components/layout/LayoutMenuData";
import Users from "./Users";
import { Link, Route, Routes } from "react-router-dom";
import withRouter from "../../components/common/withRouter";
import Statistics from "./Statistics";
import Levels from "./Levels";
import SendMail from "./SendMail";
import Regions from "./Regions";

const AdminLayout = (props) => {
  const routes = [
    { path: "/users", component: Users },
    { path: "/statistics", component: Statistics },
    { path: "/levels", component: Levels },
    { path: "/send-mails", component: SendMail },
    { path: "/regions", component: Regions },
  ];
  const { adminRole } = useSelector((state) => state.Auth);
  const { router } = props;
  return (
    <div>
      <div className="pb-4 d-grid grid-card-container">
        <div className="menu-links-card profile-card h-auto me-4 shadow-sm">
          <div className="sticky-menu">
            <div className="profile-header border-bottom px-4 py-3">
              <h5 className="mb-0">Administration Menu</h5>
            </div>
            <ul className="list-unstyled px-4 py-3">
              {administrationSubMenu(adminRole)?.map((list, key) => (
                <li key={`menu-list-${key + 1}`} className="d-block mb-3">
                  <Link
                    to={list.link}
                    className={`${
                      router.location.pathname == list.link
                        ? "text-success"
                        : ""
                    }`}
                  >
                    <span className="cursor-pointer">{list.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="profile-card shadow-sm">
          <Routes>
            <Route>
              {routes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={idx}
                  exact={true}
                />
              ))}
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default withRouter(AdminLayout);
