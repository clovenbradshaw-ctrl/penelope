function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}
