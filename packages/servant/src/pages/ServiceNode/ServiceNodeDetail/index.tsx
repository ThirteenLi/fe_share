import { useParams, useNavigate } from "react-router";
import { useRequest } from "ahooks";
import { useAtom, useAtomValue } from "jotai";
import cls from "classnames";
import dayjs from "dayjs";
import { useState } from "react";
import { atomWithLocation } from "jotai-location";
import { Message, Button, Confirm, Input, Modal, TextWithTooltip } from "~/components";
import { getNodeDetail, getOrderList, getTrafficStatistic, getExportCsv, updateServiceNode } from "~/services";
import { userAtom, loadingAtom } from "~/atom";
import ServiceNodeDetailUi from "./ui";
import { ORDER_STATUS } from "../constants";
import { formatGasOrBalance } from "~/utils/gas";
import { formatAddr } from "~/utils";
import { useAccount } from "wagmi";

const locationAtom = atomWithLocation();

const getFilterFromSearch = (searchParams: URLSearchParams) => {
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  return { page, pageSize };
};

export default function ServiceNodeDetail() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { id } = useParams();
  const [loading, setLoading] = useAtom(loadingAtom);

  const [loc, setLoc] = useAtom(locationAtom);
  const [visible, setVisible] = useState(false);
  const orderFilter = getFilterFromSearch(loc.searchParams);
  const [timeFilter, setTimeFilter] = useState({
    startTime: dayjs().subtract(10, "day").startOf("day").unix(),
    endTime: dayjs().endOf("day").unix(),
  });
  const timeRange: [number, number] = [timeFilter.startTime, timeFilter.endTime];

  const { data: detailData, refreshAsync: refreshNodeDetail } = useRequest(() => getNodeDetail({ edgeServer: id }), {
    pollingInterval: 5 * 60 * 1000,
    onError: (err) => {
      Message({ content: err?.message, type: "error" });
    },
  });

  const { data: statistic } = useRequest(() => getTrafficStatistic({ ...timeFilter, edgeServer: id, owner: address }), {
    refreshDeps: [JSON.stringify(timeFilter)],
    onError: (err) => {
      Message({ content: err?.message, type: "error" });
    },
  });
  console.log("statistic", statistic);

  const { data: orderData, refreshAsync: refreshOrderList } = useRequest(
    () => getOrderList({ edgeServer: id, ...orderFilter }),
    {
      refreshDeps: [JSON.stringify(orderFilter)],
      onError: (err) => {
        Message({ content: err?.message, type: "error" });
      },
    },
  );
  console.log("orderData", orderData);
  // const { results = [], total = 0 } = orderData || {};

  // const { runAsync: updateNode } = useRequest(
  //   () => updateServiceNode({ id: paramsId, name: editName, loc: detailData.loc }),
  //   {
  //     manual: true,
  //     onSuccess: () => {
  //       refreshNodeDetail();
  //       Message("Update Successful");
  //       setEditName("");
  //     },
  //     onError: (err) => {
  //       Message({ content: err?.message, type: "error" });
  //     },
  //   },
  // );

  // const { run: runExportCsv } = useRequest(() => getExportCsv(paramsId), {
  //   manual: true,
  //   onSuccess: (res) => {
  //     console.log("res", res);
  //   },
  //   onError: (err) => {
  //     Message({ content: err?.message, type: "error" });
  //   },
  // });

  const changeOrderFilter = (key: string, value: any) => {
    setLoc((prev) => {
      const prevParams = getFilterFromSearch(prev.searchParams);
      prevParams[key] = value || "";
      if (key !== "page") {
        prevParams.page = 1;
      }
      const arr: any = Object.entries(prevParams).filter(([_, value]) => !!value);
      return {
        ...prev,
        searchParams: new URLSearchParams(arr),
      };
    });
  };

  const changeTimeRange = (rangeValue: [number, number]) => {
    setTimeFilter({ startTime: rangeValue[0], endTime: rangeValue[1] });
  };

  // const stopService = async ({ chainOrderId, customerId }: { chainOrderId: string; customerId: string }) => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const params = {
  //       typeUrl: "/capellchain.order.v1.MsgStopOrders",
  //       checkType: "capellchain.order.v1.EventStopOrder",
  //       value: {
  //         creator: user.address,
  //         orderIds: [chainOrderId],
  //         bandwidthBuyerId: customerId,
  //       },
  //       clientFunc: sendMsgStopOrders,
  //     };
  //     const res = await upChain(params);
  //     notify({
  //       hash: res.transactionHash,
  //     });
  //     Message("Stop service Successful");
  //   } catch (err) {
  //     Message({ content: err.message, type: "error" });
  //   } finally {
  //     await refreshOrderList();
  //     setLoading(false);
  //   }
  // };

  const columns = [
    {
      title: "Contract",
      dataIndex: "id",
      placeholder: "-",
      fixed: "left" as const,
      width: 120,
      render: (t) => formatAddr(t),
    },
    {
      title: "Customer Name",
      dataIndex: "purchaseContract",
      placeholder: "-",
      width: 150,
      render: (t) => formatAddr(t),
    },
    {
      title: "Contract status",
      dataIndex: "status",
      placeholder: "-",
      width: 140,
      render: (t) => {
        const target = ORDER_STATUS.find(({ value }) => value === t);
        return (
          <div className="flex items-center gap-2">
            <div className={cls(target?.color, "w-[6px] h-[6px] rounded-full")}></div>
            <span className="text-text-1 text-14-22">{target?.label}</span>
          </div>
        );
      },
    },
    {
      title: "Order Date",
      dataIndex: "startTime",
      width: 180,
      render: (t) => dayjs.unix(Number(t)).utc().format("MM/DD/YYYY HH:mm:ss"),
    },
    {
      title: "End Date",
      dataIndex: "endTime",
      width: 180,
      render: (t, r) => (r.status === 1 ? "-" : dayjs.unix(Number(t)).utc().format("MM/DD/YYYY HH:mm:ss")),
    },
    {
      title: "Settled Amount",
      dataIndex: "settled",
      width: 160,
      render: (t) => t + " ETH",
    },
    // {
    //   title: "Actions",
    //   dataIndex: "op",
    //   width: 160,
    //   fixed: "right" as const,
    //   render: (_, r) => {
    //     return r.orderStatus === 1 ? (
    //       <Button
    //         type="link"
    //         onClick={() => {
    //           Confirm({
    //             onOk: async (close) => {
    //               // await stopService({ chainOrderId: r.chainOrderId, customerId: r.customerId });
    //               close();
    //             },
    //             title: "Stop Service",
    //             content: "Are you sure you want to stop the service ?",
    //           });
    //         }}
    //       >
    //         Stop Service
    //       </Button>
    //     ) : (
    //       "-"
    //     );
    //   },
    // },
  ];

  return (
    <ServiceNodeDetailUi
      statistic={statistic}
      // runExportCsv={runExportCsv}
      tableData={orderData?.list || []}
      total={orderData?.total || 0}
      id={id}
      columns={columns}
      detailData={detailData}
      orderFilter={orderFilter}
      changeOrderFilter={changeOrderFilter}
      timeRange={timeRange}
      changeTimeRange={changeTimeRange}
    >
      {/* <Modal
        visible={visible}
        okButtonProps={{ disabled: !editName }}
        onOk={async () => {
          await updateNode();
        }}
        close={() => {
          setVisible(false);
        }}
      >
        <Input
          value={editName}
          className="w-[360px]"
          placeholder="Hostname"
          onChange={(value) => {
            setEditName(value);
          }}
        />
      </Modal> */}
    </ServiceNodeDetailUi>
  );
}
