import "./widgetLg.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";

const WidgetLg = () => {
  const [orders, setOrders] = useState("Loading...");

  useEffect(() => {
    userRequest
      .get("orders")
      .then((res) => setOrders(res.data))
      .catch(() => {
        setOrders("Something is wrong");
      });
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      {typeof orders === "object" && orders.length > 0 ? (
        <table className="widgetLgTable">
          <thead>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Customer</th>
              <th className="widgetLgTh">Date</th>
              <th className="widgetLgTh">Amount</th>
              <th className="widgetLgTh">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src={
                      order.img ||
                      "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">{order.userId}</span>
                </td>
                <td className="widgetLgDate">{format(order.createdAt)}</td>
                <td className="widgetLgAmount">${order.amount}</td>
                <td className="widgetLgStatus">
                  <Button type={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          className={orders === "Loading..." ? "loading" : "error"}
          style={{ padding: "100px 0" }}
        >
          {orders}
        </div>
      )}
    </div>
  );
};

export default WidgetLg;
