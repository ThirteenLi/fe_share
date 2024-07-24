import { Tooltip } from "@arco-design/web-react";
import { ReactNode } from "react";
import cls from "classnames";
import { ReactComponent as SvgInfo } from "~/assets/ic_info.svg";

interface TextWithCheckProps {
  children?: ReactNode;
  errorText?: string;
  error: boolean;
}

export function TextWithCheck({ children = null, errorText = "", error }: TextWithCheckProps) {
  return (
    <div className={"flex items-center gap-1 cursor-default"}>
      <div className={cls(error && "text-danger-1")}>{children}</div>
      {error && (
        <Tooltip content={errorText}>
          <SvgInfo className="cursor-pointer text-danger-1 shrink-0" />
        </Tooltip>
      )}
    </div>
  );
}
