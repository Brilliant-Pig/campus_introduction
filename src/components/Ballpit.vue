<template>
    <canvas
      :class="className"
      ref="canvasRef"
      :style="{ width: '100%', height: '100%' }"
    />
  </template>
  
  <script>
  import {
    Clock,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    SRGBColorSpace,
    MathUtils,
    Vector2,
    Vector3,
    MeshPhysicalMaterial,
    ShaderChunk,
    Color,
    Object3D,
    InstancedMesh,
    PMREMGenerator,
    SphereGeometry,
    AmbientLight,
    PointLight,
    ACESFilmicToneMapping,
    Raycaster,
    Plane,
  } from "three";
  import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
  
  class ThreeApp {
    #config;
    canvas;
    camera;
    cameraMinAspect;
    cameraMaxAspect;
    cameraFov;
    maxPixelRatio;
    minPixelRatio;
    scene;
    renderer;
    #postprocessing;
    size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
    render = this.#render;
    onBeforeRender = () => {};
    onAfterRender = () => {};
    onAfterResize = () => {};
    #isIntersecting = false;
    #isAnimating = false;
    isDisposed = false;
    #resizeTimeout;
    #intersectionObserver;
    #resizeObserver;
    #clock = new Clock();
    #animationFrame;
    #time = { elapsed: 0, delta: 0 };
  
    constructor(config) {
      this.#config = { ...config };
      this.#initCamera();
      this.#initScene();
      this.#initRenderer();
      this.resize();
      this.#initListeners();
    }
  
    #initCamera() {
      this.camera = new PerspectiveCamera();
      this.cameraFov = this.camera.fov;
    }
  
    #initScene() {
      this.scene = new Scene();
    }
  
    #initRenderer() {
      if (this.#config.canvas) {
        this.canvas = this.#config.canvas;
      } else if (this.#config.id) {
        this.canvas = document.getElementById(this.#config.id);
      } else {
        console.error("Three: Missing canvas or id parameter");
      }
      this.canvas.style.display = "block";
      const rendererConfig = {
        canvas: this.canvas,
        powerPreference: "high-performance",
        ...(this.#config.rendererOptions ?? {}),
      };
      this.renderer = new WebGLRenderer(rendererConfig);
      this.renderer.outputColorSpace = SRGBColorSpace;
    }
  
    #initListeners() {
      if (!(this.#config.size instanceof Object)) {
        window.addEventListener("resize", this.#handleResize.bind(this));
        if (this.#config.size === "parent" && this.canvas.parentNode) {
          this.#resizeObserver = new ResizeObserver(this.#handleResize.bind(this));
          this.#resizeObserver.observe(this.canvas.parentNode);
        }
      }
      this.#intersectionObserver = new IntersectionObserver(this.#handleIntersection.bind(this), {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      });
      this.#intersectionObserver.observe(this.canvas);
      document.addEventListener("visibilitychange", this.#handleVisibilityChange.bind(this));
    }
  
    #removeListeners() {
      window.removeEventListener("resize", this.#handleResize.bind(this));
      this.#resizeObserver?.disconnect();
      this.#intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", this.#handleVisibilityChange.bind(this));
    }
  
    #handleIntersection(entries) {
      this.#isIntersecting = entries[0].isIntersecting;
      this.#isIntersecting ? this.#startAnimation() : this.#stopAnimation();
    }
  
    #handleVisibilityChange() {
      if (this.#isIntersecting) {
        document.hidden ? this.#stopAnimation() : this.#startAnimation();
      }
    }
  
    #handleResize() {
      if (this.#resizeTimeout) clearTimeout(this.#resizeTimeout);
      this.#resizeTimeout = setTimeout(this.resize.bind(this), 100);
    }
  
    resize() {
      let width, height;
      if (this.#config.size instanceof Object) {
        width = this.#config.size.width;
        height = this.#config.size.height;
      } else if (this.#config.size === "parent" && this.canvas.parentNode) {
        width = this.canvas.parentNode.offsetWidth;
        height = this.canvas.parentNode.offsetHeight;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }
      this.size.width = width;
      this.size.height = height;
      this.size.ratio = width / height;
      this.#updateCamera();
      this.#updateRenderer();
      this.onAfterResize(this.size);
    }
  
    #updateCamera() {
      this.camera.aspect = this.size.width / this.size.height;
      if (this.camera.isPerspectiveCamera && this.cameraFov) {
        if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
          this.#adjustFovForAspect(this.cameraMinAspect);
        } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
          this.#adjustFovForAspect(this.cameraMaxAspect);
        } else {
          this.camera.fov = this.cameraFov;
        }
      }
      this.camera.updateProjectionMatrix();
      this.updateWorldSize();
    }
  
    #adjustFovForAspect(targetAspect) {
      const tangent = Math.tan(MathUtils.degToRad(this.cameraFov / 2)) / (this.camera.aspect / targetAspect);
      this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(tangent));
    }
  
    updateWorldSize() {
      if (this.camera.isPerspectiveCamera) {
        const fovY = (this.camera.fov * Math.PI) / 180;
        this.size.wHeight = 2 * Math.tan(fovY / 2) * this.camera.position.length();
        this.size.wWidth = this.size.wHeight * this.camera.aspect;
      } else if (this.camera.isOrthographicCamera) {
        this.size.wHeight = this.camera.top - this.camera.bottom;
        this.size.wWidth = this.camera.right - this.camera.left;
      }
    }
  
    #updateRenderer() {
      this.renderer.setSize(this.size.width, this.size.height);
      this.#postprocessing?.setSize(this.size.width, this.size.height);
      let pixelRatio = window.devicePixelRatio;
      if (this.maxPixelRatio && pixelRatio > this.maxPixelRatio) {
        pixelRatio = this.maxPixelRatio;
      } else if (this.minPixelRatio && pixelRatio < this.minPixelRatio) {
        pixelRatio = this.minPixelRatio;
      }
      this.renderer.setPixelRatio(pixelRatio);
      this.size.pixelRatio = pixelRatio;
    }
  
    get postprocessing() {
      return this.#postprocessing;
    }
  
    set postprocessing(value) {
      this.#postprocessing = value;
      this.render = value.render.bind(value);
    }
  
    #startAnimation() {
      if (this.#isAnimating) return;
      const animate = () => {
        this.#animationFrame = requestAnimationFrame(animate);
        this.#time.delta = this.#clock.getDelta();
        this.#time.elapsed += this.#time.delta;
        this.onBeforeRender(this.#time);
        this.render();
        this.onAfterRender(this.#time);
      };
      this.#isAnimating = true;
      this.#clock.start();
      animate();
    }
  
    #stopAnimation() {
      if (this.#isAnimating) {
        cancelAnimationFrame(this.#animationFrame);
        this.#isAnimating = false;
        this.#clock.stop();
      }
    }
  
    #render() {
      this.renderer.render(this.scene, this.camera);
    }
  
    clear() {
      this.scene.traverse((object) => {
        if (object.isMesh && typeof object.material === "object" && object.material !== null) {
          Object.keys(object.material).forEach((key) => {
            const value = object.material[key];
            if (value !== null && typeof value === "object" && typeof value.dispose === "function") {
              value.dispose();
            }
          });
          object.material.dispose();
          object.geometry.dispose();
        }
      });
      this.scene.clear();
    }
  
    dispose() {
      this.#removeListeners();
      this.#stopAnimation();
      this.clear();
      this.#postprocessing?.dispose();
      this.renderer.dispose();
      this.isDisposed = true;
    }
  }
  
  const pointerTargets = new Map();
  const pointerPosition = new Vector2();
  let pointerListenersActive = false;
  
  function createPointerTarget(config) {
    const target = {
      position: new Vector2(),
      nPosition: new Vector2(),
      hover: false,
      onEnter() {},
      onMove() {},
      onClick() {},
      onLeave() {},
      ...config,
    };
  
    function registerTarget(domElement, target) {
      if (!pointerTargets.has(domElement)) {
        pointerTargets.set(domElement, target);
        if (!pointerListenersActive) {
          document.body.addEventListener("pointermove", handlePointerMove);
          document.body.addEventListener("pointerleave", handlePointerLeave);
          document.body.addEventListener("click", handleClick);
          pointerListenersActive = true;
        }
      }
    }
  
    registerTarget(config.domElement, target);
  
    target.dispose = () => {
      const domElement = config.domElement;
      pointerTargets.delete(domElement);
      if (pointerTargets.size === 0) {
        document.body.removeEventListener("pointermove", handlePointerMove);
        document.body.removeEventListener("pointerleave", handlePointerLeave);
        pointerListenersActive = false;
      }
    };
  
    return target;
  }
  
  function handlePointerMove(event) {
    pointerPosition.x = event.clientX;
    pointerPosition.y = event.clientY;
    for (const [element, target] of pointerTargets) {
      const rect = element.getBoundingClientRect();
      if (isPointerInBounds(rect)) {
        updatePointerPosition(target, rect);
        if (!target.hover) {
          target.hover = true;
          target.onEnter(target);
        }
        target.onMove(target);
      } else if (target.hover) {
        target.hover = false;
        target.onLeave(target);
      }
    }
  }
  
  function handleClick(event) {
    pointerPosition.x = event.clientX;
    pointerPosition.y = event.clientY;
    for (const [element, target] of pointerTargets) {
      const rect = element.getBoundingClientRect();
      updatePointerPosition(target, rect);
      if (isPointerInBounds(rect)) target.onClick(target);
    }
  }
  
  function handlePointerLeave() {
    for (const target of pointerTargets.values()) {
      if (target.hover) {
        target.hover = false;
        target.onLeave(target);
      }
    }
  }
  
  function updatePointerPosition(target, rect) {
    const { position, nPosition } = target;
    position.x = pointerPosition.x - rect.left;
    position.y = pointerPosition.y - rect.top;
    nPosition.x = (position.x / rect.width) * 2 - 1;
    nPosition.y = (-position.y / rect.height) * 2 + 1;
  }
  
  function isPointerInBounds(rect) {
    const { x, y } = pointerPosition;
    const { left, top, width, height } = rect;
    return x >= left && x <= left + width && y >= top && y <= top + height;
  }
  
  const { randFloat, randFloatSpread } = MathUtils;
  const tempVector1 = new Vector3();
  const tempVector2 = new Vector3();
  const tempVector3 = new Vector3();
  const tempVector4 = new Vector3();
  const tempVector5 = new Vector3();
  const tempVector6 = new Vector3();
  const tempVector7 = new Vector3();
  const tempVector8 = new Vector3();
  const tempVector9 = new Vector3();
  const tempVector10 = new Vector3();
  
  class PhysicsSystem {
    constructor(config) {
      this.config = config;
      this.positionData = new Float32Array(3 * config.count).fill(0);
      this.velocityData = new Float32Array(3 * config.count).fill(0);
      this.sizeData = new Float32Array(config.count).fill(1);
      this.center = new Vector3();
      this.#initializePositions();
      this.setSizes();
    }
  
    #initializePositions() {
      const { config, positionData } = this;
      this.center.toArray(positionData, 0);
      for (let i = 1; i < config.count; i++) {
        const base = 3 * i;
        positionData[base] = randFloatSpread(2 * config.maxX);
        positionData[base + 1] = randFloatSpread(2 * config.maxY);
        positionData[base + 2] = randFloatSpread(2 * config.maxZ);
      }
    }
  
    setSizes() {
      const { config, sizeData } = this;
      sizeData[0] = config.size0;
      for (let i = 1; i < config.count; i++) {
        sizeData[i] = randFloat(config.minSize, config.maxSize);
      }
    }
  
    update(time) {
      const { config, center, positionData, sizeData, velocityData } = this;
      let startIdx = 0;
      
      if (config.controlSphere0) {
        startIdx = 1;
        tempVector1.fromArray(positionData, 0);
        tempVector1.lerp(center, 0.1).toArray(positionData, 0);
        tempVector4.set(0, 0, 0).toArray(velocityData, 0);
      }
  
      // Apply gravity and friction
      for (let idx = startIdx; idx < config.count; idx++) {
        const base = 3 * idx;
        tempVector2.fromArray(positionData, base);
        tempVector5.fromArray(velocityData, base);
        tempVector5.y -= time.delta * config.gravity * sizeData[idx];
        tempVector5.multiplyScalar(config.friction);
        tempVector5.clampLength(0, config.maxVelocity);
        tempVector2.add(tempVector5);
        tempVector2.toArray(positionData, base);
        tempVector5.toArray(velocityData, base);
      }
  
      // Handle collisions
      for (let idx = startIdx; idx < config.count; idx++) {
        const base = 3 * idx;
        tempVector2.fromArray(positionData, base);
        tempVector5.fromArray(velocityData, base);
        const radius = sizeData[idx];
  
        // Collision with other spheres
        for (let jdx = idx + 1; jdx < config.count; jdx++) {
          const otherBase = 3 * jdx;
          tempVector3.fromArray(positionData, otherBase);
          tempVector6.fromArray(velocityData, otherBase);
          const otherRadius = sizeData[jdx];
          tempVector7.copy(tempVector3).sub(tempVector2);
          const dist = tempVector7.length();
          const sumRadius = radius + otherRadius;
  
          if (dist < sumRadius) {
            const overlap = sumRadius - dist;
            tempVector8.copy(tempVector7).normalize().multiplyScalar(0.5 * overlap);
            tempVector9.copy(tempVector8).multiplyScalar(Math.max(tempVector5.length(), 1));
            tempVector10.copy(tempVector8).multiplyScalar(Math.max(tempVector6.length(), 1));
            tempVector2.sub(tempVector8);
            tempVector5.sub(tempVector9);
            tempVector2.toArray(positionData, base);
            tempVector5.toArray(velocityData, base);
            tempVector3.add(tempVector8);
            tempVector6.add(tempVector10);
            tempVector3.toArray(positionData, otherBase);
            tempVector6.toArray(velocityData, otherBase);
          }
        }
  
        // Collision with control sphere
        if (config.controlSphere0) {
          tempVector7.copy(tempVector1).sub(tempVector2);
          const dist = tempVector7.length();
          const sumRadius0 = radius + sizeData[0];
          if (dist < sumRadius0) {
            const diff = sumRadius0 - dist;
            tempVector8.copy(tempVector7.normalize()).multiplyScalar(diff);
            tempVector9.copy(tempVector8).multiplyScalar(Math.max(tempVector5.length(), 2));
            tempVector2.sub(tempVector8);
            tempVector5.sub(tempVector9);
          }
        }
  
        // Boundary collisions
        if (Math.abs(tempVector2.x) + radius > config.maxX) {
          tempVector2.x = Math.sign(tempVector2.x) * (config.maxX - radius);
          tempVector5.x = -tempVector5.x * config.wallBounce;
        }
  
        if (config.gravity === 0) {
          if (Math.abs(tempVector2.y) + radius > config.maxY) {
            tempVector2.y = Math.sign(tempVector2.y) * (config.maxY - radius);
            tempVector5.y = -tempVector5.y * config.wallBounce;
          }
        } else if (tempVector2.y - radius < -config.maxY) {
          tempVector2.y = -config.maxY + radius;
          tempVector5.y = -tempVector5.y * config.wallBounce;
        }
  
        const maxBoundary = Math.max(config.maxZ, config.maxSize);
        if (Math.abs(tempVector2.z) + radius > maxBoundary) {
          tempVector2.z = Math.sign(tempVector2.z) * (config.maxZ - radius);
          tempVector5.z = -tempVector5.z * config.wallBounce;
        }
  
        tempVector2.toArray(positionData, base);
        tempVector5.toArray(velocityData, base);
      }
    }
  }
  
  class ScatteringMaterial extends MeshPhysicalMaterial {
    constructor(config) {
      super(config);
      this.uniforms = {
        thicknessDistortion: { value: 0.1 },
        thicknessAmbient: { value: 0 },
        thicknessAttenuation: { value: 0.1 },
        thicknessPower: { value: 2 },
        thicknessScale: { value: 10 },
      };
      this.defines.USE_UV = "";
      this.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, this.uniforms);
        shader.fragmentShader = `
          uniform float thicknessPower;
          uniform float thicknessScale;
          uniform float thicknessDistortion;
          uniform float thicknessAmbient;
          uniform float thicknessAttenuation;
        ` + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace(
          "void main() {",
          `
          void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
            vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
            float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
            #ifdef USE_COLOR
              vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
            #else
              vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
            #endif
            reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
          }
  
          void main() {
        `
        );
        const lightsFragment = ShaderChunk.lights_fragment_begin.replaceAll(
          "RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",
          `
            RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
            RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
          `
        );
        shader.fragmentShader = shader.fragmentShader.replace("#include <lights_fragment_begin>", lightsFragment);
        if (this.onBeforeCompile2) this.onBeforeCompile2(shader);
      };
    }
  }
  
  const defaultConfig = {
    count: 170,
    colors: ['#3f72af', '#9EFBD3', '#57E9F2', '#45D4FB'],
    ambientColor: 16777215,
    ambientIntensity: 1,
    lightIntensity: 130,
    materialParams: {
      metalness: 0.5,
      roughness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    },
    minSize: 0.5,
    maxSize: 0.9,
    size0: 1,
    gravity: 0.5,
    friction: 0.9975,
    wallBounce: 0.95,
    maxVelocity: 0.15,
    maxX: 5,
    maxY: 5,
    maxZ: 2,
    controlSphere0: false,
    followCursor: true,
  };
  
  const dummyObject = new Object3D();
  
  class BallpitSpheres extends InstancedMesh {
    constructor(renderer, config = {}) {
      const mergedConfig = { ...defaultConfig, ...config };
      const environment = new RoomEnvironment();
      const pmremGenerator = new PMREMGenerator(renderer, 0.04);
      const envMap = pmremGenerator.fromScene(environment).texture;
      const geometry = new SphereGeometry();
      const material = new ScatteringMaterial({ envMap, ...mergedConfig.materialParams });
      material.envMapRotation.x = -Math.PI / 2;
      super(geometry, material, mergedConfig.count);
      this.config = mergedConfig;
      this.physics = new PhysicsSystem(mergedConfig);
      this.#initLights();
      this.setColors(mergedConfig.colors);
    }
  
    #initLights() {
      this.ambientLight = new AmbientLight(
        this.config.ambientColor,
        this.config.ambientIntensity
      );
      this.add(this.ambientLight);
      this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);
      this.add(this.light);
    }
  
    setColors(colors) {
      if (Array.isArray(colors) && colors.length > 1) {
        const colorGradient = (function (colors) {
          let colorValues, colorInstances;
          function setColors(newColors) {
            colorValues = newColors;
            colorInstances = [];
            colorValues.forEach((color) => {
              colorInstances.push(new Color(color));
            });
          }
          setColors(colors);
          return {
            setColors,
            getColorAt: function (ratio, out = new Color()) {
              const scaled = Math.max(0, Math.min(1, ratio)) * (colorValues.length - 1);
              const idx = Math.floor(scaled);
              const start = colorInstances[idx];
              if (idx >= colorValues.length - 1) return start.clone();
              const alpha = scaled - idx;
              const end = colorInstances[idx + 1];
              out.r = start.r + alpha * (end.r - start.r);
              out.g = start.g + alpha * (end.g - start.g);
              out.b = start.b + alpha * (end.b - start.b);
              return out;
            },
          };
        })(colors);
        for (let idx = 0; idx < this.count; idx++) {
          this.setColorAt(idx, colorGradient.getColorAt(idx / this.count));
          if (idx === 0) {
            this.light.color.copy(colorGradient.getColorAt(idx / this.count));
          }
        }
        this.instanceColor.needsUpdate = true;
      }
    }
  
    update(time) {
      this.physics.update(time);
      for (let idx = 0; idx < this.count; idx++) {
        dummyObject.position.fromArray(this.physics.positionData, 3 * idx);
        // Hide the first sphere if followCursor is false
        if (idx === 0 && this.config.followCursor === false) {
          dummyObject.scale.setScalar(0);
        } else {
          dummyObject.scale.setScalar(this.physics.sizeData[idx]);
        }
        dummyObject.updateMatrix();
        this.setMatrixAt(idx, dummyObject.matrix);
        if (idx === 0) this.light.position.copy(dummyObject.position);
      }
      this.instanceMatrix.needsUpdate = true;
    }
  }
  
  function createBallpit(canvas, config = {}) {
    const threeApp = new ThreeApp({
      canvas,
      size: "parent",
      rendererOptions: { antialias: true, alpha: true },
    });
    let spheres;
    threeApp.renderer.toneMapping = ACESFilmicToneMapping;
    threeApp.camera.position.set(0, 0, 20);
    threeApp.camera.lookAt(0, 0, 0);
    threeApp.cameraMaxAspect = 1.5;
    threeApp.resize();
    initialize(config);
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const intersectionPoint = new Vector3();
    let isPaused = false;
    const pointerTarget = createPointerTarget({
      domElement: canvas,
      onMove() {
        raycaster.setFromCamera(pointerTarget.nPosition, threeApp.camera);
        threeApp.camera.getWorldDirection(plane.normal);
        raycaster.ray.intersectPlane(plane, intersectionPoint);
        spheres.physics.center.copy(intersectionPoint);
        spheres.config.controlSphere0 = true;
      },
      onLeave() {
        spheres.config.controlSphere0 = false;
      },
    });
    function initialize(config) {
      if (spheres) {
        threeApp.clear();
        threeApp.scene.remove(spheres);
      }
      spheres = new BallpitSpheres(threeApp.renderer, config);
      threeApp.scene.add(spheres);
    }
    threeApp.onBeforeRender = (time) => {
      if (!isPaused) spheres.update(time);
    };
    threeApp.onAfterResize = (size) => {
      spheres.config.maxX = size.wWidth / 2;
      spheres.config.maxY = size.wHeight / 2;
    };
    return {
      three: threeApp,
      get spheres() {
        return spheres;
      },
      setCount(count) {
        initialize({ ...spheres.config, count });
      },
      togglePause() {
        isPaused = !isPaused;
      },
      dispose() {
        pointerTarget.dispose();
        threeApp.dispose();
      },
    };
  }
  
  export default {
    name: 'Ballpit',
    props: {
      className: {
        type: String,
        default: ''
      },
      followCursor: {
        type: Boolean,
        default: true
      },
      // Add other props as needed
    },
    mounted() {
      const canvas = this.$refs.canvasRef;
      if (!canvas) return;
  
      this.spheresInstance = createBallpit(canvas, { 
        followCursor: this.followCursor,
        ...this.$props 
      });
    },
    beforeUnmount() {
      if (this.spheresInstance) {
        this.spheresInstance.dispose();
      }
    },
    watch: {
      followCursor(newVal) {
        if (this.spheresInstance) {
          this.spheresInstance.spheres.config.followCursor = newVal;
        }
      }
    }
  };
  </script>