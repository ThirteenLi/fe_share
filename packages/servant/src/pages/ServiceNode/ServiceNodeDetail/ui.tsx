import cls from "classnames";
import dayjs from "dayjs";
import { ReactComponent as SvgCopy } from "~/assets/ic_wallet_copy.svg";
import { ReactNode } from "react";
import { TableColumnProps } from "@arco-design/web-react";
import { Breadcrumb, Button, TextWithTooltip, Table, Confirm, RangePicker, Chart } from "~/components";
import { ReactComponent as SvgExport } from "~/assets/ic_export.svg";
import { ReactComponent as SvgOnline } from "~/assets/ic_online.svg";
import { ReactComponent as SvgService } from "~/assets/ic_service.svg";
import { ReactComponent as SvgBandwidth } from "~/assets/ic_bandwidth.svg";
import { ReactComponent as SvgEdit } from "~/assets/ic_edit.svg";
import { NodeItem, OrderItem, getExportCsv } from "~/services";
import { formatGasOrBalance } from "~/utils/gas";
import { INORDER_STATUS, ONLINE_STATUS } from "../constants";
import { convertBandWidth, convertBytesToGB, copyText, formatAddr, unixToTime } from "~/utils";

interface ServiceNodeDetailUiProps {
  id: string;
  detailData: Partial<NodeItem>;
  changeOrderFilter: (key: string, value: any) => void;
  orderFilter: {
    page: number;
    pageSize: number;
  };
  columns: TableColumnProps[];
  tableData: OrderItem[];
  total: number;
  timeRange: [number, number];
  changeTimeRange: (range: [number, number]) => void;
  statistic: { list: { x: number; y: string | number }[]; defaultList: { x: number; y: string | number }[] };
  children?: ReactNode;
}

