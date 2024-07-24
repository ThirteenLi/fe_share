import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import dayjs from "dayjs";

interface ChartProps {
  data: { list: { x: number; y: string | number }[]; defaultList: { x: number; y: string | number }[] };
  yFormatter: (value: string | number) => void;
  tooltipOptions: any;
  seriesOptions: any;
}

export function Chart({ data, yFormatter, tooltipOptions, seriesOptions }: Partial<ChartProps>) {
  const refDom = useRef();
  const refChart = useRef<echarts.ECharts>();
  const isEmpty = !data?.list?.length;
  const resize = () => {
    refChart.current?.resize();
  };

  useEffect(() => {
    if (!refChart.current) {
      refChart.current = echarts.init(refDom.current, {
        locale: "EN",
        grid: {
          left: "0px",
          right: "0px",
          bottom: "36px",
          top: "16px",
          containLabel: true,
        },
      });

      window.addEventListener("resize", resize);
    }
    return () => {
      window.removeEventListener("resize", resize);
      refChart.current.dispose();
      refChart.current = null;
    };
  }, []);
  useEffect(() => {
    if (!data) {
      return;
    }
    resize();
    if (refChart.current) {
      refChart.current.clear();
      let dataList = isEmpty ? data.defaultList : data.list;

      refChart.current.setOption({
        tooltip: isEmpty ? { show: false } : tooltipOptions || { show: false },
        xAxis: {
          data: dataList.map(({ x }) => x),
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: () => "#8c8c8c",
            fontSize: 12,
            align: "center",
            formatter: (value) => {
              return dayjs.unix(Number(value))?.utc().format("M.D");
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#E5E5E5",
              type: "dashed",
              width: 1,
            },
          },
          splitLine: { show: true, lineStyle: { color: "#E5E5E5", width: 1, type: "dashed" } },
          axisLabel: {
            color: () => "#8c8c8c",
            fontSize: 12,
            formatter: yFormatter,
          },
          axisTick: {
            show: false,
          },
          type: "value",
        },
        series: isEmpty
          ? [
              {
                data: dataList.map(({ y }) => y),
                type: "line",
                lineStyle: {
                  color: "transparent",
                },
                symbol: "none",
              },
            ]
          : seriesOptions || [
              {
                data: dataList.map(({ y }) => y),
                type: "line",
                smooth: true,
                color: "#15D47B",
                lineStyle: {
                  color: "#15D47B",
                },
                symbol: "circle",
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(21, 212, 123, 0.3)",
                      },
                      {
                        offset: 1,
                        color: "rgba(21, 212, 123, 0)",
                      },
                    ],
                  },
                },
              },
            ],
      });
    }
  }, [data, seriesOptions, yFormatter, tooltipOptions]);

  return (
    <div className="w-full h-full relative">
      <div ref={refDom} className={`w-full h-full`}></div>
    </div>
  );
}
