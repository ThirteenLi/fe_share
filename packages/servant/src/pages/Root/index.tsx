import { Layout } from "@arco-design/web-react";
import { Outlet } from "react-router-dom";
import cls from "classnames";
import { useNavigate, useLocation } from "react-router";
import { ReactComponent as SvgLogoMain } from "~/assets/ic_logo_main.svg";
import { ReactComponent as SvgMeta } from "~/assets/ic_beta.svg";
import Nav from "./Nav";
import UserWallet from "./UserWallet";
import Loading from "./Loading";
import { useAccount } from "wagmi";
import { useLayoutEffect } from "react";

function Root() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (!address && pathname !== "/") {
      navigate("/");
    }
  }, [address]);

  return (
    <Layout className="h-[100vh] overflow-y-scroll">
      <Layout.Header className={cls("sticky top-0 left-0 z-50 border-b border-border-2", pathname === "/" && "hidden")}>
        <div className="flex items-center h-[64px] px-[60px] gap-12 bg-fill-1">
          <div className="flex items-center">
            <SvgLogoMain
              className="cursor-pointer"
              onClick={() => {
                navigate("/service", { replace: true });
              }}
            />
            {import.meta.env.MODE === "office" && <SvgMeta className="ml-[6px]" />}
          </div>
          <Nav />
          <div className="ml-auto">
            <UserWallet />
          </div>
        </div>
      </Layout.Header>
      <Layout.Content className="flex-1">
        <Outlet />
      </Layout.Content>
      <Loading />
    </Layout>
  );
}

export default Root;
