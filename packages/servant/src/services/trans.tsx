import { query } from "~/utils";

export const getTransData = (params: { amount: string; address?: string }) => {
  return query<{ ethAmount: string; ethAddress: `0x${string}`; ethData: string }>(
    "/api/chain/deposit",
    {},
    {
      method: "get",
      params,
    },
  );
};

export const getEthPrice = async () => {
  const res = await query(
    "/api/chain/eth_price",
    {},
    {
      method: "get",
    },
  );
  return res.data;
};

export const createWithdraw = async (params: {
  address: string;
  amount: string;
  hash?: string;
  ethAddress: string;
}) => {
  const res = await query("/api/transaction/withdraw/create", params, {
    method: "post",
  });
  return res.data;
};

export const getWithdraw = async (address: string) => {
  const res = await query(
    "/api/transaction/withdraw",
    {},
    {
      method: "get",
      params: {
        address,
      },
    },
  );
  return res.data;
};

export const cancelWithdraw = async (id: string) => {
  const res = await query("/api/transaction/withdraw/skip", { id });
  return res.data;
};

export const createDeposit = async (params: {
  address: string;
  amount: string;
  ethHash?: string;
  balance?: string;
}) => {
  const res = await query("/api/transaction/deposit/create", params, {
    method: "post",
  });
  return res.data;
};

export const getDeposit = async (address: string) => {
  const res = await query(
    "/api/transaction/deposit",
    {},
    {
      method: "get",
      params: {
        address,
      },
    },
  );
  return res.data;
};

export const cancelDeposit = async (id: string) => {
  const res = await query("/api/transaction/deposit/skip", { id });
  return res.data;
};
