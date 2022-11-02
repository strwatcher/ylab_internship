import qs from "qs";

type qsStringifyArrayFormat = "comma" | "brackets" | "repeat" | "indices";

const OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: "comma" as qsStringifyArrayFormat,
    encode: false,
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true,
  },
};

export default {
  parse: (query: any) => {
    return qs.parse(query, OPTIONS.parse) || {};
  },

  stringify: (params: any) => {
    return qs.stringify(params, OPTIONS.stringify);
  },
};
