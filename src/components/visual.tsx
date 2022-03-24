import * as THREE from "three";
import { stepDuplications } from "../shared/stepDuplication";

const COUNT = 10;

export const Visual = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );

  const steps = stepDuplications(COUNT);
  const scene = new THREE.Scene();
  console.log({ steps });
  
  const material = new THREE.LineBasicMaterial({ color: `#ff0000` });
  
  steps.forEach((step, index) => {
    const points: THREE.Vector3[] = [];
    step.array.steps.forEach((item, i) => {
      points.push(new THREE.Vector3(i*i*2, item*4, i*i));
    })
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  });

  camera.position.set(0, 0, 1000);
  camera.lookAt(500, 300, 0);
  renderer.render(scene, camera);

  console.log(renderer.domElement);

  document.body.appendChild(renderer.domElement);

  return null;
};
