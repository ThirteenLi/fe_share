import { Tabs, TableColumnProps, Tooltip } from "@arco-design/web-react";
import { ReactComponent as SvgRefresh } from "~/assets/ic_refresh.svg";
import { ReactComponent as SvgInfo } from "~/assets/ic_info.svg";
import { Button, Select, Table } from "~/components";
import { NodeItem } from "~/services";
import { copyText } from "~/utils";
import { ReactComponent as SvgCopy } from "~/assets/ic_copy.svg";
import { INORDER_STATUS, ONLINE_STATUS } from "./constants";
import s from "./ui.module.less";
import { useAccount } from "wagmi";

interface ServiceNodeProps {
  changeFilter: (key: string, value: any) => void;
  filter: {
    page: number;
    pageSize: number;
    isOnline: number;
    inOrder: number;
  };
  columns: TableColumnProps[];
  total: number;
  list: NodeItem[];
  refreshNodeList: () => void;
}

const TabPane = Tabs.TabPane;

export default function ServiceNodeUi({
  list,
  total,
  columns,
  filter,
  changeFilter,
  refreshNodeList,
}: ServiceNodeProps) {
  const { address } = useAccount();
  const CMD = `curl -sS -o /tmp/capell_install.sh http://10.10.101.71/download/v2/install.sh && BIND=${address} /bin/bash /tmp/capell_install.sh`;
  return (
    <div className="mx-[60px] h-full flex flex-col pb-8 pt-4 gap-y-4 overflow-y-scroll">
      <div className="flex items-center gap-5 shrink-0 w-full">
        <div className="bg-fill-1 rounded-4sm p-6 h-[307px]">
          <p className="font-500 text-24-32 mb-4">How To Add Nodes</p>
          <p className="font-500 text-16-24 mb-6">
            Log into your server and execute the installation by running the specified code.
          </p>
          <Tabs defaultActiveTab="1">
            <TabPane key="1" title="Linux 64 Bit">
              <div className="flex items-center py-3 px-4 min-h-[54px] gap-[10px] rounded-3sm bg-fill-2 mt-1 border border-border-2">
                <SvgCopy
                  className="cursor-pointer shrink-0 text-success-1"
                  onClick={() => {
                    copyText(CMD);
                  }}
                />
                <div className="w-0 h-[22px] border-r border-border-2"></div>
                <p className="whitespace-normal break-all text-14-22 font-500 text-text-4">{CMD}</p>
              </div>
            </TabPane>
            <TabPane key="2" title={<Tooltip content="Coming soon...">Linux Arm64</Tooltip>} disabled></TabPane>
          </Tabs>
          <div className="flex items-center gap-2 mt-2 font-400 text-14-22 text-text-2">
            <SvgInfo className="text-link-1" />
            <span>Ensure you have ETH in your wallet to cover the gas fee.</span>
          </div>
        </div>
        <img className="h-[307px] w-auto cursor-pointer" src="/ad.png" alt="" />
      </div>
      <div className="bg-fill-1 rounded-4sm p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-6 pb-4">
          <div className="flex items-center mr-auto gap-6">
            <p className="font-600 text-20-28">Service Node</p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              icon="iconFilter"
              allowClear
              value={filter.isOnline}
              placeholder="Online Status"
              options={ONLINE_STATUS}
              onChange={(val) => {
                changeFilter("isOnline", val);
              }}
            />
            <Select
              icon="iconFilter"
              onChange={(val) => {
                changeFilter("inOrder", val);
              }}
              placeholder="Service in order"
              options={INORDER_STATUS}
              value={filter.inOrder}
              allowClear
            />
            <Button
              onClick={() => {
                refreshNodeList();
              }}
              className="bg-fill-1"
            >
              <SvgRefresh />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
        <div>
          <Table
            rowClassName={(r) => r.status === 4 && s.gray}
            scroll={{
              // x: columns.map(({ width }) => Number(width) || 160).reduce((item, current) => current + item, 0),
              x: true,
            }}
            rowKey="id"
            columns={columns}
            data={list}
            pagination={{
              total,
              current: filter.page,
              pageSize: filter.pageSize,
              onChange: (current, pageSize) => {
                if (filter.pageSize !== pageSize) {
                  changeFilter("pageSize", pageSize);
                } else {
                  changeFilter("pageIndex", current);
                }
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
