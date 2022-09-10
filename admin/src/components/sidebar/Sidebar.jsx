import "./sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/userApiCalls";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  ExitToApp,
} from "@material-ui/icons";

const Sidebar = () => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;

  const handleLogout = () => {
    logoutUser(dispatch);
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/" className="link">
              <li className={`sidebarListItem ${pathname === "/" && "active"}`}>
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </NavLink>
            <NavLink to="/analytics" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/analytics" && "active"
                }`}
              >
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
            </NavLink>
            <NavLink to="/sales" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/sales" && "active"
                }`}
              >
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/users" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/users" && "active"
                }`}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </NavLink>
            <NavLink to="/newuser" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/newuser" && "active"
                }`}
              >
                <PermIdentity className="sidebarIcon" />
                New User
              </li>
            </NavLink>
            <NavLink to="/products" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/products" && "active"
                }`}
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </NavLink>
            <NavLink to="/newproduct" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/newproduct" && "active"
                }`}
              >
                <Storefront className="sidebarIcon" />
                New Product
              </li>
            </NavLink>
            <NavLink to="/transactions" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/transactions" && "active"
                }`}
              >
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </NavLink>
            <NavLink to="/reports" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/reports" && "active"
                }`}
              >
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <NavLink to="/mail" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/mail" && "active"
                }`}
              >
                <MailOutline className="sidebarIcon" />
                Mail
              </li>
            </NavLink>
            <NavLink to="/feedback" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/feedback" && "active"
                }`}
              >
                <DynamicFeed className="sidebarIcon" />
                Feedback
              </li>
            </NavLink>
            <NavLink to="/messages" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/messages" && "active"
                }`}
              >
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <NavLink to="/manage" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/manage" && "active"
                }`}
              >
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
            </NavLink>
            <NavLink to="/analytics" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/analytics" && "active"
                }`}
              >
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
            </NavLink>
            <NavLink to="/reports" className="link">
              <li
                className={`sidebarListItem ${
                  pathname === "/reports" && "active"
                }`}
              >
                <Report className="sidebarIcon" />
                Reports
              </li>
            </NavLink>
            <li
              onClick={handleLogout}
              className={`sidebarListItem ${
                pathname === "/logout" && "active"
              }`}
            >
              <ExitToApp className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
