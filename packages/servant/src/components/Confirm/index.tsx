import { Modal } from "@arco-design/web-react";
import { ReactNode } from "react";
import { ReactComponent as SvgConfirm } from "~/assets/ic_confirm.svg";
import { Button } from "../Button";

export function Confirm({
  title = "",
  onOk,
  content = "",
  hideIcon = false,
}: {
  content?: string;
  title?: ReactNode;
  onOk?: (close: () => void) => void;
  hideIcon?: boolean;
}) {
  const close = () => {
    Modal.destroyAll();
  };
  Modal.confirm({
    icon: null,
    footer: null,
    className: "pt-2 pb-6 px-8 rounded-4sm",
    content: (
      <div>
        <div className="flex gap-4 mb-8">
          {!hideIcon && <SvgConfirm className="mt-[2px]" />}
          <div className="font-500 text-16-24">
            <div>{title}</div>
            {content && <div className="mt-4 tedxt-14-22 font-400">{content}</div>}
          </div>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button size="small" onClick={close}>
            Cancel
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              onOk(close);
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    ),
  });
}
