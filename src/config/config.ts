import { EnvConfig } from "./env.config";
import { CommonConfig } from "./common.config";

class Config {
  env = new EnvConfig();
  common = new CommonConfig();
}

export const config = new Config();
