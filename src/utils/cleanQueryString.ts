export function cleanQueryString(search: string): string {
  const qs = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(qs);

  const keys = Array.from(new Set(Array.from(params.keys())));

  for (const key of keys) {
    const values = params.getAll(key);

    const nonEmpty = values.filter(v => v.trim() !== "");

    params.delete(key);
    for (const v of nonEmpty) params.append(key, v);
  }

  const out = params.toString();
  return out ? `?${out}` : "";
}