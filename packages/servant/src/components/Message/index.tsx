import { Message as AntdMessage } from "@arco-design/web-react";
import { ReactNode } from "react";
import cls from "classnames";
import { ReactComponent as SvgInfo } from "~/assets/ic_info.svg";
import "./index.module.less";

interface MessageProps {
  content: ReactNode;
  duration?: number;
  onClose?: () => void;
  type?: "success" | "error";
  id?: string;
}

export function Message(messageConfig: MessageProps | string) {
  const defaultParams = {
    content: "",
    type: "success",
    duration: 2000,
    onClose: () => {},
    id: "message",
  };
  const params =
    typeof messageConfig === "string"
      ? { ...defaultParams, content: messageConfig }
      : { ...defaultParams, ...messageConfig };
  const { type, content, duration, onClose, id } = params;
  AntdMessage?.[type]({
    content,
    duration,
    onClose,
    id,
    icon: <SvgInfo className={cls(type === "error" ? "text-danger-1" : "text-link-1")} />,
  });
}
