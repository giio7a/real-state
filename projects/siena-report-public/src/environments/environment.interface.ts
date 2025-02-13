export interface IEnvironment {
  production: boolean;
  serverUrl: string;
  definedExtents: {
    coatzacoalcos: number[];
    tlaxcalancingo: number[];
  };
}
