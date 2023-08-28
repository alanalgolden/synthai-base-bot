export const truncateStringByBytes = (str, bytes) => {
  const enc = new TextEncoder();
  const truncatedBytes = enc.encode(str).slice(0, bytes);
  return new TextDecoder("utf-8").decode(truncatedBytes);
};
