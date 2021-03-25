import { AdditiveBlending, BufferAttribute, Clock, Color, DoubleSide, Group, Mesh, PlaneBufferGeometry, Points, RawShaderMaterial, Vector2, Vector3 } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

const clock = new Clock();

class BasicShaderHandler extends MonoBehaviour {
  start() {
    this.group = new Group();
    this.geometry = new PlaneBufferGeometry(1, 1, 32, 32);
    const vertexCount = this.geometry.attributes.position.count;
    const randoms = new Float32Array(vertexCount);
    for(let i = 0; i < vertexCount; i++) {
      randoms[i] = Math.random();
    }
    this.shaderMaterial = new RawShaderMaterial({
      uniforms: {
        uFrequency: { value: new Vector2(10, 5) },
        uTime: { value: 0 }
      },
      vertexShader: `
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        uniform vec2 uFrequency;
        uniform float uTime;

        attribute vec3 position;
        attribute float aRandom;

        varying float vRandom;

        void main()
        {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
          modelPosition.y += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;

          gl_Position = projectedPosition;

          vRandom = aRandom;
        }
      `,
      fragmentShader: `
        precision mediump float;

        varying float vRandom;

        void main()
        {
          gl_FragColor = vec4(0.42, vRandom, 0.78, 1);
        }
      `,
      side: DoubleSide,
      wireframe: true,
    });
    this.geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1));
    this.mesh = new Mesh(this.geometry, this.shaderMaterial);
    this.mesh.rotation.x = - Math.PI * 0.5;
    this.group.add(this.mesh);
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    this.shaderMaterial.uniforms.uTime.value = elapsedTime;
  }

  exportAsSceneObject() {
    return this.group;
  }
}

class WaveShaderHandler extends MonoBehaviour {
  start() {
    this.group = new Group();
    this.geometry = new PlaneBufferGeometry(5, 5, 512, 512);
    const vertexCount = this.geometry.attributes.position.count;
    const randoms = new Float32Array(vertexCount);
    for(let i = 0; i < vertexCount; i++) {
      randoms[i] = Math.random();
    }
    this.shaderMaterial = new RawShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uFrequency: { value: new Vector2(10, 5) },
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.75 },
        uDepthColor: { value: new Color('#186691') },
        uSurfaceColor: { value: new Color('#9bd8ff') },
        uColorOffset: { value: 0.05 },
        uColorMultiplier: { value: 5 },
      },
      vertexShader: `
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        uniform float uTime;
        uniform float uBigWavesElevation;
        uniform float uBigWavesSpeed;
        uniform vec2 uFrequency;
        uniform vec2 uBigWavesFrequency;

        attribute vec3 position;

        varying float vElevation;

        // Classic Perlin 3D Noise
        // by Stefan Gustavson

        vec4 permute(vec4 x)
        {
            return mod(((x*34.0)+1.0)*x, 289.0);
        }
        vec4 taylorInvSqrt(vec4 r)
        {
            return 1.79284291400159 - 0.85373472095314 * r;
        }
        vec3 fade(vec3 t)
        {
            return t*t*t*(t*(t*6.0-15.0)+10.0);
        }

        float cnoise(vec3 P)
        {
            vec3 Pi0 = floor(P); // Integer part for indexing
            vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
            Pi0 = mod(Pi0, 289.0);
            Pi1 = mod(Pi1, 289.0);
            vec3 Pf0 = fract(P); // Fractional part for interpolation
            vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;

            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);

            vec4 gx0 = ixy0 / 7.0;
            vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);

            vec4 gx1 = ixy1 / 7.0;
            vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);

            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;

            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);

            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
            return 2.2 * n_xyz;
        }

        void main()
        {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          float elevationX = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed);
          float elevationZ = sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed);
          float elevation = elevationX * elevationZ * uBigWavesElevation;

          // ocean
          // elevation -= abs(cnoise(vec3(modelPosition.xz * 3.0, uTime * 0.2)) * 0.15 / i);

          for(float i = 1.0; i < 3.0; i++)
          {
            elevation -= abs(cnoise(vec3(modelPosition.xz * 3.0 * i, uTime * 0.2)) * 0.15);
          }

          // hills
          // elevation += abs(cnoise(vec3(modelPosition.xz * 3.0, uTime * 0.2)) * 0.15);

          // smooth hills
          // elevation += cnoise(vec3(modelPosition.xz * 3.0, uTime * 0.2)) * 0.15;

          modelPosition.y += elevation;

          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;

          gl_Position = projectedPosition;

          vElevation = elevation;
        }
      `,
      fragmentShader: `
        precision mediump float;

        uniform vec3 uDepthColor;
        uniform vec3 uSurfaceColor;
        uniform float uColorOffset;
        uniform float uColorMultiplier;

        varying float vElevation;

        void main()
        {
          float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
          vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: DoubleSide,
      blending: AdditiveBlending,
      size: 0.2
      // wireframe: true,
    });
    this.mesh = new Mesh(this.geometry, this.shaderMaterial);
    this.mesh.rotation.x = - Math.PI * 0.5;
    this.group.add(this.mesh);
  }

  update(time) {
    const elapsedTime = clock.getElapsedTime();
    this.shaderMaterial.uniforms.uTime.value = elapsedTime;
  }

  exportAsSceneObject() {
    return this.group;
  }
}


export class ShaderStudy extends GameObject {
  monobehaviours = {
    WaveShaderHandler
  }
}
