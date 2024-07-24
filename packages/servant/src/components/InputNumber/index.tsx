import { InputNumber as ArcoInputNumber, InputNumberProps } from "@arco-design/web-react";
import "./index.module.less";

export function InputNumber(props: InputNumberProps) {
  return <ArcoInputNumber {...props} hideControl />;
}
