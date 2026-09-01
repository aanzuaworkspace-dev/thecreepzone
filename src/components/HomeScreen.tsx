import React, { useEffect, useRef, useState } from 'react';
import { CategoryId } from '../types';
import { ChevronRight } from 'lucide-react';

interface HomeScreenProps {
  onEnterMenu: (initialCategory?: CategoryId | null) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onEnterMenu }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // WebGL Iridescent Pastel Wave Shader (Matching user's reference)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
      return;
    }

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouseUV = u_mouse / u_resolution;
          float distToMouse = length(uv - mouseUV);
          float mouseFactor = smoothstep(0.5, 0.0, distToMouse);

          // Arched wave / ribbon distortion inspired by the pastel iridescent reference
          vec2 centeredUV = uv - vec2(0.5, -0.2);
          float radius = length(centeredUV);
          float angle = atan(centeredUV.y, centeredUV.x);

          float t = u_time * 0.22;

          // Organic swirl noise
          float n1 = snoise(vec2(radius * 3.5 - t, angle * 1.8 + mouseFactor * 0.35));
          float n2 = snoise(vec2(uv.x * 2.8 + t * 0.5, uv.y * 2.8 - t * 0.3));

          // Combined wave phase
          float wave = sin(radius * 7.5 - t * 1.2 + n1 * 0.8 + n2 * 0.4);

          // Color palette from user reference: Pastel pink, baby cyan, lilac lavender, soft peach, pearl white
          vec3 cPink      = vec3(0.98, 0.65, 0.84); // Sweet Pastel Pink
          vec3 cLilac     = vec3(0.78, 0.66, 0.96); // Soft Lavender Lilac
          vec3 cCyan      = vec3(0.62, 0.89, 0.96); // Holographic Sky Cyan
          vec3 cPeach     = vec3(1.00, 0.86, 0.78); // Soft Peach
          vec3 cPearl     = vec3(0.99, 0.98, 1.00); // Shimmering Pearl White
          vec3 cDeepIris  = vec3(0.66, 0.48, 0.88); // Iridescent Violet

          // Smooth rainbow-holographic gradient mapping
          float phase = fract(radius * 1.6 + wave * 0.25 - t * 0.15);

          vec3 col;
          if (phase < 0.2) {
              col = mix(cCyan, cLilac, phase / 0.2);
          } else if (phase < 0.4) {
              col = mix(cLilac, cPink, (phase - 0.2) / 0.2);
          } else if (phase < 0.6) {
              col = mix(cPink, cPeach, (phase - 0.4) / 0.2);
          } else if (phase < 0.8) {
              col = mix(cPeach, cPearl, (phase - 0.6) / 0.2);
          } else {
              col = mix(cPearl, cCyan, (phase - 0.8) / 0.2);
          }

          // Accent iridescent depth
          col = mix(col, cDeepIris, clamp(n1 * 0.25, 0.0, 0.4));
          col = mix(col, cPearl, pow(max(0.0, sin(wave * 3.14159)), 4.0) * 0.35);

          gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vertShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
        mouseY = (rect.height - (event.clientY - rect.top)) * (canvas.height / rect.height);

        // Smooth subtle 3D tilt calculations for logo
        const normX = (event.clientX / window.innerWidth) * 2 - 1;
        const normY = (event.clientY / window.innerHeight) * 2 - 1;
        setTilt({ x: normX * 8, y: -normY * 8 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        if (gl) gl.viewport(0, 0, w, h);
      }
    };

    syncSize();
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);

    const render = (t: number) => {
      if (!gl) return;
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  const handleMainMenuClick = () => {
    onEnterMenu(null);
  };

  return (
    <div
      id="home-landing-screen"
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col justify-between select-none bg-[#f2e7f8] text-[#1e1b13]"
    >
      {/* Background Interactive Pastel Iridescent Shader Canvas */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20 pointer-events-none" />
      </div>

      {/* Decorative Modern-Gothic Framing Accents (Corner Details) */}
      <div className="absolute bottom-5 right-6 text-xs font-mono text-[#1e1b13]/40 select-none pointer-events-none hidden sm:block font-bold">
        MENU DIGITAL +
      </div>

      {/* Center Main Stage: Seamlessly Blended Logo with dynamic 3D tilt */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4 my-auto w-full max-w-5xl mx-auto">
        {/* Logo Container with Smooth 3D tilt */}
        <div className="relative flex flex-col items-center justify-center group">
          {/* Subtle soft backlight halo */}
          <div className="absolute -inset-8 bg-gradient-to-r from-[#ffb3d9]/60 via-[#c4b5fd]/60 to-[#a5f3fc]/60 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Logo with 3D dynamic tilt */}
          <div
            className="relative cursor-pointer transition-transform duration-300 ease-out flex items-center justify-center"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
            onClick={handleMainMenuClick}
          >
            <img
              src="./logo.png"
              alt="The Creep Zone Logo"
              referrerPolicy="no-referrer"
              className="w-[290px] sm:w-[440px] md:w-[520px] max-w-full select-none hover:scale-[1.03] transition-transform duration-300 drop-shadow-[0_18px_30px_rgba(20,46,162,0.3)] filter"
            />
          </div>
        </div>

        {/* Primary CTA Button: One single line, high-contrast neo-brutalism */}
        <div className="mt-8 sm:mt-10 w-full flex items-center justify-center">
          <button
            id="enter-menu-main-btn"
            onClick={handleMainMenuClick}
            className="group relative inline-flex items-center justify-center gap-3.5 bg-[#bb0013] hover:bg-[#d9041a] active:translate-x-1 active:translate-y-1 text-white font-space font-black text-base sm:text-xl md:text-2xl px-8 sm:px-12 py-4 sm:py-5 rounded-2xl uppercase tracking-wider transition-all duration-200 shadow-[6px_6px_0px_#1e1b13] hover:shadow-[8px_8px_0px_#451ebb] border-3 border-[#1e1b13] cursor-pointer whitespace-nowrap"
          >
            <span className="whitespace-nowrap drop-shadow-sm">VER MENÚ</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-white shrink-0" />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};
