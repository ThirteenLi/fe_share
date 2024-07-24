import { useState, useEffect } from "react";
import cls from "classnames";
import { useLocation, useNavigate } from "react-router";
import { ReactComponent as SvgLogoMain } from "~/assets/ic_logo_main.svg";
import { ReactComponent as SvgDown } from "~/assets/ic_down.svg";
import { ReactComponent as SvgRight } from "~/assets/ic_right.svg";
import { ReactComponent as SvgJump } from "~/assets/ic_jump.svg";
import DATA, { LINKS } from "~/constants";

export default function LeftMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState(["/"]);
  const [selectedSubKey, setSelectedSubKey] = useState("/");

  useEffect(() => {
    console.log("pathname", pathname);
    if (pathname === "/") {
      setSelectedKey(["/intro"]);
      setSelectedSubKey("/intro/aboutcapell");
    } else {
      const paths = pathname.split("/").filter((i) => !!i);
      const key = "/" + (paths?.[0] || "");
      setSelectedKey((prev) => [...prev, key]);
      setSelectedSubKey(pathname);
    }
  }, [pathname]);

  return (
    <div className="select-none">
      <div className="py-6 pl-9">
        <SvgLogoMain />
      </div>
      <div className="flex flex-col gap-1">
        {DATA.map(({ title, children, path }) => {
          const hasChildren = !!children?.length;
          const key = path;
          const hasKey = selectedKey.indexOf(key) > -1;
          return (
            <div
              key={key}
              className={cls("flex flex-col py-[11px] px-6 rounded-2sm", {
                "bg-fill-2": hasKey && hasChildren,
              })}
            >
              {/* main */}
              <div
                className={cls(
                  "flex items-center justify-between cursor-pointer py-[10px] px-3 text-text-2 text-12-22 font-500 hover:bg-fill-2 hover:text-text-1 rounded-2sm",
                  {
                    "font-600 text-14-22 !text-text-1 bg-fill-2": hasKey,
                  },
                )}
                onClick={() => {
                  if (hasChildren) {
                    setSelectedKey((prev) => {
                      if (prev.some((j) => j === key)) {
                        return prev.filter((i) => i !== key);
                      } else {
                        return [...prev, key];
                      }
                    });
                  } else {
                    navigate(path);
                  }
                }}
              >
                <p>{title}</p>
                {hasChildren && <>{hasKey ? <SvgDown /> : <SvgRight />}</>}
              </div>
              {/* sub */}
              {hasChildren && (
                <div
                  className={cls(
                    "transition-all flex flex-col gap-1 duration-500 max-h-[500px] ease-in-out overflow-hidden",
                    {
                      "!max-h-0": !hasKey,
                    },
                  )}
                >
                  {children.map(({ title: subTitle, path: subPath }) => {
                    const subKey = subPath;
                    return (
                      <div
                        className={cls(
                          "flex items-center justify-between text-text-2 text-12-22 font-500 py-[10px] px-3 rounded-2sm hover:bg-fill-4 hover:text-text-1 cursor-pointer",
                          {
                            "bg-fill-4 !text-text-1": selectedSubKey === subKey,
                          },
                        )}
                        key={subKey}
                        onClick={() => {
                          setSelectedSubKey(subKey);
                          navigate(subPath);
                        }}
                      >
                        <p>{subTitle}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {LINKS.map(({ link, title }) => {
          return (
            <div key={title} className={cls("flex flex-col py-[11px] px-6 rounded-2sm")}>
              {/* main */}
              <div
                className={cls(
                  "flex items-center gap-1 cursor-pointer py-[10px] px-3 text-text-2 text-12-22 font-500 hover:bg-fill-2 hover:text-text-1 rounded-2sm",
                )}
                onClick={() => {
                  window.open(link);
                }}
              >
                <p>{title}</p>
                <SvgJump />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
