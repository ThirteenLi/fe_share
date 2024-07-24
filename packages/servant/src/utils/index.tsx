import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import BigNumber from "bignumber.js";
import { getAccount } from "@wagmi/core";
import { config } from "../wagmiConfig";
export * from "./base";
export * from "./wagmi";

export const formatAddr = (addr: string) => {
  if (!addr) {
    return "";
  }
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
};

export const formatEth = (number: number) => {
  let res = BigNumber(number / Math.pow(10, 18)).toFixed(4);
  if (res.endsWith(".0000")) {
    res = res.replace(".0000", "");
  }
  return res;
};

export const convertBytesToGB = (bytes: number | string) => {
  if (!bytes) {
    return "0.00 GB";
  }
  return BigNumber(bytes).dividedBy(1073741824).toFixed(2) + " GB";
};

export const convertBandWidth = (bytes: number | string) => {
  if (!bytes) {
    return "0.00 Mbps";
  }
  return BigNumber(bytes).dividedBy(1024).toFixed(2) + " Mbps";
};

export const unixToTime = (time: number | string, format = "YYYY-M-D HH:mm:ss (UTC)") => {
  if (!Number(time)) {
    return "-";
  }
  return dayjs.unix(Number(time)).utc().format(format);
};

export const instance = (() => {
  return axios.create({
    method: "post",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });
})();

export function query<T = any>(url: string, params?: any, options = {}): Promise<AxiosResponse<T>> {
  const { address } = getAccount(config);
  return instance
    .request({
      url: `/api${url}`,
      data: JSON.stringify({ ...params, owner: address.toLocaleLowerCase() } || {}),
      ...options,
    })
    .catch((err) => {
      const data = err.response.data;
      console.log("fetch error", data.code, data.message);
      if (data.code === 401 && (data.message === "Token is invalid" || data.message === "JWT token has expired")) {
        window.location.href = "/";
      } else if (data.code === 429) {
        throw new Error("The server is busy, please try again later");
      } else if (data.code === 500) {
        throw new Error("Network is 500");
      }
      throw new Error(data.message);
    });
}
