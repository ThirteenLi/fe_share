import { Grid } from "@arco-design/web-react";
import { Button } from "~/components";
import { useRef } from "react";
import { ReactComponent as SvgWallet } from "~/assets/ic_wallet.svg";
import { ReactComponent as SvgInfo } from "~/assets/ic_info.svg";
import { ReactComponent as SvgLogo } from "~/assets/ic_logo.svg";
import { ReactComponent as SvgArrowRight } from "~/assets/ic_arrowright.svg";
import { ReactComponent as SvgHelp } from "~/assets/ic_help.svg";
import { ReactComponent as SvgLogoCapell } from "~/assets/ic_logo_capell.svg";
const { GridItem } = Grid;

export default function LoginUi({
  onLogin,
  loading,
  goToDownloadKeplr,
}: {
  loading: boolean;
  onLogin: () => void;
  goToDownloadKeplr: () => void;
}) {
  const refDom = useRef(null);
  return (
    <Grid cols={24} className="h-full bg-fill-1">
      <GridItem span={12} className="relative bg-fill-1 bg-login bg-contain bg-no-repeat">
        <SvgLogoCapell className="absolute top-[14px] left-[60px]" />
        <div className="absolute bottom-[13.67%] left-[60px] right-[19.2%]">
          <p className="font-700 text-[50px] leading-[55px] text-brand-0 mb-[2px]">Decentralised</p>
          <p className="font-700 text-[50px] leading-[55px] text- mb-[2px]">Edge Computing</p>
          <p className="font-700 text-[50px] leading-[55px] mb-6">Platform</p>
          <p className="text-12-20 text-text-3 font-400 max-w-[536px]">
            Connect idle bandwidth, storage, and other computing resources toprovide high-quality, efficient, and
            cost-effective edge computing services. Build the biggest decentralised content distribution network for
            enterprise-level use.
          </p>
        </div>
      </GridItem>
      <GridItem span={12} className="relative flex items-center">
        <div
          className="absolute top-[14px] right-[60px] w-9 h-9 rounded-2sm flex items-center justify-center hover:bg-fill-2 cursor-pointer"
          onClick={() => {
            window.open("https://docs.capell.io");
          }}
        >
          <SvgHelp />
        </div>
        <div className="w-[424px] mx-auto relative">
          <div
            ref={refDom}
            className="absolute -top-[58px] left-0 right-0 flex items-center rounded-2sm bg-link-5 h-[42px] px-4 text-14-22 font-500 opacity-0"
          >
            <SvgInfo className="mr-2 text-link-1" />
            <p>You don't have the Keplr Wallet plugin.</p>
            <button className="flex items-center gap-2 text-link-1 ml-auto" onClick={goToDownloadKeplr}>
              <span>Install</span>
              <SvgArrowRight />
            </button>
          </div>
          <div className="rounded-3sm bg-fill-1 border border-border-2 px-8 py-6 flex flex-col items-center mb-6">
            <button
              className="ml-auto flex items-center font-500 text-12-20 gap-2 hover:text-success-1 active:text-success-3 cursor-pointer"
              onClick={() => {
                window.open("https://docs.capell.io/getstarted/connect");
              }}
            >
              <span>Help</span>
              <SvgArrowRight />
            </button>
            <SvgLogo className="mt-5 mb-6" />
            <p className="font-700 mb-2 text-[28px] leading-10">Log in to Capell</p>
            <p className="font-500 mb-[88px] text-14-22">It’s great to see you. Get started with your wallet.</p>
            <Button
              disabled={loading}
              type="primary"
              size="large"
              className="h-[60px] w-full text-[18px] font-500 leading-[25px]"
              icon={
                <div className="bg-fill-1 p-[2px] rounded-[4px]">
                  <SvgWallet />
                </div>
              }
              onClick={() => onLogin()}
            >
              Connect Metamask Wallet
            </Button>
            <button
              className="rounded-3sm mt-2 h-[60px] w-full font-500 text-[18px] leading-[22px] hover:bg-fill-2 hover:text-success-1 active:text-success-3"
              onClick={goToDownloadKeplr}
            >
              I don’t have a MetaMask Wallet
            </button>
          </div>
          <Button type="text" className="mx-auto">
            <span>See how Capell turns your idle bandwidth into profit</span>
            <SvgArrowRight />
          </Button>
        </div>
      </GridItem>
    </Grid>
  );
}
