export interface IEnvironment {
  production: boolean;
  serverUrl: string;
  definedExtents: {
    [key: string]: number[];
  };
}
