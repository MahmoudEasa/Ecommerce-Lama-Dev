import "./topbar.css";
import { useNavigate } from "react-router-dom";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span onClick={() => navigate("/")} className="logo">
            E-Shopadmin
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
