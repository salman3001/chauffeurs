import { EnvConfig } from "./env.config";
import { CommonConfig } from "./common.config";

export class Config {
  env = new EnvConfig();
  common = new CommonConfig();
}
