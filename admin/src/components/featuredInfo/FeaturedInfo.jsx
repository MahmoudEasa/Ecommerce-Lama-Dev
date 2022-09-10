import "./featuredInfo.css";
import { useState, useEffect } from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";

const FeaturedInfo = () => {
  const [income, setIncome] = useState("Loading...");
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    userRequest
      .get("orders/income")
      .then((res) => {
        const list = res.data.sort((a, b) => {
          return b._id - a._id;
        });
        setIncome(list);
        setPerc((list[1].total * 100) / list[0].total - 100);
      })
      .catch((err) => setIncome("Something is wrong"));
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        {typeof income === "object" ? (
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              ${income.length > 0 && income[1].total}
            </span>
            <span className="featuredMoneyRate">
              % {Math.floor(perc)}{" "}
              {perc < 0 ? (
                <ArrowDownward className="featuredIcon negative" />
              ) : (
                <ArrowUpward className="featuredIcon" />
              )}
            </span>
          </div>
        ) : (
          <div className={income === "Loading..." ? "loading" : "error"}>
            {income}
          </div>
        )}
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
