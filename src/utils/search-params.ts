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
  parse: function <T = any>(query: string) {
    return (qs.parse(query, OPTIONS.parse) as T) || ({} as T);
  },

  stringify: function <T = any>(params: T) {
    return qs.stringify(params, OPTIONS.stringify);
  },
};
