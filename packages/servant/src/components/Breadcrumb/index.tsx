import { Breadcrumb as AntdBreadcrumb } from "@arco-design/web-react";
import { useLocation, useNavigate, useParams } from "react-router";
import { ReactComponent as SvgArrowLeft } from "~/assets/ic_arrowleft.svg";
import { useState, useEffect, ReactNode } from "react";
import { routes } from "~/router/config";
import "./index.module.less";

interface BreadcrumbProps {
  onBack?: () => void;
  right?: ReactNode;
}

const BreadcrumbItem = AntdBreadcrumb.Item;

function generateBreadcrumb(treeData, path: string) {
  let breadcrumb = [];
  const pathArr = path
    .split("/")
    .filter((i) => !!i)
    .map((i) => `/${i}`);
  const paths = pathArr.map((item, index) => {
    return index === 0 ? item : `${pathArr[index - 1]}${item}`;
  });
  let offset = 0;
  // 递归查找当前页面的路径
  function findPath(data, path: string) {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      // 找到当前页面
      if (node.path === path) {
        breadcrumb.push({ name: node.name, path: node.hasParams ? path : node.path });
        // 在子节点中继续查找
        if (node.children?.length) {
          offset += 1;
          findPath(node.children, paths[offset]);
        }
        break;
      }
    }
  }

  findPath(treeData, paths[offset]);

  return breadcrumb;
}

export function Breadcrumb({ onBack, right }: BreadcrumbProps) {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const arr = generateBreadcrumb(routes, pathname);
    setList(arr);
  }, []);

  return (
    <div className="h-[76px] flex items-center gap-5 ">
      <SvgArrowLeft
        className="cursor-pointer"
        onClick={() => {
          onBack?.();
          navigate(list?.[list.length - 2]?.path || -1);
        }}
      />
      <AntdBreadcrumb>
        {list.map(({ name, path }, index) => {
          return (
            <BreadcrumbItem
              className="font-500 text-text-3 text-20-28"
              key={path}
              href={index === list?.length - 1 ? pathname : path}
            >
              {name}
            </BreadcrumbItem>
          );
        })}
      </AntdBreadcrumb>
      <div className="ml-auto">{right}</div>
    </div>
  );
}
