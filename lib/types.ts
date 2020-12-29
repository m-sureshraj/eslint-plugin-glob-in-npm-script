interface property {
  key: {
    value: string;
  };
  value: {
    value: string;
  };
}

export interface Node {
  right: {
    properties: {
      key: {
        value: string;
      };
      value: {
        properties: property[];
      };
    }[];
  };
}
