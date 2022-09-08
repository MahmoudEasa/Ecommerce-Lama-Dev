import "./widgetSm.css";
import { useState } from "react";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import { userRequest } from "./../../requestMethods";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userRequest
      .get("users/?new=true")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.length > 0 ? (
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
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        ) : (
          <div className="loading">Loading....</div>
        )}
      </ul>
    </div>
  );
};

export default WidgetSm;
