import { ReactNode } from "react";
import cx from "classnames";

export type ButtonSize = "extraLarge" | "large" | "middle" | "small";
export type ButtonType = "default" | "primary" | "text" | "link" | "main";

export interface ButtonProps {
  children: ReactNode;
  size: ButtonSize;
  type: ButtonType;
  disabled: boolean;
  loading: boolean;
  icon: ReactNode;
  onClick: () => void;
  className: string;
}

export function Button({
  children = null,
  type = "default",
  size = "middle",
  onClick = () => {},
  icon = null,
  disabled = false,
  className = "",
}: Partial<ButtonProps>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cx(`flex items-center justify-center gap-2 disabled:cursor-not-allowed`, {
        "btn-extraLarge": size === "extraLarge" && type !== "text" && type !== "link",
        "btn-large": size === "large" && type !== "text" && type !== "link",
        "btn-middle": size === "middle" && type !== "text" && type !== "link",
        "btn-small": size === "small" && type !== "text" && type !== "link",
        "btn-primary": type === "primary",
        "btn-default": type === "default",
        "btn-main": type === "main",
        "btn-text": type === "text",
        "btn-link": type === "link",
        [className]: !!className,
      })}
    >
      {icon}
      {children}
    </button>
  );
}
