// Rule logic for kind: "gate" figures. Plain JS so the validator can check specs in Node
// and so the behaviour can be tested without a browser.
//
// A rule blocks a request when its condition is true:
//   { field: "amount", op: ">", value: 100 }
//   { field: "knownAddress", op: "is", value: false }
//   { any: [cond, cond] }  or  { all: [cond, cond] }   (combine conditions)

export const OPS = {
  ">": (a, b) => a > b,
  ">=": (a, b) => a >= b,
  "<": (a, b) => a < b,
  "<=": (a, b) => a <= b,
  is: (a, b) => a === b,
  not: (a, b) => a !== b,
  in: (a, b) => Array.isArray(b) && b.includes(a),
  notIn: (a, b) => Array.isArray(b) && !b.includes(a),
  includes: (a, b) => Array.isArray(a) && a.includes(b),
};

export function matches(cond, fields) {
  if (cond.any) return cond.any.some((c) => matches(c, fields));
  if (cond.all) return cond.all.every((c) => matches(c, fields));
  const fn = OPS[cond.op];
  return fn ? fn(fields[cond.field], cond.value) : false;
}

/** First enabled rule that blocks the request, or null if it goes through. */
export function evaluate(request, rules, enabled) {
  for (const r of rules) {
    if (enabled[r.id] && matches(r.block, request.fields || {})) return r;
  }
  return null;
}
