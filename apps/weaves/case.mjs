function toCamelCase(str) {
  const s = String(str ?? "");
  const sep = /[^a-zA-Z0-9]+/;
  if (!sep.test(s)) return s.charAt(0).toLowerCase() + s.slice(1);
  const words = s.split(sep).filter(Boolean);
  return words.map((w, i) => {
    const lower = w.toLowerCase();
    return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join("");
}

function toSnakeCase(str) {
  return String(str ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[\s\-]+/g, "_")
    .toLowerCase();
}
