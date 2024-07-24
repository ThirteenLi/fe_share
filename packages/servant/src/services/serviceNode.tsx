import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { query } from "~/utils";

export const getActivatableCount = async () => {
  const res = await query(
    "/api/node/count",
    {},
    {
      method: "get",
      params: {
        status: 0,
      },
    },
  );
  return Number(res?.data?.count) || 0;
};

export type NodeItem = {
  id: string;
  coordinator: string;
  detail: string;
  earnings: string;
  height: string;
  owner: number;
  txHash: string;
  inOrder: boolean;
  isOnline: boolean;
  listTime: string;
  cpu?: {
    core: number;
    arch: string;
  };
  disk?: {
    free: number;
    total: number;
  };
  memory: number;
  platform: string;
  bandwidth: string;
  traffic: {
    consumed: string;
    from: string;
    to: string;
  };
};

export const getNodeList = async (params?: {
  inOrder: number;
  isOnline?: number;
  page: number;
  pageSize: number;
  owner: string;
}) => {
  const { pageSize, page, isOnline = 0, inOrder = 0, owner = "" } = params;
  const res = await query<{ data: { list: NodeItem[]; total: number } }>("/gateway/edge_server/v1/list", {
    pageSize: String(pageSize),
    page: String(page - 1),
    isOnline: String(isOnline),
    inOrder: String(inOrder),
    owner: owner.toLowerCase(),
  });
  const list = (res?.data?.data?.list || []).map((item) => {
    let params = { ...item };
    try {
      const detail = JSON.parse(item.detail);
      params = {
        ...item,
        ...detail,
      };
    } catch {
      params = { ...item };
    }
    return params;
  });
  return { list, total: Number(res?.data?.data?.total) || 0 };
};

export const getCmd = async () => {
  const res = await query(
    "/api/node/init/cmd",
    {},
    {
      method: "get",
    },
  );
  return res?.data?.cmd || "";
};

export const deleteNode = async (params: { id: string }) => {
  const res = await query("/api/node/delete", params, {
    method: "post",
  });
  return res.data;
};

export const getNodeDetail = async (params?: { edgeServer: string }) => {
  return query<{ data: NodeItem }>("/gateway/edge_server/v1/detail", params).then((res) => {
    let result = res?.data?.data;
    try {
      const detail = JSON.parse(result.detail);
      result = {
        ...result,
        ...detail,
      };
    } catch {
      result = { ...result };
    }
    return result;
  });
};

export type OrderItem = {
  bandwidth: string;
  chainNodeId: string;
  chainOrderId: string;
  closedUnix: string;
  contractUnix: string;
  country: string;
  createdUnix: string;
  customerId: string;
  cycleDay: number;
  depositStatus: number;
  depositUnlockUnix: string;
  duration: string;
  id: string;
  maxSettleDiff: number;
  nodeBandwidth: string;
  nodeCountry: string;
  nodeDisk: string;
  nodeId: string;
  nodeMemory: string;
  nodeProvince: string;
  nodeSettleTotalAmount: string;
  nodeSn: string;
  nodeTotalAmount: string;
  province: string;
  settleTotalAmount: string;
  staking: string;
  orderStatus: number;
  nodeCpu: number;
  settleStatus: number;
};

export const getOrderList = async (params: { edgeServer: string; page: number; pageSize: number }) => {
  const res = await query<{ data: { list: OrderItem[]; total: string } }>(
    "/gateway/purchase_order/v1/list",
    { ...params, page: String(params.page - 1), pageSize: String(params.pageSize) },
    {
      method: "post",
    },
  );
  return { list: res?.data?.data?.list || [], total: Number(res?.data?.data?.total) || 0 };
};

export const getTrafficStatistic = async (params?: {
  startTime?: number;
  endTime?: number;
  edgeServer: string;
  owner: string;
}) => {
  const {
    startTime = dayjs().subtract(10, "day").startOf("day").unix(),
    endTime = dayjs().endOf("day").unix(),
    edgeServer,
    ...rest
  } = params || {};
  let emptyX: number[] = [];
  let diff = dayjs.unix(endTime).startOf("day").diff(dayjs.unix(startTime).startOf("day"), "day");
  let n = 0;
  while (n <= diff) {
    emptyX.push(dayjs.unix(startTime).add(n, "day").unix());
    n += 1;
  }
  const res = await query<{ data: { list: { x: string; proofOnlineNums: string; allProofOnlineNums: string }[] } }>(
    "/gateway/proof_online/v1/percentage",
    {
      ...rest,
      from: String(startTime),
      to: String(endTime),
      edgeServer,
    },
  );
  const list = (res?.data?.data?.list || []).map(({ x, proofOnlineNums, allProofOnlineNums }) => ({
    x: Number(x),
    y: ((Number(proofOnlineNums) / Number(allProofOnlineNums)) * 100).toFixed(2),
  }));
  const defaultList = emptyX.map((x, i) => ({ x, y: i === 0 ? 100 : 0 }));
  return { list, defaultList };
};

export const getExportCsv = async (nodeId: string) => {
  const res = await query(
    "/api/trans/order/export_csv",
    {},
    {
      method: "get",
      params: { nodeId },
    },
  ).then((response) => {
    const blob = new Blob([atob(response.data.body)], { type: "text/csv" });
    saveAs(blob, response.data.name || "filename.csv");
  });
  return res;
};

export const updateServiceNode = async (params: { id: string; name: string; loc: string }) => {
  const res = await query("/api/node/update", params, {
    method: "post",
  });
  return res;
};
