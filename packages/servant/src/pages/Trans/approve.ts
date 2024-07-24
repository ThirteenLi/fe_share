import { getAccount, waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { readContract } from "@wagmi/core";
import { erc20ABI } from "~/utils/abi";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { useClient } from "common/src/hooks/useClient";
import { USDT_ADDRESS } from "common/src/env";
import { config } from "~/wagmiConfig";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export async function checkApproval(toAddress: any) {
  const { chainId, address } = getAccount(config);
  return readContract(config, {
    address: USDT_ADDRESS,
    abi: erc20ABI,
    chainId: chainId as any,
    functionName: "allowance",
    args: [address, toAddress],
  });
}

export const checkHash = async (hash: `0x${string}`) => {
  const { chainId } = getAccount(config);
  return new Promise((resolve, rejected) => {
    waitForTransactionReceipt(config, {
      hash,
      timeout: 120000,
      chainId: chainId as any,
      confirmations: 1,
    })
      .then((res) => {
        resolve(res);
      })
      .catch(async (err) => {
        if (err.message.search("Block") !== -1) {
          resolve(await checkHash(hash));
        } else {
          rejected(err.message);
        }
      });
  });
};

export const checkEvents = (events: any, type: string): string => {
  const target = events.find((item) => item.type === type)?.attributes;
  const code = target.find((item) => item.key === "code")?.value;
  return code;
};

export const checkHashInCapell = async (hash: string) => {
  const client = useClient();
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res: any = await client.CosmosTxV1Beta1.query.serviceGetTx(hash).catch(async (err) => {
        if (err.message.search("404") !== -1) {
          resolve(await checkHashInCapell(hash));
        }
      });
      const events = res.data.tx_response.events;
      const code = checkEvents(events, "capellchain.customer.EventRegisterCustomerNode");

      if (code === "0") {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 2000);
  });
};

export async function setApproval(toAddress: any, amount: string, onSuccess: () => void) {
  const { chainId } = getAccount(config);
  const res = await writeContract(config, {
    address: USDT_ADDRESS,
    abi: erc20ABI,
    chainId: chainId as any,
    functionName: "approve",
    args: [toAddress, amount],
  }).catch((err) => {
    return "" as `0x${string}`;
  });
  if (!res) {
    return false;
  }
  await checkHash(res);
  return onSuccess();
}
