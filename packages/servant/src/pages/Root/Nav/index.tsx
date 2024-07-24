import cls from "classnames";
import { useNavigate, useLocation } from "react-router";
import { routes } from "~/router/config";
import { ReactComponent as SvgRec } from "~/assets/ic_nav_rec.svg";

export default function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-6">
      {routes.map(({ name, path }) => {
        const activce = pathname.indexOf(path) > -1;
        return (
          <div
            key={name + path}
            className={cls(
              "font-500 text-14-22 h-8 px-3 rounded-[6px] flex items-center cursor-pointer",
              activce && "bg-fill-2",
            )}
            onClick={() => {
              navigate(path);
            }}
          >
            <span>{name}</span>
          </div>
        );
      })}
      <SvgRec
        className="h-24 cursor-pointer"
        onClick={() => {
          navigate("/plan");
        }}
      />
    </div>
  );
}
