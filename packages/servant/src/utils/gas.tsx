import { BigNumber } from "bignumber.js";

export const formatGasOrBalance = (gas: number | string, fix = 5): number => {
  return Number(BigNumber(gas).dividedBy(1000000).toFixed(fix));
};
