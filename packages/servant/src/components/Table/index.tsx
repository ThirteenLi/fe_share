import { Table as AntdTable, TableProps } from "@arco-design/web-react";
import { Empty } from "@arco-design/web-react";
import { ReactComponent as SvgEmpty } from "~/assets/ic_empty.svg";
import cls from "classnames";
import "./index.module.less";

export function Table(props: TableProps) {
  return (
    <div className="rounded-3sm overflow-hidden h-full relative flex flex-col">
      <AntdTable
        {...props}
        className={cls(props?.className)}
        border={false}
        noDataElement={<div />}
        pagination={props.data?.length ? props?.pagination : false}
      />
      {!props?.data?.length && (
        <Empty
          className="flex flex-col flex-1 justify-center"
          icon={
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "white",
                justifyContent: "center",
              }}
            >
              <SvgEmpty />
            </div>
          }
          description={
            <div className="font-400 text-14-22 text-text-4 inline-flex items-center">
              <span>No data avaliable</span>
            </div>
          }
        />
      )}
    </div>
  );
}
