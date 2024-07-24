import dayjs from "dayjs";
import { query } from "~/utils";

const formatStr = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";

export const getPoints = async (params?: { startTime?: number; endTime?: number }) => {
  const { startTime = dayjs().subtract(10, "day").startOf("day").unix(), endTime = dayjs().endOf("day").unix() } =
    params || {};
  let emptyX: number[] = [];
  let diff = dayjs.unix(endTime).startOf("day").diff(dayjs.unix(startTime).startOf("day"), "day");
  let n = 0;
  while (n <= diff) {
    emptyX.push(dayjs.unix(startTime).add(n, "day").unix());
    n += 1;
  }
  const res = await query(
    "/api/points/history",
    {
      startTime: startTime ? dayjs.unix(startTime).utc().format(formatStr) : undefined,
      endTime: endTime ? dayjs.unix(endTime).utc().format(formatStr) : undefined,
      interval: "Day",
    },
    {
      method: "post",
    },
  );

  const list = (res?.data?.history?.points || []).map(({ at, point, details }) => ({
    x: dayjs(at).unix(),
    y: Number(point),
    details,
  }));
  const defaultList = emptyX.map((x, i) => ({ x, y: (i + 1) * 1 }));
  const allNodeIdsSet = new Set<string>();
  (res?.data?.history?.points || []).forEach(({ details }) => {
    details.forEach(({ nodeId }) => {
      allNodeIdsSet.add(nodeId);
    });
  });
  const allNodeIds = Array.from(allNodeIdsSet);
  return { list, defaultList, allNodeIds };
};

export const getPointsTotal = async () => {
  const res = await query("/api/points/overall", {}, { method: "get" });
  return res.data;
};
