import { userRequest } from "../requestMethods";
import { getStatsStart, getStatsSuccess, getStatsFailure } from "./homeRedux";

export const getStats = async (dispatch, MONTHS) => {
  dispatch(getStatsStart());

  try {
    const res = await userRequest.get("/users/stats");
    const data = res.data
      .sort((a, b) => a._id - b._id)
      .map((item) => {
        return { name: MONTHS[item._id - 1], "Active User": item.total };
      });
    dispatch(getStatsSuccess(data));
  } catch (err) {
    dispatch(getStatsFailure());
  }
};
