import { Tabs, TableColumnProps, Tooltip } from "@arco-design/web-react";
import cls from "classnames";
import { useSetAtom } from "jotai";
import { transTypeAtom } from "~/atom";
import { ReactComponent as SvgCopy } from "~/assets/ic_copy.svg";
import { ReactComponent as SvgInfo } from "~/assets/ic_info.svg";
import { ReactComponent as SvgRefresh } from "~/assets/ic_refresh.svg";
import { ReactComponent as SvgActive } from "~/assets/ic_active.svg";
import { Button, Table, Breadcrumb } from "~/components";
import { NodeItem } from "~/services";
import { copyText } from "common/src/utils";
import { formatGasOrBalance } from "~/utils/gas";

const TabPane = Tabs.TabPane;

interface ServiceNodeActiveProps {
  cmd: string;
  results: NodeItem[];
  total: number;
  changeFilter: (key: string, value: any) => void;
  filter: {
    pageIndex: number;
    pageSize: number;
  };
  columns: TableColumnProps[];
  refresh: () => void;
  selectedRowKeys: number[];
  changeSelectedRowKeys: (selectedRowKeys: number[], selectedRows: NodeItem[]) => void;
  activeNodes: (arg?: number) => void;
  gas: number;
  balance: number;
  checkItemActivable: (item: NodeItem) => boolean;
}

export default function ServiceNodeActiveUi({
  cmd,
  columns,
  filter,
  results,
  total,
  refresh,
  changeFilter,
  selectedRowKeys,
  changeSelectedRowKeys,
  gas,
  balance,
  activeNodes,
  checkItemActivable,
}: ServiceNodeActiveProps) {
  const setTransType = useSetAtom(transTypeAtom);
  return (
    <div className={cls("mx-[60px] min-h-full flex flex-col", selectedRowKeys?.length ? "pb-[104px]" : "pb-6")}>
      <Breadcrumb />
      <div className="p-8 rounded-4sm bg-fill-1">
        <p className="font-600 text-24-32 mb-8">How to add nodes</p>
        <p className="text-16-24 font-600 mb-4">
          Step 1: Before adding a node, please ensure the following conditions are met
        </p>
        <div className="flex items-center gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-fill-4"></div>
          <span>Ensure you have ETH in your wallet to cover the gas fee.</span>
          {!balance && (
            <Button
              type="link"
              onClick={() => {
                setTransType("recharge");
              }}
            >
              Recharge immediately
            </Button>
          )}
        </div>
        <div className="flex items-center mb-12">
          <div className="mr-3 w-[6px] h-[6px] rounded-full bg-fill-4"></div>
          <span>Ensure your node meets the&nbsp;</span>
          <Button
            type="link"
            onClick={() => {
              window.open("https://docs.capell.io/getstarted/minimum");
            }}
          >
            necessary standards.
          </Button>
        </div>
        <p className="text-16-24 font-600 mb-3">
          Step 2 : Log into your server and execute the installation by running the specified code.
        </p>
        <Tabs defaultActiveTab="1">
          <TabPane key="1" title="Linux 64 Bit">
            <div className="flex items-center py-3 px-4 min-h-[54px] gap-[10px] rounded-3sm bg-fill-2 mt-1 border border-border-2">
              <SvgCopy
                className="cursor-pointer"
                onClick={() => {
                  copyText(cmd);
                }}
              />
              <div className="w-0 h-[22px] border-r border-border-2"></div>
              <p className="whitespace-normal break-all text-14-22 font-500 text-text-4">{cmd}</p>
            </div>
          </TabPane>
          <TabPane key="2" title={<Tooltip content="Coming soon...">Linux Arm64</Tooltip>} disabled></TabPane>
        </Tabs>
        <div className="flex items-center gap-2 mt-2 py-[10px]">
          <SvgInfo className="text-link-1" />
          <p>Ensure KVM is installed on your server before deployment.</p>
        </div>
      </div>
      <div className="mt-4 pt-6 px-8 pb-8 rounded-4sm bg-fill-1">
        <div className="flex items-center justify-between mb-4">
          <p className="font-600 text-24-32">Nodes Pending Listing</p>
          <Button
            className="py-2 text-12-20 h-9 !gap-1 border-border-2 w-[102px] px-0 hover:border-text-4"
            onClick={refresh}
          >
            <SvgRefresh />
            <span>Refresh</span>
          </Button>
        </div>
        <Table
          border={false}
          columns={columns}
          data={results}
          rowSelection={{
            selectedRowKeys,
            onChange: changeSelectedRowKeys,
            checkCrossPage: true,
            preserveSelectedRowKeys: true,
            checkboxProps: (r: NodeItem) => ({
              disabled: !checkItemActivable(r),
            }),
          }}
          pagination={{
            current: filter.pageIndex,
            total,
            pageSize: filter.pageSize,
            onChange: (current, pageSize) => {
              if (filter.pageSize !== pageSize) {
                changeFilter("pageSize", pageSize);
              } else {
                changeFilter("pageIndex", current);
              }
            },
          }}
          rowKey="id"
          scroll={{
            x: columns.map(({ width }) => Number(width) || 160).reduce((item, current) => current + item, 0),
          }}
        ></Table>
      </div>
      <div
        className={cls(
          `fixed bottom-0 left-0 right-0 bg-fill-1 flex items-center px-[60px] py-4 z-10`,
          !selectedRowKeys?.length && "hidden",
        )}
      >
        <div>
          <p className="font-600 text-20-28">Selected Nodes : {selectedRowKeys?.length}</p>
          <div className="flex items-center text-14-22 font-400 text-text-3">
            <p className="mr-[10px]">Gas Fee ≈ {formatGasOrBalance(gas)} ETH</p>
            {balance === 0 && (
              <p className="font-500 text-danger-1 flex items-center">
                <SvgInfo />
                <span>Your current ETH balance is 0.&nbsp;</span>
                <span className="cursor-pointer">Recharge immediately.</span>
              </p>
            )}
          </div>
        </div>
        <Button type="primary" className="ml-auto" onClick={() => activeNodes()} disabled={balance === 0}>
          <SvgActive />
          LIST
        </Button>
      </div>
    </div>
  );
}
