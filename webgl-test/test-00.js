const vertexShaderSource = `#version 300 es
precision mediump float;

uniform float uPointSize;
void main()
{
    gl_PointSize = uPointSize;
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}`;

const fragmentShaderSource = `#version 300 es
precision mediump float;

out vec4 fragColor;

uniform float uPointSize;
uniform float uTime;
uniform vec2 uMousePos;
vec4 colors[6] = vec4[6](
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 1.0, 1.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0)
);

void main()
{
    vec2 fragPosNorm = 2.0 * gl_FragCoord.xy / uPointSize - 1.0;
    vec4 color = colors[int(mod(gl_FragCoord.xy.x / uPointSize * 6.0, 6.0))];
    fragColor = mix(vec4(0.0, 0.0, 0.0, 1.0), color, smoothstep(0.1, 0.0, length(uMousePos - fragPosNorm)));
    colors[0] = colors[5];


//    fragColor = vec4(1.0, 0.0, 0.0, 1.0)
//        * smoothstep(0.06, 0.0, abs(uMousePos - fragPosNorm).x)
//        * smoothstep(0.12, 0.0, abs(uMousePos - fragPosNorm).y);

//    fragColor = vec4(abs(uMousePos.x)
//            , abs(uMousePos.y)
//            , abs(uMousePos.x + uMousePos.y)
//            , 1.0);
}`;

const canvas = document.querySelector('canvas');
var normMouseX = 0.0;
var normMouseY = 0.0;
canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();

        normMouseX = 2.0 * (event.clientX - rect.left) / canvas.width - 1.0;
        normMouseY = 2.0 * (rect.top - event.clientY) / canvas.height + 1.0;
        });

const gl = canvas.getContext('webgl2');
const program = gl.createProgram();

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
gl.attachShader(program, vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
}

gl.useProgram(program);

const uPointSizeLoc = gl.getUniformLocation(program, 'uPointSize');
gl.uniform1f(uPointSizeLoc, canvas.width);

const uTimeLoc = gl.getUniformLocation(program, 'uTime');
var time = 0;

const uMousePosLoc = gl.getUniformLocation(program, "uMousePos");

draw = function()
{
    gl.uniform1f(uTimeLoc, time);
    gl.uniform2f(uMousePosLoc, normMouseX, normMouseY);
    gl.drawArrays(gl.POINTS, 0, 1);
    requestAnimationFrame(draw);
    time ++;
}
draw();

