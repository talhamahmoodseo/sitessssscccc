/* Ten colour themes for the slideshow. slides.html#<slide>-<theme>, e.g. #1-4.
 * bg: background, ink: text, a/b: the two accent words, glow: soft light behind
 * the photo, light: true for light backgrounds, grad: gradient for the accent words. */
const THEMES = [
  { name: "Pure black + purple", bg: "#08080A", ink: "#FFFFFF", a: "#8B5CF6", b: "#C4B5FD", glow: "#8B5CF6" },
  { name: "White + green", bg: "#FFFFFF", ink: "#0B1A13", a: "#0F9D58", b: "#0B6B3F", glow: "#34D399", light: true },
  { name: "Forest green + mint", bg: "#0B231A", ink: "#FFFFFF", a: "#4ADE80", b: "#BBF7D0", glow: "#4ADE80" },
  { name: "Macaron", bg: "#FBF1EE", ink: "#2A2140", a: "#7B61D9", b: "#D9568A", glow: "#F4A6C0", light: true },
  { name: "Website light", bg: "#F7F6F4", ink: "#0E0E0E", a: "#E25428", b: "#7C5CF6", glow: "#F5CE58", light: true,
    grad: "linear-gradient(90deg, #E25428, #7C5CF6)" },
  { name: "Website dark", bg: "#0E0E0E", ink: "#FFFFFF", a: "#FF7A45", b: "#A08CFF", glow: "#7C5CF6",
    grad: "linear-gradient(90deg, #FF7A45, #A08CFF)" },
  { name: "Navy + gold", bg: "#0B1426", ink: "#FFFFFF", a: "#D9B46C", b: "#EFDDB4", glow: "#D9B46C" },
  { name: "Ivory + black + burgundy", bg: "#F4EFE6", ink: "#141414", a: "#8E1F3E", b: "#141414", glow: "#C9B28A", light: true },
  { name: "Midnight blue + sky", bg: "#07122B", ink: "#FFFFFF", a: "#5AA9FF", b: "#BFDBFE", glow: "#3B82F6" },
  { name: "Royal purple + lavender", bg: "#1E1240", ink: "#FFFFFF", a: "#C4B5FD", b: "#F5D0FE", glow: "#A78BFA" },
];

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `${n >> 16} ${(n >> 8) & 255} ${n & 255}`;
}
function applyTheme(t) {
  const r = document.documentElement.style;
  r.setProperty("--bg", t.bg);
  r.setProperty("--bgrgb", rgb(t.bg));
  r.setProperty("--ink", rgb(t.ink));
  r.setProperty("--violet", t.a);
  r.setProperty("--lilac", t.b);
  r.setProperty("--glow", rgb(t.glow));
  r.setProperty("--on-a", t.light ? "#FFFFFF" : t.bg);
  r.setProperty("--logo", t.light ? "brightness(0)" : "brightness(0) invert(1)");
  if (t.grad) { r.setProperty("--grad", t.grad); document.body.classList.add("grad"); }
  if (t.light) document.body.classList.add("lightbg");
}
