import { useLayoutEffect, useRef } from "react";
import { isSafariBrowser } from "~/utils";

export default function AniWords() {
  const canvasRef = useRef(null);
  const canvasRefII = useRef(null);
  const texts = [
    "Anfowen212kmfhr3",
    "Fjoafjsk124nvdjmkmk",
    "Kghnjkdananknkd899vndjs",
    "Cnvnsjfwaqnknfk",
    "Lasnfjknbcmkacnjafhhwiqm",
    "Kghnjkdananknkd899vndjs",
    "Cnvnsjfwaqnknfk",
    "2938njvdbxmmxljfjfh",
    "097ye7hudbun",
    "Bndjwlfsjalfw12geiwg",
    "Connect idle bandwidth",
    "storage, and other computing",
    "resources to provide high-quality",
    "efficient, and cost-effective edge",
    "computing services.Build the biggest",
    "decentralised content distribution",
    "network for enterprise-level use.",
  ];
  const ratio = isSafariBrowser() ? 0.5 : 1;
  const init = () => {
    const canvas = canvasRef.current;
    const canvasII = canvasRefII.current;
    const ctx = canvas.getContext("2d");
    const ctxII = canvasII.getContext("2d");
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = 0.5 * canvas.clientWidth * ratio;
    canvasII.width = canvasII.clientWidth * ratio;
    canvasII.height = 0.5 * canvasII.clientWidth * ratio;
    ctx.scale(1 / ratio, 1 / ratio);
    ctxII.scale(1 / ratio, 1 / ratio);
    ctx.translate(1, 1);
    ctxII.translate(1, 1);
    function handleResize(entries) {
      // 获取新的宽度和高度
      var width = entries[0].contentRect.width;
      var height = entries[0].contentRect.height;

      // 更新 Canvas 的尺寸
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvasII.width = width * ratio;
      canvasII.height = height * ratio;
      // 在这里执行其他与尺寸相关的操作
      drawText();
    }

    // 创建 ResizeObserver 实例
    var resizeObserver = new ResizeObserver(handleResize);

    // 监听 Canvas 元素的尺寸变化
    resizeObserver.observe(canvas);

    let radius = 0.01;
    let k = 0;
    function drawText() {
      const centerX = canvas.width / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#04040F";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const lineHeight = 20;
      const offset = 10; // 边界放大量
      const blank = 10; // 横向文字间隔
      let x = -1 * offset; // 文字X坐标
      let y = -1 * offset; // 文字y坐标
      ctx.font = "400 16px Arial"; // 设置文本的字体样式和大小
      let i = 0;
      let j = 0; // 记录行数
      while (x <= canvas.width + offset || y <= canvas.height + offset) {
        const offsetX = x - (j % 2) * 0.5 * offset;
        const text = texts[i];
        const textWidth = ctx.measureText(text).width;
        const defaultLinear = ctx.createLinearGradient(offsetX, y, offsetX + textWidth, y);
        defaultLinear.addColorStop(0, "rgba(255,255,255, 0.14)");
        defaultLinear.addColorStop(1, "rgba(255,255,255, 0.03)");
        ctx.fillStyle = defaultLinear;
        ctx.fillText(text, offsetX, y - (lineHeight - 16) / 2);
        if (i === texts.length - 1) {
          i = 0;
        } else {
          i += 1;
        }
        if (x > canvas.width + offset) {
          x = 0;
          y += lineHeight;
          j += 1;
        } else {
          x += textWidth + blank;
        }
      }
      if (radius >= 1) {
        radius = 0.01;
      } else {
        radius += 0.01;
      }

      if (k >= centerX) {
        k = 0;
      } else {
        k += Math.min(centerX * 0.018, 6.576);
      }
    }
    drawText();
    function drawTextGroup() {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      ctxII.clearRect(0, 0, canvas.width, canvas.height);
      const lineHeight = 20;
      const offset = 10; // 边界放大量
      const blank = 10; // 横向文字间隔
      let x = -1 * offset; // 文字X坐标
      let y = -1 * offset; // 文字y坐标
      ctxII.font = "400 16px Arial"; // 设置文本的字体样式和大小
      let i = 0;
      let j = 0; // 记录行数
      while (x <= canvas.width + offset || y <= canvas.height + offset) {
        const offsetX = x - (j % 2) * 0.5 * offset;
        const text = texts[i];
        const textWidth = ctx.measureText(text).width;
        const gradient = ctx.createRadialGradient(centerX, centerY, k, centerX, centerY, 0.7 * centerY + k);
        gradient.addColorStop(0, "rgba(78, 255, 138, 0)");
        gradient.addColorStop(0.45, "rgba(78, 255, 138, 1)");
        gradient.addColorStop(0.5, "rgba(78, 255, 138, 1)");
        gradient.addColorStop(0.55, "rgba(45, 255, 192, 1)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctxII.fillStyle = gradient; // 设置填充样式为径向渐变对象
        ctxII.fillText(text, offsetX, y - (lineHeight - 16) / 2);

        if (i === texts.length - 1) {
          i = 0;
        } else {
          i += 1;
        }
        if (x > canvas.width + offset) {
          x = 0;
          y += lineHeight;
          j += 1;
        } else {
          x += textWidth + blank;
        }
      }
      if (radius >= 1) {
        radius = 0.01;
      } else {
        radius += 0.01;
      }

      if (k >= centerX) {
        k = 0;
      } else {
        k += Math.min(centerX * 0.018, 6.576);
      }
      if (!isSafariBrowser()) {
        requestAnimationFrame(drawTextGroup);
      }
    }

    if (isSafariBrowser()) {
      setInterval(() => {
        drawTextGroup();
      }, 30);
    } else {
      drawTextGroup();
    }
  };
  useLayoutEffect(() => {
    init();
  });

  return (
    <div className="relative  pt-[50%]" style={{ transformStyle: "preserve-3d" }}>
      <canvas
        ref={canvasRef}
        className="w-full absolute top-0 right-0 bottom-0 left-0"
        style={{ transform: "translate3d(0, 0, 0)" }}
      ></canvas>
      <canvas
        ref={canvasRefII}
        className="w-full absolute top-0 right-0 bottom-0 left-0"
        style={{ transform: "translate3d(0, 0, 0)" }}
      ></canvas>
      <div className="absolute z-10 bg-mask top-0 right-0 left-0 bottom-0 flex items-center text-center justify-center">
        <div className="font-500 text-fill-1 lg:text-[60px] text-[30px]">Secure</div>
      </div>
    </div>
  );
}
