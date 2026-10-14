import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The homepage rocket's exhaust: a grainy, slowly flowing cloud of orange and
 * lavender that leaves the nozzle and opens up across the left of the hero.
 *
 * Drawn by one fragment shader on a canvas behind the hero. The noise field is
 * domain-warped fbm that drifts left, so the colours fold into each other like
 * smoke, and the density dissolves into speckle at the edges (risograph grain,
 * same feel as GrainBlob). The first frame is drawn on mount, so it is there
 * the moment the page opens. Reduced motion gets that one still frame.
 *
 * The plume starts at the element marked `data-nozzle` inside the same parent.
 * Without WebGL, `fallback` renders instead.
 */

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res;   // canvas, device px
uniform float u_px;   // device px per css px
uniform float u_time;
uniform vec2 u_o;     // nozzle, css px from the top left
uniform vec2 u_text;  // centre column: x centre, half width (css px)
uniform float u_textBottom;

const vec3 ORANGE = vec3(0.910, 0.341, 0.165);
const vec3 PEACH = vec3(0.961, 0.540, 0.330);
const vec3 LAV = vec3(0.745, 0.667, 0.976);
const vec3 VIOLET = vec3(0.612, 0.510, 0.949);

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 dev = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 p = dev / u_px;
  float t = u_time;

  float d = u_o.x - p.x;                    // how far left of the nozzle
  float s = clamp(d / max(u_o.x, 420.0), 0.0, 1.25);

  // flowing, warped noise; the whole field drifts away from the rocket
  vec2 q = p * 0.0030 + vec2(t * 0.050, -t * 0.012);
  vec2 w = vec2(fbm(q + vec2(0.0, t * 0.020)),
                fbm(q + vec2(5.2, 1.3) - vec2(t * 0.010, t * 0.016)));
  float n = fbm(q * 1.2 + 1.9 * w);
  // a slower, broader field for the colour, so it changes in large folds
  float cn = fbm(p * 0.0014 + vec2(t * 0.030, t * 0.008) + 1.4 * w);

  // the plume: out of the nozzle down and to the left, then a wide cloud
  float yc = u_o.y + 140.0 * (1.0 - exp(-d / 210.0)) - 130.0 * s * s
           + (w.x - 0.5) * 160.0 * s;
  float hw = 14.0 + 56.0 * s + 460.0 * pow(s, 2.2);
  float dy = p.y - yc;
  float r = dy > 0.0 ? dy / (hw * 1.45) : -dy / hw;
  r += (n - 0.5) * (0.8 + 0.9 * s);
  float body = 1.0 - smoothstep(0.25, 0.95, r);
  body *= smoothstep(-8.0, 46.0, d);

  // keep the headline and the form clean: thin the smoke behind them
  float tx = 1.0 - smoothstep(u_text.y * 0.75, u_text.y * 1.15, abs(p.x - u_text.x));
  float ty = 1.0 - smoothstep(u_textBottom - 40.0, u_textBottom + 60.0, p.y);
  body *= 1.0 - 0.8 * tx * ty;

  float dens = body * (0.55 + 1.15 * n);

  // colour: warm above, cool below and near the rocket, folded by the noise
  float k = 0.5 + (cn - 0.5) * 3.0 + 0.45 * clamp(dy / hw, -1.0, 1.0)
          + 0.6 * (1.0 - clamp(s * 1.8, 0.0, 1.0)) - 0.32;
  k = clamp(k, 0.0, 1.0);
  float g1 = hash(floor(dev) + 17.0);
  float g2 = hash(floor(dev));
  // mostly a smooth blend, with a little grain where the two colours meet
  float pick = clamp(smoothstep(0.3, 0.7, k) + (g1 - 0.5) * 0.35, 0.0, 1.0);
  vec3 warm = mix(ORANGE, PEACH, smoothstep(0.35, 0.75, w.y) * 0.55);
  vec3 cool = mix(LAV, VIOLET, smoothstep(0.45, 0.8, n));
  vec3 col = mix(warm, cool, pick);

  // grain: solid in the core, speckle at the edges
  float g = 0.08 + g2 * 0.84;
  float a = smoothstep(g - 0.22, g + 0.22, dens) * smoothstep(0.04, 0.22, dens) * 0.95;
  gl_FragColor = vec4(col * a, a);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
};

const SmokePlume = ({
  className = "",
  fallback = null,
}: {
  className?: string;
  fallback?: ReactNode;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      antialias: false,
      alpha: true,
    });
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl && vs && fs ? gl.createProgram() : null;
    if (!gl || !vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("u_res"),
      uPx = u("u_px"),
      uTime = u("u_time"),
      uO = u("u_o"),
      uText = u("u_text"),
      uTextBottom = u("u_textBottom");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let px = 1;

    const measure = () => {
      const box = host.getBoundingClientRect();
      // about one sample per css px: the grain stays fine and the cost low
      const dpr = window.devicePixelRatio || 1;
      px = dpr <= 1 ? 0.8 : Math.min(dpr, 2) * 0.5;
      canvas.width = Math.max(1, Math.round(box.width * px));
      canvas.height = Math.max(1, Math.round(box.height * px));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uPx, px);

      const nozzle = host.querySelector<HTMLElement>("[data-nozzle]");
      const nb = nozzle?.getBoundingClientRect();
      if (nb && nb.width + nb.height > 0) {
        gl.uniform2f(uO, nb.left - box.left, nb.top - box.top);
      } else {
        // rocket hidden (small screens): the smoke drifts in from the right
        gl.uniform2f(uO, box.width + 40, Math.min(box.height * 0.42, 560));
      }
      const text = host.querySelector<HTMLElement>("[data-plume-clear]");
      const tb = text?.getBoundingClientRect();
      if (tb) {
        gl.uniform2f(uText, tb.left - box.left + tb.width / 2, tb.width / 2);
        gl.uniform1f(uTextBottom, tb.bottom - box.top);
      } else {
        gl.uniform2f(uText, 0, 0);
        gl.uniform1f(uTextBottom, 0);
      }
    };

    const start = performance.now();
    const draw = (now: number) => {
      gl.uniform1f(uTime, 30 + (reduced ? 0 : (now - start) / 1000));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    measure();
    draw(start);
    setReady(true);

    let raf = 0,
      last = 0,
      visible = true;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 33) return;
      last = now;
      draw(now);
    };
    if (!reduced) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      measure();
      draw(performance.now());
    });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  if (failed) return <>{fallback}</>;
  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden="true"
    />
  );
};

export default SmokePlume;
