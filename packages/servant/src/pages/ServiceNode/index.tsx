import { useNavigate } from "react-router";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import cls from "classnames";
import { Tooltip } from "@arco-design/web-react";
import { atomWithLocation } from "jotai-location";
import dayjs from "dayjs";
import { Button, TextWithTooltip, Message } from "~/components";
import { ReactComponent as SvgSuccess } from "~/assets/ic_success.svg";
import { ReactComponent as SvgError } from "~/assets/ic_error.svg";
import { ReactComponent as SvgErrorGray } from "~/assets/ic_error_gray.svg";
import { formatGasOrBalance } from "~/utils/gas";
import { getNodeList } from "~/services";
import ServiceNodeUi from "./ui";
import { INORDER_STATUS } from "./constants";
import { formatAddr, convertBytesToGB, convertBandWidth, formatEth } from "~/utils";
import { platform } from "os";
import { useAccount } from "wagmi";

const locationAtom = atomWithLocation();

const getFilterFromSearch = (searchParams: URLSearchParams) => {
  const isOnline = Number(searchParams.get("isOnline")) || undefined;
  const inOrder = Number(searchParams.get("inOrder")) || undefined;
  const page = Number(searchParams.get("pageIndex") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  return { isOnline, inOrder, page, pageSize };
};

export default function ServiceNode() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [loc, setLoc] = useAtom(locationAtom);
  const filter = getFilterFromSearch(loc.searchParams);
  const { data: nodeListData = { list: [], total: 0 }, refresh: refreshNodeList } = useRequest(
    (params) => getNodeList({ ...filter, ...params, owner: address }),
    {
      refreshDeps: [JSON.stringify(filter), address],
      onError: (err) => {
        Message({ content: err?.message, type: "error" });
      },
    },
  );
  const { list, total } = nodeListData;

  const changeFilter = (key: string, value: any) => {
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      fixed: "left" as const,
      width: 140,
      render: (t) => <Tooltip content={t}>{formatAddr(t)}</Tooltip>,
    },
    {
      title: <div className="text-center">Online</div>,
      dataIndex: "isOnline",
      width: 100,
      render: (t) => {
        return <div className="flex justify-center">{t ? <SvgSuccess /> : <SvgError />}</div>;
      },
    },
    {
      title: "Service Status",
      dataIndex: "inOrder",
      width: 140,
      render: (t) => {
        const { label, circle } = INORDER_STATUS.find(({ value }) => value > 0 === t) || {};
        return (
          <div className="flex items-center gap-2">
            <div className={cls("w-[6px] h-[6px] rounded-full", circle)}></div>
            <p className={cls(t === 4 && "text-text-3")}>{label}</p>
          </div>
        );
      },
    },
    {
      title: <TextWithTooltip content="Value obtained from the latest speed test">Bandwidth</TextWithTooltip>,
      dataIndex: "bandwidth",
      width: 120,
      render: (t, r) => (r.inOrder ? "-" : convertBandWidth(t)),
    },
    // {
    //   title: "Location",
    //   dataIndex: "location",
    //   placeholder: "-",
    //   width: 120,
    // },
    {
      title: "Earnings",
      dataIndex: "earnings",
      width: 160,
      render: (t) => formatEth(t) + " ETH",
    },
    {
      title: "CPU",
      dataIndex: "cpu",
      width: 140,
      placeholder: "-",
      render: (t) => {
        if (!t) {
          return "-";
        }
        const { arch, core } = t || {};
        return (
          <div>
            <span>{core} core&nbsp;</span>
            {/* <span className="text-text-3">({arch})</span> */}
          </div>
        );
      },
    },
    {
      title: "Disk",
      dataIndex: "disk",
      width: 220,
      placeholder: "-",
      render: (t) => {
        const { total = 0, free = 0 } = t || {};
        return (
          <div>
            <span>{convertBytesToGB(free)}&nbsp;</span>
            {/* <span className="text-text-3">({convertBytesToGB(total)})</span> */}
          </div>
        );
      },
    },
    {
      title: "Memory",
      dataIndex: "memory",
      width: 140,
      placeholder: "-",
      render: (t) => (t ? convertBytesToGB(t) : "-"),
    },
    // {
    //   title: "Platform",
    //   dataIndex: "platform",
    //   width: 120,
    //   placeholder: "-",
    // },
    // {
    //   title: "List Time",
    //   dataIndex: "joinedAt",
    //   width: 120,
    //   render: (t) => (Number(t) ? dayjs.unix(t).utc().format("MM/DD/YYYY") : "-"),
    // },
    {
      title: "Actions",
      dataIndex: "op",
      fixed: "right" as const,
      width: 120,
      render: (_, r) => {
        return (
          <Button
            type="link"
            onClick={() => {
              navigate(`/service/detail/${r.id}`);
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <ServiceNodeUi
      filter={filter}
      changeFilter={changeFilter}
      columns={columns}
      total={total}
      list={list}
      refreshNodeList={refreshNodeList}
    />
  );
}
