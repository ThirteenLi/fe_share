import { Select as AntdSelect, SelectProps } from "@arco-design/web-react";
import { ReactComponent as SvgDown } from "~/assets/ic_down.svg";
import cls from "classnames";
import s from "./index.module.less";

export function Select(props: SelectProps) {
  return (
    <div className={s.container}>
      <AntdSelect {...props} className={cls(s.select, props?.className)} arrowIcon={<SvgDown />} />
    </div>
  );
}
