import { ShurjoPay } from "../lib/shurjopay";

const config = {
  username: process.env.SHURJOPAY_USERNAME,
  password: process.env.SHURJOPAY_PASSWORD,
  baseUrl: process.env.SHURJOPAY_BASE_URL,
  prefix: process.env.SHURJOPAY_PREFIX,
};

export const shurjoPay = new ShurjoPay(config);
