import { Tooltip } from "@arco-design/web-react";
import { ReactNode } from "react";
import cls from "classnames";
import { ReactComponent as SvgQuestion } from "~/assets/ic_question.svg";

interface TextWithTooltipProps {
  children?: ReactNode;
  content?: ReactNode;
  className?: string;
  showIcon?: boolean;
}

export function TextWithTooltip({
  children = null,
  content = "",
  className = "",
  showIcon = true,
}: TextWithTooltipProps) {
  return (
    <div className={cls("inline-flex items-center gap-1 cursor-default", className)}>
      {showIcon ? (
        <>
          <>{children}</>
          <Tooltip content={content}>
            <SvgQuestion className="cursor-pointer text-border-3 hover:text-success-1 shrink-0" />
          </Tooltip>
        </>
      ) : (
        <Tooltip content={content} className="whitespace-nowrap">
          {children}
        </Tooltip>
      )}
    </div>
  );
}
