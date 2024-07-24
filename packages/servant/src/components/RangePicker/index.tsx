import { DatePicker, RangePickerProps } from "@arco-design/web-react";
import "./index.module.less";

const { RangePicker: AntdRangePicker } = DatePicker;

export function RangePicker(props: RangePickerProps = {}) {
  return (
    <AntdRangePicker
      {...props}
      placeholder={["Start Time", "End Time"]}
      separator={<div className="h-0 w-4 border-t border-text-3"></div>}
    />
  );
}
