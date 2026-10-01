import { readFileSync } from "node:fs";

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") && !specifier.endsWith(".js") && !specifier.endsWith(".json") && !specifier.endsWith(".ts")) {
    return nextResolve(specifier + ".ts", context);
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith(".json")) {
    return { format: "module", source: "export default " + readFileSync(new URL(url), "utf8"), shortCircuit: true };
  }
  return nextLoad(url, context);
}

