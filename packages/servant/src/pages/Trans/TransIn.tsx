import { useEffect, useState, useRef } from "react";
import { useAccount, useConnect, useBalance } from "wagmi";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRequest, useBoolean } from "ahooks";
import dayjs from "dayjs";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { sendTransaction, getAccount } from "@wagmi/core";
import { config } from "~/wagmiConfig";
import BigNumber from "bignumber.js";
import { Modal, InputNumber, Message, Steps } from "@arco-design/web-react";
import { IconLoading, IconClose } from "@arco-design/web-react/icon";
import { Button } from "~/components";
import { useTranslation } from "react-i18next";
import { checkApproval, setApproval } from "./approve";
import { transInVisibleAtom, userAtom } from "~/atom";
import { getDeposit, createDeposit } from "./utils";
import { USDT_ADDRESS } from "common/src/env";
import s from "./trans.module.less";
import { getTransData } from "~/services";

const Step = Steps.Step;

export default function TransIn() {
  const [fail, setFail] = useState(false);
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const refloading = useRef(false);
  const user = useAtomValue(userAtom);
  const QueryTransData = getTransData;
  const { isConnected, address: ethAddress } = useAccount();
  const { data: ethbalance } = useBalance({ address: ethAddress, token: USDT_ADDRESS });
  const ethBalance = ethbalance?.formatted;
  const [amount, setAmount] = useState(null);
  const [transInVisible, setTransInVisible] = useAtom(transInVisibleAtom);
  const [step, setStep] = useState<number>(0);
  const { t } = useTranslation();

  const {
    data: depositData,
    run: runGetDeposit,
    cancel,
    refresh: refreshGetDeposit,
    mutate,
  } = useRequest(() => getDeposit(user.address), {
    manual: true,
    pollingInterval: 1000,
    pollingErrorRetryCount: 1,
    onError: (err) => {
      Message.error(err.message);
    },
    onSuccess: (res) => {
      const { ethHash, height, address } = res;
      if (!ethHash && !Number(height) && !address) {
        cancel();
        setFalse();
      }
      if (ethHash && address && height !== "0") {
        cancel();
        setStep(5);
        setFalse();
      } else if (ethHash && address && height === "0") {
        setStep(4);
        setTrue();
      }
    },
  });

  const showDetail = () => {
    if (!depositData) {
      return false;
    }
    const { address, ethHash, height } = depositData;
    if (!address && !ethHash && !loading) {
      return false;
    }
    if (height !== "0" || loading || fail) {
      return true;
    }
    return false;
  };

  const { run: runCreateDeposit } = useRequest(
    ({ hash = "" }) => createDeposit({ address: user.address, amount: String(amount), ethHash: hash }),
    {
      manual: true,
      onSuccess: () => {
        refreshGetDeposit();
      },
      onError: (err) => {
        Message.error(err.message);
      },
    },
  );

  const { runAsync: getEthTransData } = useRequest(
    (inputAmount?: string) => QueryTransData({ amount: inputAmount || String(amount) }),
    {
      manual: true,
    },
  );

  const check = async (tx: { ethAddress: `0x${string}`; ethAmount: string }) => {
    return await checkApproval(tx.ethAddress).then((approvalNumber): any => {
      const rate = BigNumber(Number(approvalNumber)).dividedBy(tx.ethAmount).toNumber();
      if (!!Number(approvalNumber) && rate >= 1) {
        return true;
      } else {
        return setApproval(tx.ethAddress, !Number(approvalNumber) ? tx.ethAmount : "0", () => {
          return new Promise((resolve) => {
            setTimeout(async () => {
              resolve(await check(tx));
            }, 300);
          });
        });
      }
    });
  };

  const trans = async () => {
    if (refloading.current) {
      return;
    }
    refloading.current = true;
    try {
      setTrue();
      mutate((prev) => ({
        ...prev,
        amount,
        createdAt: dayjs().utc().unix(),
      }));
      const { chainId, address } = getAccount(config);
      if (chainId !== sepolia.id) {
        await window.ethereum?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${Number(sepolia.id).toString(16)}` }],
        });
      }
      if (Number(ethBalance) < amount) {
        throw new Error(t("error.nousdt"));
      }

      const res = await getEthTransData();
      const tx = res.data;
      setStep(2);
      const checkRes = await check(tx);
      setStep(3);
      if (checkRes) {
        const hash = await sendTransaction(config, {
          data: tx.ethData,
          to: tx.ethAddress,
          chainId: chainId as any,
        }).catch((e) => {
          const text = e.message.split(".");
          throw new Error(text[0]);
        });
        setStep(4);
        runCreateDeposit({ hash });
      } else {
        throw new Error(t("error.noapprovel"));
      }
    } catch (err: any) {
      setFail(true);
      setFalse();
      const errorText = err?.response?.data?.message || err.message || t("error.recharge");
      Message.error(errorText);
    } finally {
      refloading.current = false;
    }
  };

  const { connect, connectors } = useConnect({
    config,
  });

  const beforeHandleClick = () => {
    setStep(0);
    setFail(false);
    if (!amount) {
      Message.error(t("trans.checkText"));
      return false;
    }
    if (!isConnected) {
      connect(
        { connector: injected() },
        {
          onSuccess: () => {
            setStep(1);
            trans();
          },
          onError: (err) => {
            setStep(1);
            setFail(true);
            Message.error(err.message);
          },
        },
      );
      return false;
    } else {
      setStep(1);
    }
    return true;
  };

  const handleClick = async () => {
    const flag = beforeHandleClick();
    if (!flag) {
      return;
    }
    trans();
  };

  useEffect(() => {
    if (transInVisible) {
      runGetDeposit();
      setFail(false);
    } else {
      cancel();
    }
  }, [transInVisible]);

  return (
    <Modal
      unmountOnExit
      title={t("trans.transInTitle")}
      visible={transInVisible}
      onCancel={() => setTransInVisible(false)}
      style={{ width: 700 }}
      footer={null}
      closeIcon={<IconClose className="relative top-[-6px]" fontSize={20} />}
    >
      <div className="flex items-center bg-border-1 rounded-lg h-[104px] p-4 pb-[10px] justify-between gap-[14px]">
        <div className="font-500 text-14 text-black-65 w-[280px]">
          <p className="pb-[10px]">{t("trans.transInLabel")}</p>
          <InputNumber
            placeholder="At least 1 USDT"
            hideControl
            height={44}
            suffix="USDT"
            value={amount}
            onChange={(val) => {
              setAmount(val);
            }}
          />
        </div>
        {/* <SvgLeft className="mt-auto mb-[10px] rotate-180" /> */}
        <div className="font-500 text-14 text-black-65 w-[280px]">
          <p className="pb-[10px]">{t("trans.receive")}</p>
          <div className="select-none h-11 leading-[44px] border-[2px] border-border-2 bg-white-100 rounded-lg px-3">
            <span className="mr-auto">{amount}</span>
            <span className="float-right">ETH</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => {
          handleClick();
        }}
        className="h-[56px] w-full mt-6"
        disabled={!amount || loading}
      >
        {t("recharge")}
      </Button>
      {showDetail() && (
        <div className="mt-6 border-t border-border-2">
          <div className="flex items-center py-4 gap-6 font-600 text-16">
            <p>
              {t("trans.time", { time: dayjs.unix(Number(depositData.createdAt)).utc().format("YYYY-MM-DD HH:mm:ss") })}
            </p>
            <p>
              {t("trans.amount")}&nbsp;
              <span className="text-primaryText">{`${depositData.amount} USDT`}</span>
            </p>
            {loading && <IconLoading className="shrink-0 text-primaryText" fontSize={20} />}
          </div>
          <div className="p-5 bg-border-1 rounded-lg">
            {loading && step <= 4 && (
              <p className="mb-3 font-500 text-14">Recharging... Please don't close this page.</p>
            )}
            <Steps type="dot" current={step} direction="vertical">
              {[
                "Connect Metamask",
                "Metamask approve",
                "Send Transcation",
                "Query Hash Result",
                "Recharge Success",
              ].map((title, index) => (
                <Step className={`${fail && step === index + 1 && s.error} !min-h-[32px]`} title={title} key={title} />
              ))}
            </Steps>
          </div>
        </div>
      )}
    </Modal>
  );
}
