import "./widgetSm.css";
import { useState, useEffect } from "react";
import { Visibility } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { userRequest } from "./../../requestMethods";

const WidgetSm = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState("Loading...");

  useEffect(() => {
    userRequest
      .get("users/?new=true")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        setUsers("Something is wrong");
      });
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {typeof users === "object" && users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="widgetSmListItem">
              <img
                src={
                  user.img ||
                  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button
                onClick={() => navigate(`/user/${user._id}`)}
                className="widgetSmButton"
              >
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        ) : (
          <div
            className={users === "Loading..." ? "loading" : "error"}
            style={{ padding: "100px 0" }}
          >
            {users}
          </div>
        )}
      </ul>
    </div>
  );
};

export default WidgetSm;
