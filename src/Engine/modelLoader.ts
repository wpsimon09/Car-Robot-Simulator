import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";

const modelLoader = new THREE.LoadingManager();
/**
 * Returns the scene that has been loaded by using gltfLoader
 * @param path path to the .glb/.gltf file
 * @param callback callback function that will have access to the loaded model
 * @returns loaded scene
 */
export function loadModel(path: string): Promise<GLTF> {
  return new Promise((resolve) => {
    const gltfLoader = new GLTFLoader(modelLoader);
    gltfLoader.load(path, (loaded) => {
      const loadedModel = loaded;
      console.log(loadedModel);
      resolve(loadedModel);
    });
  });
}

