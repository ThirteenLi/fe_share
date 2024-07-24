import { Select as AntdSelect, SelectProps } from "@arco-design/web-react";
import { ReactComponent as SvgDown } from "~/assets/ic_down.svg";
import cls from "classnames";
import s from "./index.module.less";
interface SelfSelectProps {
  icon?: string;
}
export function Select(props: SelectProps & SelfSelectProps) {
  return (
    <div className={s.container}>
      <AntdSelect
        {...props}
        dragToSort
        className={cls(s.select, props?.className, props?.icon ? `icon ${props?.icon}` : "")}
        arrowIcon={<SvgDown />}
      />
    </div>
  );
}
