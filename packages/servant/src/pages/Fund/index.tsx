import dayjs from "dayjs";
import { useState } from "react";
import { useAtom } from "jotai";
import { Tooltip } from "@arco-design/web-react";
import { useRequest } from "ahooks";
import { atomWithLocation } from "jotai-location";
import { ReactComponent as SvgAddBalance } from "~/assets/ic_addbalance.svg";
import { ReactComponent as SvgCapell } from "~/assets/ic_coin_capell.svg";
import { Message, TextWithTooltip } from "~/components";
import { getFundCharts, getFundList, getNodeIds, getFundDetail } from "~/services";
import FundUi from "./ui";
import { TRANSACTION_TYPE } from "./constants";
import { formatGasOrBalance } from "~/utils/gas";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { formatAddr, unixToTime } from "~/utils";

export default function Fund() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [next, setNext] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    startTime: dayjs().subtract(10, "day").startOf("day").unix(),
    endTime: dayjs().endOf("day").unix(),
    edgeServer: [],
  });

  const { run: runGetList } = useRequest(() => getFundList({ owner: address, next }), {
    refreshDeps: [address],
    onSuccess: (res) => {
      setNext(res?.next || 0);
      setList((prev) => [...prev, ...(res.list || [])]);
    },
    onError: (err) => {
      Message({ content: err?.message, type: "error" });
    },
  });

  const { data: charts } = useRequest(() => getFundCharts({ ...filter, owner: address }), {
    refreshDeps: [JSON.stringify(filter), address],
    onError: (err) => {
      Message({ content: err?.message, type: "error" });
    },
  });

  const { data: detailInfo } = useRequest(
    () =>
      getFundDetail({
        owner: address,
      }),
    {
      onError: (err) => {
        Message({ content: err?.message, type: "error" });
      },
    },
  );
  const changeTimeRange = (rangeValue: [number, number]) => {
    setFilter((prev) => ({ ...prev, startTime: rangeValue[0], endTime: rangeValue[1] }));
  };

  const changeNodeIds = (nodeIds?: string[]) => {
    setFilter((prev) => ({ ...prev, edgeServer: nodeIds }));
  };

  const changeNext = (value: string) => {
    setNext(next);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "changeTime",
      width: 200,
      render: (t) => unixToTime(t),
    },
    {
      title: "Transactions",
      dataIndex: "earningType",
      width: 200,
      render: (t) => (
        <div className="flex items-center gap-1 justify-start">
          <SvgAddBalance />
          {TRANSACTION_TYPE.find(({ value }) => value === t)?.label || "-"}
        </div>
      ),
    },
    {
      title: "ETH Balance Changes",
      dataIndex: "balanceChange",
      width: 200,
      render: (t, r) => {
        return (
          <div className="flex items-center justify-between w-full">
            <SvgCapell />
            <span className="text-success-1 cursor-pointer">+{t}</span>
            {/* <Tooltip content={`‒ gas：${formatGasOrBalance(Number(r.gasFee) || 0)} wusd `}>
              {r.event === 14 ? (
                <span className="text-danger-1 cursor-pointer">-{formatGasOrBalance(t)}</span>
              ) : (
                <span className="text-success-1 cursor-pointer">+{formatGasOrBalance(t)}</span>
              )}
            </Tooltip> */}
          </div>
        );
      },
    },
    {
      title: "Node ID",
      dataIndex: "edgeServer",
      align: "center" as const,
      width: 160,
      render: (t) => (
        <TextWithTooltip content={t} showIcon={false}>
          {formatAddr(t)}
        </TextWithTooltip>
      ),
    },
    {
      title: "Contract",
      dataIndex: 'contract',
      align: "center" as const,
      width: 160,
      render: (t) => (
        <TextWithTooltip content={t} showIcon={false}>
          {formatAddr(t)}
        </TextWithTooltip>
      ),
    },
  ];

  return (
    <FundUi
      getList={() => {
        runGetList();
      }}
      nodeIds={detailInfo?.edgeServers || []}
      next={next}
      filter={filter}
      changeNodeIds={changeNodeIds}
      changeTimeRange={changeTimeRange}
      charts={charts}
      columns={columns}
      list={list}
      yesterdayValue={Number(detailInfo?.yestodayEarning) || 0}
    />
  );
}
