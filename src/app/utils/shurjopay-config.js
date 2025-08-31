import { ShurjoPay } from "../lib/shurjopay";

const config = {
  username: "sp_sandbox",
  password: "pyyk97hu&6u6",
  baseUrl: "https://sandbox.shurjopayment.com",
  prefix: "BLS",
};

export const shurjoPay = new ShurjoPay(config);
