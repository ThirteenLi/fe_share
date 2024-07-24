import { ReactNode } from "react";
import cls from "classnames";
import { ReactComponent as SvgSuccess } from "~/assets/ic_success.svg";
import { ReactComponent as SvgFail } from "~/assets/ic_step_fail.svg";
import { ReactComponent as SvgIdle } from "~/assets/ic_step_idle.svg";
import { ReactComponent as SvgLoading } from "~/assets/ic_step_loading.svg";

export type StepStatus = "success" | "loading" | "error" | "idle";

export interface StepItem {
  title: ReactNode;
  key: number | string;
  status: StepStatus;
}

interface StepProps {
  options?: StepItem[];
  lineClassName?: string;
}

export function Step({ options = [], lineClassName = "" }: StepProps) {
  const getIcon = (status: StepStatus) => {
    if (status === "success") {
      return <SvgSuccess />;
    }
    if (status === "loading") {
      return <SvgLoading className="animate-spin" />;
    }
    if (status === "error") {
      return <SvgFail />;
    }
    if (status === "idle") {
      return <SvgIdle />;
    }
  };

  return (
    <div>
      {options.map(({ key, status, title }, index) => {
        return (
          <div key={key}>
            {index !== 0 && <div className={cls("ml-2 mt-1 mb-2 h-5 border-l border-border-2", lineClassName)}></div>}
            <div className="flex items-start gap-4">
              <div className="shrink-0">{getIcon(status)}</div>
              <div
                className={cls(
                  "text-14-22",
                  status === "success" || status === "error" ? "text-text-1" : "text-text-3",
                )}
              >
                {title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
