import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { Message } from "~/components";
import { useAccount } from "wagmi";
import { loadingAtom } from "~/atom";
import LoginUi from "./ui";
import { useEffect } from "react";
import { useConnect } from "wagmi";

export default function Login() {
  const { connectors, connect } = useConnect();
  const navigate = useNavigate();
  const [loading] = useAtom(loadingAtom);

  const { address } = useAccount();

  const login = () => {
    const connector = connectors.filter(({ name }) => name === "MetaMask")?.[0];
    if (!connector) {
      Message({ content: "Please Download Metamask", type: "error" });
    } else {
      connect({ connector });
    }
  };
  const goToDownloadKeplr = () => {
    window.open(
      "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=zh-CN&utm_source=ext_sidebar",
    );
  };

  useEffect(() => {
    if (address) {
      navigate("/service");
    }
  }, [address]);
  console.log("connectors", connectors);
  return <LoginUi onLogin={login} loading={loading} goToDownloadKeplr={goToDownloadKeplr} />;
}
