import { useLocation } from "react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DATA from "~/constants";
import s from "./content.module.less";

const getContent = (data, path) => {
  if (!data?.length) {
    return "";
  }
  let content = data.find((item) => item.path === path)?.content;
  if (content) {
    return content;
  } else {
    let subData = [];
    data
      .filter((item) => !!item?.children?.length)
      ?.forEach(({ children }) => {
        subData = subData.concat(children);
      });
    return getContent(subData, path);
  }
};

export default function Content() {
  const { pathname } = useLocation();
  const defaultPath = "/intro/aboutcapell";
  const path = pathname === "/" ? defaultPath : pathname;

  const data = getContent(DATA, path);
  console.log("result", data);
  const renderH1 = (item) => {
    const { value } = item;
    return <div className={s.h1}>{value}</div>;
  };
  const renderH2 = (item) => {
    const { value } = item;
    return <div className={s.h2}>{value}</div>;
  };
  const renderP = (item) => {
    const { value } = item;
    return <div className={s.p}>{value}</div>;
  };
  const renderPImportant = (item) => {
    const { value, important } = item;
    return (
      <div className={s.pImportant}>
        <span>{important}</span>&nbsp;
        {value}
      </div>
    );
  };
  const renderImg = (item) => {
    const { url } = item;
    return (
      <div className={s.image}>
        <img src={url} />
      </div>
    );
  };
  const renderContent = () => {
    if (typeof data === "string") {
      return (
        <div className={s.markdown}>
          <Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown>
        </div>
      );
    } else {
      return data.map((item, i) => {
        const { type } = item;
        if (type === "h1") {
          return <div key={i}>{renderH1(item)}</div>;
        } else if (type === "h2") {
          return <div key={i}>{renderH2(item)}</div>;
        } else if (type === "p") {
          return <div key={i}>{renderP(item)}</div>;
        } else if (type === "p_important") {
          return <div key={i}>{renderPImportant(item)}</div>;
        } else if (type === "img") {
          return <div key={i}>{renderImg(item)}</div>;
        }
        return null;
      });
    }
  };
  return <div className="py-8 px-6">{renderContent()}</div>;
}
