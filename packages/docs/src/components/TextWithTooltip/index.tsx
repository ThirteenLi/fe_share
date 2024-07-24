import { Tooltip } from "@arco-design/web-react";
import { ReactNode } from "react";
import { ReactComponent as SvgQuestion } from "~/assets/ic_question.svg";

interface TextWithTooltipProps {
  children?: ReactNode;
  content?: string;
}

export function TextWithTooltip({ children = null, content = "" }: TextWithTooltipProps) {
  return (
    <div className="flex items-center gap-1 cursor-default">
      <>{children}</>
      <Tooltip content={content}>
        <SvgQuestion className="cursor-pointer text-border-3 hover:text-success-1 shrink-0" />
      </Tooltip>
    </div>
  );
}
