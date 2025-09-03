import { ShurjoPay } from "../lib/shurjopay";

const config = {
  username: "inspiring_bd",
  password: "insphpty#ygb6r6@",
  baseUrl: "https://engine.shurjopayment.com",
  prefix: "BLS",
};

export const shurjoPay = new ShurjoPay(config);
