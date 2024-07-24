import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { query, formatEth } from "~/utils";

export const getFundDetail = async (params: {
  owner: string;
}): Promise<{ yestodayEarning: string; edgeServers?: string[] }> => {
  const res = await query("/gateway/edge_server/v1/owner_detail", params, {
    method: "post",
  });
  return res?.data?.data;
};

export const getFundCharts = async (params: {
  edgeServer: string[];
  startTime: number;
  endTime: number;
  owner: string;
}) => {
  const {
    startTime = dayjs().subtract(10, "day").startOf("day").unix(),
    endTime = dayjs().endOf("day").unix(),
    edgeServer,
    owner,
  } = params || {};
  let emptyX: number[] = [];
  let diff = dayjs.unix(endTime).startOf("day").diff(dayjs.unix(startTime).startOf("day"), "day");
  let n = 0;
  while (n <= diff) {
    emptyX.push(dayjs.unix(startTime).add(n, "day").unix());
    n += 1;
  }
  const res = await query(
    "/gateway/edge_server/v1/earning_list",
    { startTime: String(startTime), endTime: String(endTime), edgeServer: edgeServer || [], owner: owner },
    {
      method: "post",
    },
  );
  const list = (res?.data?.data?.list || []).map(({ x, originY }) => ({
    x: Number(x),
    y: formatEth(originY),
  }));
  const defaultList = emptyX.map((x, i) => ({ x, y: i === 0 ? 100 : 0 }));
  return { list, defaultList };
};

export type FundItem = {
  amount: string;
  bandwidth: string;
  country: string;
  createdUnix: string;
  event: number;
  gasFee: string;
  id: string;
  nodeId: string;
  orderId: string;
  province: string;
  height: string;
};

export const getFundList = async (params: { owner: string; next: number }) => {
  const res = await query<{ data: { list: FundItem[]; next: number } }>(
    "/gateway/edge_server/v1/balance_change",
    params,
  );
  const list = res.data?.data?.list || [];
  return { list, next: Number(list?.[list.length - 1]?.height) || 0 };
};

export const getNodeIds = async () => {
  const res = await query("/api/node/list/id", {}, { method: "get" });
  return res?.data?.list || [];
};
