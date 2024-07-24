import { Input as AntdInput, InputProps } from "@arco-design/web-react";
import "./index.module.less";

export function Input(props: InputProps = {}) {
  return <AntdInput {...props} height={42} />;
}