export default function ServiceNodeDetailUi({
  id,
  detailData,
  columns,
  tableData,
  orderFilter,
  total,
  changeOrderFilter,
  changeTimeRange,
  timeRange,
  statistic,
  children,
}: ServiceNodeDetailUiProps) {
  const endHour = dayjs().utc().startOf("hour").format("hh:mm A");
  const startDay = dayjs().utc().subtract(1, "hour").startOf("hour");
  const startHour = startDay.format("hh:mm A");
  const date = startDay.format("MM/DD");

  const renderCards = () => {
    if (!detailData) {
      return null;
    }
    const { isOnline, bandwidth, inOrder } = detailData;
    const onlineTarget = ONLINE_STATUS.find(({ value }) => value > 0 === isOnline);
    const statusTarget = INORDER_STATUS.find(({ value }) => value > 0 === inOrder);

    const datas = [
      {
        title: "Online Status",
        icon: <SvgOnline />,
        value: (
          <div className="flex items-center gap-1">
            <div className={cls(onlineTarget?.color, "w-[6px] h-[6px] rounded-full")}></div>
            <span className="text-16-24 font-500">{onlineTarget?.label}</span>
          </div>
        ),
      },
      {
        title: "Service Status",
        icon: <SvgService />,
        value: (
          <div className="flex items-center gap-1">
            <div className={cls(statusTarget?.circle, "w-[6px] h-[6px] rounded-full")}></div>
            <span className="text-16-24 font-500">{statusTarget?.label}</span>
          </div>
        ),
      },
      {
        title: <TextWithTooltip content="Value obtained from the latest speed test">Bandwidth</TextWithTooltip>,
        icon: <SvgBandwidth />,
        value: (
          <div className="flex items-center gap-1">
            <span className="text-16-24 font-500">{inOrder ? "-" : convertBandWidth(bandwidth)}</span>
          </div>
        ),
      },
    ];
    return datas.map(({ title, icon, value }, index) => {
      return (
        <div className="flex items-center flex-1 h-[82px] bg-fill-2 rounded-3sm pl-4 gap-3" key={index}>
          <div className="shrink-0">{icon}</div>
          <div>
            <div className="mb-[2px] text-12-20 text-text-3 font-500 whitespace-nowrap">{title}</div>
            {value}
          </div>
        </div>
      );
    });
  };

  const renderInfos = () => {
    if (!detailData) {
      return null;
    }
    const { memory, cpu, disk, listTime, earnings } = detailData;
    const data = [
      {
        title: "Earnings",
        value: earnings,
      },
      {
        title: "Memory",
        value: <div>{convertBytesToGB(memory)}</div>,
      },
      {
        title: "CPU",
        value: (
          <div>
            <span>{cpu?.core} core&nbsp;</span>
            {/* <span className="text-text-3">({cpu?.arch})</span> */}
          </div>
        ),
      },
      {
        title: "Listing time",
        value: dayjs.unix(Number(listTime)).utc().format("MM/DD/YYYY"),
      },
      {
        title: "Disk",
        value: (
          <div>
            <span>{convertBytesToGB(disk?.free)}&nbsp;</span>
            {/* <span className="text-text-3">({convertBytesToGB(disk?.total)})</span> */}
          </div>
        ),
      },
    ];
    return data.map(({ title, value }, index) => (
      <div className="flex items-center w-[50%] text-14-22 text-text-3 py-[6px]" key={index}>
        <div className="w-[76px]">{title}</div>
        <div className="w-[14px]">:</div>
        <div className="font-500 text-text-1">{value}</div>
      </div>
    ));
  };

  return (
    <div className="mx-[60px] flex flex-col pb-6">
      <Breadcrumb
      // right={
      //   <Button className="border-border-2 hover:border-text-4" onClick={() => {}}>
      //     <SvgExport />
      //     Export Logs
      //   </Button>
      // }
      />
      <div className="flex items-center gap-6 h-[418px] mb-4">
        <div className="bg-fill-1 flex-1 h-full rounded-4sm pt-6 px-6 pb-8 flex flex-col">
          <div className="flex flex-col h-[80px] gap-1 pt-2">
            <p className="text-20-28 font-600">Node ID:</p>
            <div className="font-400 text-14-22 flex items-center gap-1">
              {id}
              <SvgCopy
                className="text-text-3 cursor-pointer"
                onClick={() => {
                  copyText(id);
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">{renderCards()}</div>
          {detailData?.inOrder && (
            <div className="pt-4 pb-2">
              <div className="bg-success-5 rounded-md text-14-22 font-500 py-[7px] px-[10px]">
                {`From ${unixToTime(detailData.traffic?.from, "YYYY-M-D HH:mm:ss")} to ${unixToTime(
                  detailData?.traffic?.to,
                  "YYYY-M-D HH:mm:ss (UTC)",
                )}, `}
                <span className="text-success-1"> {convertBytesToGB(detailData?.traffic?.consumed)}</span> of data was
                consumed.
              </div>
            </div>
          )}
          <div className="mt-6 flex flex-wrap">{renderInfos()}</div>
        </div>
        <div className="bg-fill-1 flex-1 h-full rounded-4sm pt-6 px-6 pb-6">
          <div className="h-[42px] flex items-center justify-between">
            <p className="font-600 text-20-28 text-text-1">Online Percentage</p>
            <RangePicker
              allowClear={false}
              format="MM/DD/YYYY"
              utcOffset={0}
              value={timeRange.map((t) => t * 1000)}
              onChange={(_, value) => {
                const ctStart = value[0]?.unix();
                const ctEnd = value[1]?.endOf("day").unix();
                changeTimeRange([ctStart, ctEnd]);
              }}
            />
          </div>
          <Chart
            tooltipOptions={{
              trigger: "axis",
              padding: 0,
              extraCssText: "box-shadow: none; border: none",
              backgroundColor: "#fff",
              formatter: (params) => {
                const { axisValue, data } = params[0];
                return `
              <div class="p-2 rounded-2sm shadow-chart bg-fill-1 h-[66px] w-[219px]">
                <p class="font-400 text-14-22 text-text-3 mb-1"><span>${dayjs
                  .unix(axisValue)
                  ?.utc()
                  .format("MM/DD/YYYY")}</span></p>
                <div class="flex items-center">
                  <div class="mr-2 rounded-[1px] h-1 w-3 bg-success-1"></div>
                  <span class="text-14-22 font-400 text-text-1 mr-auto">Online Percentage</span>
                  <span class="text-16-24 font-500 text-text-1">${data}%</span>
                </div>
              </div>
              `;
              },
            }}
            data={statistic}
            yFormatter={(value) => {
              return `${value}%`;
            }}
          />
        </div>
      </div>
      <div className="rounded-4sm bg-fill-1 px-6 pt-6 pb-4">
        <p className="text-text-1 font-600 text-20-28 mb-4">Node Contracts</p>
        <Table
          border={false}
          columns={columns}
          data={tableData}
          rowKey="id"
          scroll={{
            x: columns
              .filter(({ fixed }) => !!fixed)
              .map(({ width }) => Number(width) || 160)
              .reduce((item, current) => current + item, 0),
          }}
          pagination={{
            total,
            current: orderFilter.page,
            pageSize: orderFilter.pageSize,
            onChange: (current, pageSize) => {
              if (orderFilter.pageSize !== pageSize) {
                changeOrderFilter("pageSize", pageSize);
              } else {
                changeOrderFilter("pageIndex", current);
              }
            },
          }}
        />
      </div>
      {children}
    </div>
  );
}
