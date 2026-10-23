"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ZenovixHeroShader
 * Inspired by 21st.dev Metaball / WebGL Shader components.
 * Renders a slow-moving, restrained enterprise digital intelligence core
 * in Zenovix palette (near-black, deep navy, electric blue, cyan, soft white highlight).
 * Includes subtle film grain, mouse spotlight reaction, WebGL detection,
 * IntersectionObserver pausing, and CSS fallback.
 */
export default function ZenovixHeroShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Detect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Attempt WebGL context creation
    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "low-power" }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setWebglSupported(false);
      return;
    }
    setWebglSupported(true);

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with digital intelligence core + subtle film grain + faint orbit lines
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      varying vec2 v_uv;

      // Pseudo-random noise for subtle film grain
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        // Aspect-corrected UV centered at origin (-0.5 to 0.5)
        vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

        // Slow mouse offset (max 0.12 displacement from center)
        vec2 mouseOffset = (u_mouse - 0.5) * 0.22;
        vec2 coreCenter = st - mouseOffset * 0.5;

        // Base time scaled for slow, dignified motion
        float t = u_time * 0.35;

        // Primary digital intelligence orb coordinates
        vec2 p1 = coreCenter + vec2(sin(t * 0.7) * 0.18, cos(t * 0.5) * 0.15);
        vec2 p2 = coreCenter + vec2(cos(t * 0.6 + 1.8) * 0.22, sin(t * 0.8 + 0.9) * 0.18);
        vec2 p3 = coreCenter + vec2(sin(t * 0.4 + 3.14) * 0.15, cos(t * 0.7 + 2.0) * 0.20);
        vec2 p4 = coreCenter + mouseOffset * 0.8;

        // Distance fields
        float d1 = length(p1);
        float d2 = length(p2);
        float d3 = length(p3);
        float d4 = length(p4);

        // Smooth field blend (metaball-inspired energy density)
        float field = 0.07 / (d1 * d1 + 0.08)
                    + 0.06 / (d2 * d2 + 0.09)
                    + 0.05 / (d3 * d3 + 0.10)
                    + 0.04 / (d4 * d4 + 0.12);

        // Radial falloff so edges fade smoothly
        float distFromCenter = length(st);
        float radialMask = smoothstep(0.95, 0.2, distFromCenter);

        // Faint concentric orbit / digital ring effect
        float ring = sin(distFromCenter * 24.0 - t * 0.8);
        float ringMask = smoothstep(0.97, 1.0, ring) * 0.06 * smoothstep(0.8, 0.1, distFromCenter);

        // Zenovix Enterprise Color Palette
        vec3 colBg    = vec3(0.027, 0.075, 0.149); // #071326
        vec3 colDeep  = vec3(0.063, 0.161, 0.290); // #10294a
        vec3 colBlue  = vec3(0.184, 0.490, 0.965); // #2f7df6
        vec3 colCyan  = vec3(0.216, 0.847, 1.000); // #37d8ff
        vec3 colWhite = vec3(0.918, 0.988, 1.000); // #eafdff

        // Multi-stop energy color ramp
        vec3 color = colBg;
        color = mix(color, colDeep, smoothstep(0.3, 0.8, field));
        color = mix(color, colBlue, smoothstep(0.8, 1.5, field));
        color = mix(color, colCyan, smoothstep(1.5, 2.4, field));
        color = mix(color, colWhite, smoothstep(2.4, 3.6, field));

        // Add subtle orbit ring
        color += colCyan * ringMask;

        // Subtle film grain (21st.dev signature touch)
        float grain = (hash(gl_FragCoord.xy + fract(u_time * 1.5)) - 0.5) * 0.028;
        color += grain;

        // Calculate final opacity: masked towards edge, gentle core alpha
        float alpha = clamp(field * 0.28 + ringMask * 0.5, 0.0, 0.72) * radialMask;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    // Compile helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry (two triangles covering full canvas)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    // Pointer tracking with restrained easing
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const handlePointerMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      targetMouseY = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height));
    };

    const handlePointerLeave = () => {
      targetMouseX = 0.5;
      targetMouseY = 0.5;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Sizing
    let width = 0;
    let height = 0;
    const resize = () => {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap DPR for performance
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Animation & visibility loop
    let animationId: number;
    const startTime = performance.now();
    let isVisible = true;

    const render = (now: number) => {
      if (!isVisible) return;

      // Easing mouse towards target (restrained, fluid)
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      const elapsed = (now - startTime) * 0.001;

      gl.uniform1f(timeLoc, prefersReducedMotion ? 0.0 : elapsed);
      gl.uniform2f(mouseLoc, currentMouseX, currentMouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && !document.hidden;
        if (isVisible && !prefersReducedMotion) {
          animationId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden && observer !== null;
      if (isVisible && !prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial frame
    render(performance.now());

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="zenovix-hero-shader-wrapper"
      aria-hidden="true"
    >
      {/* Decorative WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="zenovix-hero-shader-canvas"
        style={{ display: webglSupported === false ? "none" : "block" }}
      />

      {/* High-fidelity CSS Gradient/Orb Fallback for WebGL failure or reduced motion */}
      <div
        className="zenovix-hero-shader-fallback"
        style={{ opacity: webglSupported === false ? 1 : 0 }}
      />

      {/* Faint technical orbital rings and grid watermark */}
      <div className="zenovix-shader-orbital-rings" />
    </div>
  );
}
