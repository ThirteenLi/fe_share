import { useRequest } from "ahooks";
import { useNavigate } from "react-router";
import { useAtom, useAtomValue } from "jotai";
import { atomWithLocation } from "jotai-location";
import cls from "classnames";
import { useState, useEffect } from "react";
import { getCmd, getNodeList, deleteNode, NodeItem } from "~/services";
import { TextWithTooltip, TextWithCheck, Button, Confirm, Message } from "~/components";
import { userAtom, balanceAtom } from "~/atom";
import { MIN_BANDWIDTH } from "../constants";
import ServiceNodeActiveUi from "./ui";

const locationAtom = atomWithLocation();

const getFilterFromSearch = (searchParams: URLSearchParams) => {
  const pageIndex = Number(searchParams.get("pageIndex") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  return { pageIndex, pageSize };
};

export default function ServiceNodeActive() {
  // const user = useAtomValue(userAtom);
  // const balance = useAtomValue(balanceAtom);
  // const navigate = useNavigate();

  // const [gas, setGas] = useState(0);

  // const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  // const [loc, setLoc] = useAtom(locationAtom);
  // const filter = getFilterFromSearch(loc.searchParams);
  // const [localResults, setLocalResults] = useState<NodeItem[]>([]);
  // const { data: cmd = "" } = useRequest(() => getCmd(), {
  //   onError: (err) => {
  //     Message({ content: err?.message, type: "error" });
  //   },
  // });
  // const { data: nodeListData = { results: [], total: 0 }, refresh } = useRequest(
  //   () => getNodeList({ ...filter, status: [0] }),
  //   {
  //     refreshDeps: [JSON.stringify(filter)],
  //     pollingInterval: 3000,
  //     onError: (err) => {
  //       Message({ content: err?.message, type: "error" });
  //     },
  //   },
  // );
  // const { results, total } = nodeListData;

  // const getServiceNodes = () => {
  //   const map = new Map();
  //   const arr = [...results, ...localResults]
  //     .filter((v) => !map.has(v.id) && map.set(v.id, 1))
  //     .filter(({ id }) => selectedRowKeys.indexOf(id) > -1)
  //     .map(({ url, loc, bandwidth, account }) => {
  //       return {
  //         url: url || "url",
  //         netOperator: "netOperator",
  //         bandWidth: changeByte(Number(bandwidth)),
  //         serviceNodeAddr: account?.nodeAddr,
  //         addrInfo: loc,
  //       };
  //     });
  //   return arr;
  // };

  // const { runAsync: runDeleteNode } = useRequest((id) => deleteNode({ id }), {
  //   manual: true,
  //   onSuccess: () => {
  //     Message("Delete successfully");
  //     refresh();
  //   },
  //   onError: (err) => {
  //     Message({ content: "Delete failed" + err?.message || "", type: "error" });
  //   },
  // });

  // const changeFilter = (key: string, value: any) => {
  //   setLoc((prev) => {
  //     const prevParams = getFilterFromSearch(prev.searchParams);
  //     prevParams[key] = value || "";
  //     if (key !== "pageIndex") {
  //       prevParams.pageIndex = 1;
  //     } else if (key === "pageIndex" && selectedRowKeys.length > 0) {
  //       setLocalResults((prev) => {
  //         const saveList = results.filter(({ id }) => selectedRowKeys.indexOf(id) > -1);
  //         return [...prev, ...saveList];
  //       });
  //     }
  //     const arr: any = Object.entries(prevParams).filter(([_, value]) => !!value);
  //     return {
  //       ...prev,
  //       searchParams: new URLSearchParams(arr),
  //     };
  //   });
  // };

  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     fixed: "left" as const,
  //     width: 100,
  //   },
  //   {
  //     title: (
  //       <TextWithTooltip content="Measured by Capell. Feel free to delete and redeploy for a more accurate test">
  //         Bandwidth
  //       </TextWithTooltip>
  //     ),
  //     dataIndex: "bandwidth",
  //     width: 140,
  //     render: (t) => (
  //       <TextWithCheck errorText="Does not meet the minimum standards" error={Number(t) < MIN_BANDWIDTH}>
  //         {changeByte(Number(t) || 0)}
  //       </TextWithCheck>
  //     ),
  //   },
  //   {
  //     title: "Location",
  //     dataIndex: "loc",
  //     width: 193,
  //     render: (t) => (
  //       <TextWithCheck errorText="Only nodes in Vietnam are supported" error={t !== "Vietnam"}>
  //         {t || "-"}
  //       </TextWithCheck>
  //     ),
  //   },
  //   {
  //     title: <TextWithTooltip content="Capell's allocation (Your node's CPU cores) ">CPU</TextWithTooltip>,
  //     dataIndex: "cpu",
  //     width: 193,
  //     placeholder: "-",
  //     render: (t, r) => {
  //       const { quota = 0, total = 0 } = t || {};
  //       return (
  //         <TextWithCheck errorText="Does not meet the minimum standards" error={!quota && quota >= total}>
  //           <span>{quota} core&nbsp;</span>
  //           <span className={cls(quota > 0 && quota < total && "text-text-3")}>({total} core)</span>
  //         </TextWithCheck>
  //       );
  //     },
  //   },
  //   {
  //     title: <TextWithTooltip content="Capell's allocation (Your node's disk space) ">Disk</TextWithTooltip>,
  //     dataIndex: "disk",
  //     width: 193,
  //     placeholder: "-",
  //     render: (t) => {
  //       const { quota = 0, free = 0 } = t || {};
  //       return (
  //         <TextWithCheck errorText="Does not meet the minimum standards" error={!quota || quota >= free}>
  //           <span>{getfilesizeFromMB(quota, "T")}&nbsp;</span>
  //           <span className={cls(quota > 0 && quota < free && "text-text-3")}>({getfilesizeFromMB(free, "T")})</span>
  //         </TextWithCheck>
  //       );
  //     },
  //   },
  //   {
  //     title: <TextWithTooltip content="Capell's allocation (Your node's memory)">Memory</TextWithTooltip>,
  //     dataIndex: "memery",
  //     width: 193,
  //     placeholder: "-",
  //     render: (t) => {
  //       const { quota = 0, total = 0 } = t || {};
  //       return (
  //         <TextWithCheck errorText="Does not meet the minimum standards" error={!quota || quota >= total}>
  //           <span>{getfilesizeFromMB(quota)}&nbsp;</span>
  //           <span className={cls(quota > 0 && quota < total && "text-text-3")}>({getfilesizeFromMB(total)})</span>
  //         </TextWithCheck>
  //       );
  //     },
  //   },
  //   {
  //     title: "Actions",
  //     dataIndex: "op",
  //     fixed: "right" as const,
  //     width: 193,
  //     render: (_, r) => {
  //       const { bandwidth, loc, cpu, disk, memery, id } = r || {};
  //       const activable =
  //         Number(bandwidth) >= MIN_BANDWIDTH &&
  //         loc === "Vietnam" &&
  //         cpu?.quota &&
  //         cpu?.quota < cpu?.total &&
  //         disk?.quota &&
  //         disk?.quota < disk?.free &&
  //         memery?.quota &&
  //         memery?.quota < memery?.total;
  //       return (
  //         <div className="flex items-center gap-6">
  //           <Button
  //             disabled={!activable}
  //             type="link"
  //             onClick={() => {
  //               activeNodes(id);
  //             }}
  //           >
  //             List
  //           </Button>
  //           <Button
  //             type="text"
  //             onClick={() => {
  //               Confirm({
  //                 title: "Are you sure you want to delete this node?",
  //                 onOk: (close) => {
  //                   runDeleteNode(r.id).then(() => {
  //                     close();
  //                   });
  //                 },
  //               });
  //             }}
  //           >
  //             Delete
  //           </Button>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  // const checkItemActivable = (item: NodeItem) => {
  //   const { bandwidth, loc, cpu, disk, memery } = item;
  //   return (
  //     Number(bandwidth) >= MIN_BANDWIDTH &&
  //     loc === "Vietnam" &&
  //     cpu?.quota &&
  //     cpu?.quota < cpu?.total &&
  //     disk?.quota &&
  //     disk?.quota < disk?.free &&
  //     memery?.quota &&
  //     memery?.quota < memery?.total
  //   );
  // };
  // const changeSelectedRowKeys = (_, selectedRows: NodeItem[]) => {
  //   const correctKeys = selectedRows.filter((item) => checkItemActivable(item)).map(({ id }) => id);
  //   setSelectedRowKeys(correctKeys);
  // };

  // const goBack = () => {
  //   navigate("/service", { replace: true });
  // };

  // const getUpChainParams = (id?: number) => {
  //   return {
  //     checkType: "capellchain.servicenode.v1.EventRegisterServiceNode",
  //     typeUrl: "/capellchain.servicenode.v1.MsgRegisServiceNode",
  //     value: {
  //       serviceNodes: id
  //         ? results
  //             .filter((item) => item.id === id)
  //             .map(({ url, loc, bandwidth, account }) => {
  //               return {
  //                 url: url || "url",
  //                 netOperator: "netOperator",
  //                 bandWidth: changeByte(Number(bandwidth)),
  //                 serviceNodeAddr: account?.nodeAddr,
  //                 addrInfo: loc,
  //               };
  //             })
  //         : getServiceNodes(),
  //       creator: user.address,
  //     },
  //     clientFunc: sendMsgRegisServiceNode,
  //   };
  // };

  // const activeNodes = async (id?: number) => {
  //   try {
  //     const params = getUpChainParams(id);
  //     const res = await upChain(params);
  //     await notify({
  //       hash: res.transactionHash,
  //     });
  //     Message({
  //       content: `Success: ${res?.eventCode?.success} Fail: ${res?.eventCode.fail}`,
  //       duration: 1000,
  //       onClose: () => {
  //         goBack();
  //       },
  //     });
  //   } catch (err) {
  //     Message({ content: err.message || `active failed`, type: "error" });
  //   } finally {
  //     setGas(0);
  //   }
  // };

  // const getGas = async () => {
  //   const params = getUpChainParams();
  //   try {
  //     const res = await upChain({ ...params, onlyGas: true });
  //     if (res) {
  //       setGas(res);
  //     }
  //   } catch (e) {
  //     Message({ content: e?.message, type: "error" });
  //   }
  // };
  // useEffect(() => {
  //   if (selectedRowKeys?.length && balance) {
  //     getGas();
  //   } else {
  //     setGas(0);
  //   }
  // }, [selectedRowKeys?.length, balance]);

  // return (
  //   <ServiceNodeActiveUi
  //     columns={columns}
  //     cmd={cmd}
  //     results={results}
  //     total={total}
  //     changeFilter={changeFilter}
  //     filter={filter}
  //     refresh={refresh}
  //     changeSelectedRowKeys={changeSelectedRowKeys}
  //     selectedRowKeys={selectedRowKeys}
  //     gas={gas}
  //     balance={balance}
  //     activeNodes={activeNodes}
  //     checkItemActivable={checkItemActivable}
  //   />
  // );
  return (
    <div>
      <p>123</p>
    </div>
  );
}
