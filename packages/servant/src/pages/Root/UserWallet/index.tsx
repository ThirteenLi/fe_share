import { useBalance, useAccount } from "wagmi";
import { disconnect } from "@wagmi/core";
import { ReactComponent as SvgHelp } from "~/assets/ic_help.svg";
import { ReactComponent as SvgCoinWusd } from "~/assets/ic_coin_capell.svg";
import { ReactComponent as SvgDown } from "~/assets/ic_down.svg";
import { ReactComponent as SvgAddress } from "~/assets/ic_wallet_address.svg";
import { ReactComponent as SvgLogout } from "~/assets/ic_wallet_logout.svg";
import { ReactComponent as SvgCopy } from "~/assets/ic_wallet_copy.svg";
import { useBoolean } from "ahooks";
import BigNumber from "bignumber.js";
import { formatAddr, copyText } from "~/utils";
import { useClickOutside } from "~/hooks";
import { config } from "~/wagmiConfig";

function UserWallet() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  console.log("balance", balance);
  const [walletModalVisible, { toggle }] = useBoolean(false);

  useClickOutside(() => {
    toggle();
  }, ["#userwallet", "#userwalletmodal"]);

  return (
    <div className="flex gap-6 ml-auto relative select-none">
      <div
        className="bg-fill-2 rounded-2sm p-2 cursor-pointer"
        onClick={() => {
          window.open("https://docs.capell.io");
        }}
      >
        <SvgHelp />
      </div>
      <div
        id="userwallet"
        className="flex items-center bg-fill-2 rounded-2sm py-[6px] px-2 gap-2 cursor-pointer"
        onClick={() => {
          toggle();
        }}
      >
        <SvgCoinWusd />
        <div className="text-14-22 text-text-1">
          <span className="font-600">{BigNumber(balance?.formatted).toFixed(4)}</span>
          <span>&nbsp;{balance?.symbol}</span>
        </div>
        <SvgDown />
      </div>

      {walletModalVisible && (
        <div
          className="absolute right-0 top-[40px] w-fit bg-fill-1 shadow-wallet rounded-3sm py-4 px-3"
          id="userwalletmodal"
        >
          <div
            className="text-14-22 flex items-center h-[42px] rounded-3sm hover:bg-fill-2 hover:text-success-1 gap-[6px] px-4 whitespace-nowrap text-text-1 cursor-pointer group"
            onClick={() => {
              copyText(address);
            }}
          >
            <SvgAddress />
            {formatAddr(address)}
            <SvgCopy className="text-text-3 group-hover:text-success-1" />
          </div>
          <div
            className="text-14-22 flex items-center h-[42px] rounded-3sm hover:bg-fill-2 hover:text-success-1 gap-[6px] px-4 whitespace-nowrap text-text-1 cursor-pointer"
            onClick={() => {
              disconnect(config);
            }}
          >
            <SvgLogout />
            logout
          </div>
        </div>
      )}
    </div>
  );
}

export default UserWallet;
