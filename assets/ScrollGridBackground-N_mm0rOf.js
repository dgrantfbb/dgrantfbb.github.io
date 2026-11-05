import{Dt as e,Et as t,Ot as n,St as r,i,r as a}from"./index-C-9Z99sU.js";var o=n(e(),1);function s(){let[e,t]=(0,o.useState)({x:.5,y:.5});return(0,o.useEffect)(()=>{let e=e=>{t({x:Math.min(1,Math.max(0,e.clientX/window.innerWidth)),y:Math.min(1,Math.max(0,1-e.clientY/window.innerHeight))})};return window.addEventListener(`pointermove`,e,{passive:!0}),()=>window.removeEventListener(`pointermove`,e)},[]),e}var c=`
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,l=`
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float cell = 0.085;
  vec2 g = p / cell;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;

  float breathe = 0.5 + 0.5 * sin(uTime * 0.7 + id.x * 0.35 + id.y * 0.28);
  float inset = mix(0.42, 0.28, breathe);
  float box = max(abs(f.x), abs(f.y));
  float line = smoothstep(inset, inset - 0.02, box)
    - smoothstep(inset - 0.035, inset - 0.055, box);

  float colDist = abs((id.x + 0.5) * cell - (uMouse.x - 0.5) * aspect);
  float hot = exp(-colDist * 14.0) * (0.55 + 0.45 * sin(uTime * 2.0 + id.y));

  vec3 paper = vec3(0.949, 0.933, 0.898);
  vec3 ink = vec3(0.090, 0.090, 0.078);
  vec3 accent = vec3(0.937, 0.294, 0.169);
  vec3 col = paper;
  col = mix(col, ink, line * 0.22);
  col = mix(col, accent, line * hot * 0.85);

  float vig = smoothstep(1.15, 0.35, length(p));
  col = mix(paper * 0.96, col, vig);

  gl_FragColor = vec4(col, 1.0);
}
`,u=t();function d(){let e=(0,o.useRef)(null),t=s(),n=(0,o.useRef)(t),a=(0,o.useMemo)(()=>new r,[]);(0,o.useEffect)(()=>{n.current=t},[t]);let d=(0,o.useMemo)(()=>({uRes:{value:new r(1,1)},uTime:{value:0},uMouse:{value:new r(.5,.5)}}),[]);return i(({clock:t,gl:r})=>{if(document.hidden)return;let i=e.current;i&&(r.getDrawingBufferSize(a),i.uniforms.uRes.value.copy(a),i.uniforms.uTime.value=t.elapsedTime,i.uniforms.uMouse.value.set(n.current.x,n.current.y))}),(0,u.jsxs)(`mesh`,{frustumCulled:!1,children:[(0,u.jsx)(`planeGeometry`,{args:[2,2]}),(0,u.jsx)(`shaderMaterial`,{ref:e,vertexShader:c,fragmentShader:l,uniforms:d,depthWrite:!1,depthTest:!1})]})}function f(){return(0,u.jsx)(d,{})}function p({onReady:e}){return(0,u.jsx)(`div`,{className:`scroll-grid-canvas`,"aria-hidden":`true`,children:(0,u.jsx)(a,{dpr:[1,2],orthographic:!0,camera:{position:[0,0,1],zoom:1,near:.1,far:10},gl:{antialias:!0,alpha:!1,powerPreference:`high-performance`},onCreated:()=>{requestAnimationFrame(()=>e?.())},children:(0,u.jsx)(f,{})})})}export{p as ScrollGridBackground};