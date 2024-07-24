import { useLayoutEffect, useRef } from "react";
import ani1 from "/public/ani-1.png";
import ani2 from "/public/ani-2.png";
import ani3 from "/public/ani-3.png";
import ani4 from "/public/ani-4.png";

export default function CanvasBlock({ getRadio }: { getRadio: () => number }) {
  const canvasRef = useRef(null);
  const canvasRefAni = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    canvas.style.width = `${canvas.clientWidth}px`; // 控制显示大小
    canvas.style.height = `${canvas.clientHeight}px`; // 控制显示大小
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    const canvasAni = canvasRefAni.current;
    canvasAni.width = canvas.clientWidth * ratio;
    canvasAni.height = canvas.clientHeight * ratio;
    canvasAni.style.width = `${canvas.clientWidth}px`; // 控制显示大小
    canvasAni.style.height = `${canvas.clientHeight}px`; // 控制显示大小
    const ctxAni = canvasAni.getContext("2d");
    ctxAni.scale(ratio, ratio);
    const img1 = new Image();
    img1.src = ani1;
    const img2 = new Image();
    img2.src = ani2;
    const img3 = new Image();
    img3.src = ani3;
    const img4 = new Image();
    img4.src = ani4;
    const itemWidth = 256 * ratio;
    const arcLineHeight = 76 * ratio;
    const radius = 50 * ratio;
    const fontSize = ratio === 1 ? 20 : 20 * ratio;
    const radians = Math.atan2(radius, arcLineHeight + radius * 2);
    const start = Math.PI + 2 * radians + 0.04;
    const end = Math.PI * 2 - 2 * radians - 0.04;
    const textMarginTop = 20 * ratio;
    const gapX = (canvas.width - itemWidth * 4) / 3;
    const textLineHeight = 24;
    const border = 2 * ratio;
    function draw() {
      ctxAni.clearRect(0, 0, canvas.width, canvas.height);
      ctxAni.fillStyle = "rgba(125, 0, 0, 0)";
      ctxAni.fillRect(0, 0, canvas.width, canvas.height);
      const radioTotal = getRadio() || 0;
      ctxAni.strokeStyle = "#4DF284";
      ctxAni.lineWidth = 2;
      ctxAni.beginPath();
      const radio = radioTotal > 0.33 ? 1 : radioTotal / 0.33;
      ctxAni.arc(
        itemWidth + gapX * 0.5,
        arcLineHeight + radius * 2 + 2,
        radius * 2 + arcLineHeight,
        start,
        (end - start) * radio + start,
      );
      ctxAni.stroke();
      const radioIII = radioTotal > 0.99 ? 1 : Math.max(0, radioTotal - 0.66) / 0.33;
      ctxAni.beginPath();
      ctxAni.arc(
        itemWidth * 3 + gapX * 2.5,
        arcLineHeight + radius * 2 + 2,
        radius * 2 + arcLineHeight,
        start,
        (end - start) * radioIII + start,
      );
      ctxAni.stroke();
      ctxAni.beginPath();
      const startII = 2 * radians + 0.04;
      const endII = Math.PI - 2 * radians - 0.04;
      const radioII = radioTotal > 0.66 ? 1 : Math.max(0, radioTotal - 0.33) / 0.33;
      ctxAni.arc(
        itemWidth * 2 + gapX * 1.5,
        arcLineHeight + radius,
        radius * 2 + arcLineHeight,
        (endII - startII) * (1 - radioII) + startII,
        endII,
      );
      ctxAni.stroke();
      ctx.strokeStyle = "#191919";
      ctx.fillStyle = "#191919";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `400 ${fontSize}px Arial`; // 设置文本的字体样式和大小
      ctx.lineWidth = 1;

      ctx.clearRect(
        itemWidth / 2 - radius - border,
        arcLineHeight - border,
        radius * 2 + border * 2,
        radius * 2 + border * 2,
      );

      ctx.clearRect(
        itemWidth * 1.5 + gapX - radius - border,
        arcLineHeight - border,
        radius * 2 + border * 2,
        radius * 2 + border * 2,
      );
      ctx.clearRect(
        itemWidth * 2.5 + gapX * 2 - radius - border,
        arcLineHeight - border,
        radius * 2 + border * 2,
        radius * 2 + border * 2,
      );
      ctx.clearRect(
        itemWidth * 3.5 + gapX * 3 - radius - border,
        arcLineHeight - border,
        radius * 2 + border * 2,
        radius * 2 + border * 2,
      );
      if (radioTotal > 0.01) {
        ctx.drawImage(
          img1,
          itemWidth / 2 - radius - border,
          arcLineHeight - border,
          radius * 2 + border * 2,
          radius * 2 + border * 2,
        );
      } else {
        ctx.beginPath();
        ctx.arc(itemWidth / 2, arcLineHeight + radius, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText("01", itemWidth / 2, arcLineHeight + radius);
      }
      if (radioTotal > 0.33) {
        ctx.drawImage(
          img2,
          itemWidth * 1.5 + gapX - radius - border,
          arcLineHeight - border,
          radius * 2 + border * 2,
          radius * 2 + border * 2,
        );
      } else {
        ctx.beginPath();
        ctx.arc(itemWidth * 1.5 + gapX, arcLineHeight + radius, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText("02", itemWidth * 1.5 + gapX, arcLineHeight + radius);
      }
      if (radioTotal > 0.66) {
        ctx.drawImage(
          img3,
          itemWidth * 2.5 + gapX * 2 - radius - border,
          arcLineHeight - border,
          radius * 2 + border * 2,
          radius * 2 + border * 2,
        );
      } else {
        ctx.beginPath();
        ctx.arc(itemWidth * 2.5 + gapX * 2, arcLineHeight + radius, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText("03", itemWidth * 2.5 + gapX * 2, arcLineHeight + radius);
      }
      if (radioTotal > 0.99) {
        ctx.drawImage(
          img4,
          itemWidth * 3.5 + gapX * 3 - radius - border,
          arcLineHeight - border,
          radius * 2 + border * 2,
          radius * 2 + border * 2,
        );
      } else {
        ctx.beginPath();
        ctx.arc(itemWidth * 3.5 + gapX * 3, arcLineHeight + radius, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText("04", itemWidth * 3.5 + gapX * 3, arcLineHeight + radius);
      }
      requestAnimationFrame(draw);
    }
    draw();
    function drawTextGroup() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(itemWidth / 2, arcLineHeight + radius, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(itemWidth * 1.5 + gapX, arcLineHeight + radius, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(itemWidth * 2.5 + gapX * 2, arcLineHeight + radius, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(itemWidth * 3.5 + gapX * 3, arcLineHeight + radius, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillText("01", itemWidth / 2, arcLineHeight + radius);
      ctx.fillText("02", itemWidth * 1.5 + gapX, arcLineHeight + radius);
      ctx.fillText("03", itemWidth * 2.5 + gapX * 2, arcLineHeight + radius);
      ctx.fillText("04", itemWidth * 3.5 + gapX * 3, arcLineHeight + radius);
      ctx.font = `500 ${fontSize}px Arial`; // 设置文本的字体样式和大小
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "Get a crypto wallet",
        itemWidth / 2,
        arcLineHeight + radius * 2 + textMarginTop + textLineHeight * 0.5,
      );
      ctx.fillText(
        "register as a competent node",
        itemWidth * 1.5 + gapX,
        arcLineHeight + radius * 2 + textMarginTop + textLineHeight * 0.5,
      );
      ctx.fillText(
        "Download the software",
        itemWidth * 2.5 + gapX * 2,
        arcLineHeight + radius * 2 + textMarginTop + textLineHeight * 0.5,
      );
      ctx.fillText(
        "Serve to Earn",
        itemWidth * 3.5 + gapX * 3,
        arcLineHeight + radius * 2 + textMarginTop + textLineHeight * 0.5,
      );
      // 绘制灰色线
      ctx.strokeStyle = "#F5F5F5";
      ctx.beginPath();
      ctx.arc(itemWidth + gapX * 0.5, arcLineHeight + radius * 2, radius * 2 + arcLineHeight, start, end);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        itemWidth * 2 + gapX * 1.5,
        arcLineHeight + radius,
        radius * 2 + arcLineHeight,
        2 * radians + 0.04,
        Math.PI - 2 * radians - 0.04,
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(itemWidth * 3 + gapX * 2.5, arcLineHeight + radius * 2, radius * 2 + arcLineHeight, start, end);
      ctx.stroke();
    }
    drawTextGroup();

    function handleResize(entries) {
      // 获取新的宽度和高度
      var width = entries[0].contentRect.width;
      var height = entries[0].contentRect.height;
      // 更新 Canvas 的尺寸
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvasAni.width = width * ratio;
      canvasAni.height = height * ratio;
      // 在这里执行其他与尺寸相关的操作
      drawTextGroup();
    }

    // 创建 ResizeObserver 实例
    var resizeObserver = new ResizeObserver(handleResize);

    // 监听 Canvas 元素的尺寸变化
    resizeObserver.observe(canvas);
  }, []);

  return (
    <div className="lg:block hidden h-[329px] relative">
      <canvas ref={canvasRef} className="w-full h-[329px] absolute top-0 right-0 bottom-0 left-0"></canvas>
      <canvas ref={canvasRefAni} className="w-full h-[329px] absolute top-0 right-0 bottom-0 left-0"></canvas>
    </div>
  );
}
