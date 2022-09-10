import "./chart.css";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title, data, dataKey, grid }) => {
  const isFetching = useSelector((state) => state.home.isFetching);
  const isError = useSelector((state) => state.home.isError);
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      {isFetching ? (
        <div className="loading">Loading...</div>
      ) : isError ? (
        <div className="error">Something is wrong</div>
      ) : (
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#5550bd" />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
