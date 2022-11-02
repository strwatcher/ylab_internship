import { Issue } from "../store/session/types";

export default function simplifyErrors(
  issues: Array<Issue>
): Map<string, Array<string>> {
  let result: Map<string, Array<string>> = new Map();
  for (const issue of issues) {
    const key = issue.path.join(".") || "other";
    if (result.has(key)) {
      result.set(key, [...result.get(key), issue.message]);
    } else {
      result.set(key, [issue.message]);
    }
  }

  return result;
}
