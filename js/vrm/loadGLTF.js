/* global THREE, THREE_VRM */

/**
 * VRMを読み込む
 * @param {string} modelUrl モデルファイルのURL
 * @returns {Promise<VRM>} VRM
 */
function loadGLTF( modelUrl, callback ) { // モデルを読み込む処理
  const loader = new THREE.GLTFLoader()
  loader.load(
      modelUrl,
      function (gltf) {
          // gltf.scene.traverse(function (child) {
          //     if ((child as THREE.Mesh).isMesh) {
          //         const m = (child as THREE.Mesh)
          //         m.receiveShadow = true
          //         m.castShadow = true
          //     }
          //     if (((child as THREE.Light)).isLight) {
          //         const l = (child as THREE.Light)
          //         l.castShadow = true
          //         l.shadow.bias = -.003
          //         l.shadow.mapSize.width = 2048
          //         l.shadow.mapSize.height = 2048
          //     }
          // })
          callback(gltf);
      },
      (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
          console.log(error)
      }
  )
}
