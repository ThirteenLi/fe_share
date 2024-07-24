/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAtomValue } from "jotai";
import { loadingAtom } from "~/atom";
import { Icon, Spin } from "@arco-design/web-react";
import { IconLoading } from "@arco-design/web-react/icon";

export default function Loading() {
  const loading = useAtomValue(loadingAtom);
  return (
    loading && (
      <div
        className="fixed top-0 right-0 left-0 bottom-0 bg-fill-6 z-[99999]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Spin className="scale-[5] absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2" />
      </div>
    )
  );
}
