import { CubeTextureLoader } from "three";
import { useThree } from "react-three-fiber";

export default function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "./images/skybox/front.png",
    "./images/skybox/back.png",
    "./images/skybox/top.png",
    "./images/skybox/bottom.png",
    "./images/skybox/left.png",
    "./images/skybox/right.png",
  ]);
  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}
/*
If you want a transparent background in three.js, you need pass in the alpha parameter to the WebGLRenderer constructor.

var renderer = new THREE.WebGLRenderer( { alpha: true } );
You can leave the clear color at the default value.

renderer.setClearColor( 0x000000, 0 ); // the default
*/
