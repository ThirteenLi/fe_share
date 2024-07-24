import { Modal } from "@arco-design/web-react";
import { ReactComponent as SvgConfirm } from "~/assets/ic_confirm.svg";
import { Button } from "../Button";

export function Confirm({ content, onOk }: { content: string; onOk: (close: () => void) => void }) {
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
          <SvgConfirm />
          <p className="font-500 text-16-24">{content}</p>
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
