import { useAtomValue, useAtom } from "jotai";
import dayjs from "dayjs";
import BigNumber from "bignumber.js";
import { Button, Table, RangePicker, Chart, Select } from "~/components";
import { balanceAtom } from "~/atom";
import { ReactComponent as SvgSearch } from "~/assets/ic_input_search.svg";
import { ReactComponent as SvgCover } from "~/assets/ic_fund_cover.svg";
import { ReactComponent as SvgCoverII } from "~/assets/ic_fund_coverII.svg";
import { formatGasOrBalance } from "~/utils/gas";
import { transTypeAtom } from "~/atom";
import { TableColumnProps, Tag } from "@arco-design/web-react";
import { FundItem } from "~/services";
import { TRANSACTION_TYPE } from "./constants";
import { useBalance, useAccount } from "wagmi";
import { formatEth } from "~/utils";

interface FundProps {
  filter: {
    edgeServer: string[];
    startTime: number;
    endTime: number;
  };
  charts: { list: { x: number; y: string | number }[]; defaultList: { x: number; y: string | number }[] };
  changeTimeRange: (range: [number, number]) => void;
  columns: TableColumnProps[];
  list: FundItem[];
  next: number;
  yesterdayValue: number;
  nodeIds: string[];
  changeNodeIds: (nodeIds: string[]) => void;
  getList: () => void;
}
export default function FundUi({
  filter,
  changeTimeRange,
  charts = { list: [], defaultList: [] },
  columns,
  list,
  next,
  yesterdayValue,
  getList,
  nodeIds,
  changeNodeIds,
}: FundProps) {
  const [_, setTransType] = useAtom(transTypeAtom);
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const timeRange: [number, number] = [filter.startTime, filter.endTime];

  const tooltipOptions = {
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
            <span class="text-14-22 font-400 text-text-1 mr-auto">Node Earning</span>
            <span class="text-16-24 font-500 text-text-1">${data} ETH</span>
          </div>
        </div>
        `;
    },
  };

  return (
    <div className="mx-[60px] flex flex-col pt-4 pb-8 min-h-full gap-4">
      <div className="flex items-center h-[394px] gap-6">
        <div className="bg-fill-1 flex-1 h-full rounded-4sm pt-6 px-6 pb-6">
          <div className="h-[42px] flex items-center justify-between">
            <p className="font-600 text-20-28 text-text-1">Node Earning</p>
            <div className="flex items-center gap-4">
              <Select
                maxTagCount={2}
                allowClear
                icon="iconSearch"
                arrowIcon={<SvgSearch />}
                placeholder="Node ID"
                mode="multiple"
                renderTag={({ value, label }) => (
                  <Tag color="gray" key={value} className="mr-1" size="small">
                    {(label as string).slice(0, 6) + "..."}
                  </Tag>
                )}
                options={(nodeIds || []).map((id) => ({ label: id, value: id }))}
                value={filter.edgeServer}
                onChange={(val) => {
                  changeNodeIds(val);
                }}
              />
              <RangePicker
                allowClear={false}
                format="MM/DD/YYYY"
                utcOffset={0}
                value={timeRange.map((t) => t * 1000)}
                onChange={(_, value) => {
                  const ctStart = value[0]?.unix();
                  const ctEnd = value[1]?.endOf("day")?.unix();
                  changeTimeRange([ctStart, ctEnd]);
                }}
              />
            </div>
          </div>
          <Chart data={charts} tooltipOptions={tooltipOptions} yFormatter={(val) => `${val} ETH`} />
        </div>
        <div className="bg-fill-1 flex-1 h-full rounded-4sm pt-6 px-6 pb-8 flex flex-col shrink-0">
          <div className="flex items-center pt-2 pb-6 gap-y-4">
            <p className="font-600 text-20-28 mr-auto">ETH Balance</p>
            {/* <Button
              className="mr-4"
              type="primary"
              onClick={() => {
                setTransType("withdraw");
              }}
            >
              Withdraw From Balance
            </Button>
            <Button
              type="main"
              onClick={() => {
                setTransType("recharge");
              }}
            >
              Add Balance
            </Button> */}
          </div>
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-fundWusd flex-1 h-full rounded-3sm pt-10 px-8 relative">
              <p className="font-500 text-14-22 text-text-3 mb-4">ETH Total Balance</p>
              <div className="flex items-center gap-2">
                <span className="font-600 text-[28px] leading-10">{BigNumber(balance?.formatted).toFixed(4)}</span>
                <span className="text-12-20 font-500">ETH</span>
              </div>
              <SvgCover className="absolute right-2 bottom-2" />
            </div>
            <div className="bg-fundYesterday flex-1 h-full rounded-3sm pt-10 px-8 relative">
              <p className="font-500 text-14-22 text-text-3 mb-4">ETH Earning Yesteray</p>
              <div className="flex items-center gap-2">
                <span className="font-600 text-[28px] leading-10">{formatEth(yesterdayValue)}</span>
                <span className="text-12-20 font-500">ETH</span>
              </div>
              <SvgCoverII className="absolute right-2 bottom-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-4sm bg-fill-1 flex-1 p-6">
        <div className="flex items-center justify-between pb-4">
          <p className="text-20-28 font-600">ETH Balance Changes</p>
          {/* <Select
            icon="iconFilter"
            placeholder="Transaction Type"
            allowClear
            maxTagCount={3}
            options={TRANSACTION_TYPE}
            mode="multiple"
            value={listFilter.types}
            onChange={(val) => {
              changeFilter("types", val);
            }}
          /> */}
        </div>
        <Table
          columns={columns}
          data={list}
          rowKey="id"
          border={false}
          scroll={{
            x:
              !!list?.length &&
              columns.map(({ width }) => Number(width) || 160).reduce((item, current) => current + item, 0),
          }}
          pagination={false}
        />
        {!!next && (
          <div className="w-full flex items-center justify-end gap-4">
            <Button className="underline" type="text" onClick={getList}>
              Show More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
