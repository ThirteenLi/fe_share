import { Modal as AntdModal } from "@arco-design/web-react";
import { ReactNode } from "react";
import { Button, ButtonProps } from "../Button";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
  close: () => void;
  onOk: () => void;
  okButtonProps: Partial<ButtonProps>;
}

export function Modal({ visible = false, children = "", close, onOk, okButtonProps }: Partial<ModalProps>) {
  return (
    <AntdModal
      className="pt-2 px-3 rounded-4sm"
      visible={visible}
      closable={false}
      footer={null}
      onCancel={() => {
        close?.();
      }}
    >
      {children}
      <div className="flex items-center gap-4 justify-end mt-6">
        <Button
          size="small"
          onClick={() => {
            close?.();
          }}
        >
          Cancel
        </Button>
        <Button
          size="small"
          type="primary"
          onClick={async () => {
            await onOk();
            close?.();
          }}
          {...(okButtonProps || {})}
        >
          Confirm
        </Button>
      </div>
    </AntdModal>
  );
}
