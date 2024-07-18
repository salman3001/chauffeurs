export class EnvConfig {
  constructor() {
    this.validate();
  }
  variables = {
    nodeEnv: process.env.NODE_ENV,
  };

  get(key: keyof EnvConfig["variables"]) {
    return this.variables[key];
  }

  validate() {
    for (const [ev, value] of Object.entries(this.variables)) {
      if (!value) {
        throw new Error(`Environment variable "${ev}" must be defined`);
      }
    }
  }
}
