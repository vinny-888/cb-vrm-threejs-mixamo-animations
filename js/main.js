/* global THREE, THREE_VRM, loadVRM, loadMixamoAnimation */
let tokenId = 81;
let currentAnimation = 0;
// -- vrm ------------------------------------------------------------------------------------------
let currentVRM = undefined; // 現在使用中のvrm、update内で使えるようにするため
let currentMixer = undefined; // 現在使用中のAnimationMixer、update内で使えるようにするため

const getUrlParameter = (name) => {
  const query = new URLSearchParams(window.location.search);
  return query.get(name);
};
const init = () => {
  const id = getUrlParameter("id");
  if(id){
    tokenId = id;
  }
};

window.addEventListener('DOMContentLoaded',()=>{
  init();
  buildScene();
})

const width = window.innerWidth;
const height = window.innerHeight;

function buildScene(){
  // -- renderer -------------------------------------------------------------------------------------
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild( renderer.domElement );

  // -- camera ---------------------------------------------------------------------------------------
  const camera = new THREE.PerspectiveCamera( 30.0, width / height, 0.01, 20.0 );
  camera.position.set( 0.0, 0.0, 5.0 );

  // -- scene ----------------------------------------------------------------------------------------
  const scene = new THREE.Scene();

  // -- light ----------------------------------------------------------------------------------------
  const light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1.0, 1.0, 1.0 ).normalize();
  scene.add( light );

  scene.background = new THREE.CubeTextureLoader()
            .setPath( `./assets/skybox/` )
              .load( [
                  'px.jpg',
                  'nx.jpg',
                  'py.jpg',
                  'ny.jpg',
                  'pz.jpg',
                  'nz.jpg'
              ], () => {
              } );


  // VRM 0 - this does not work correctly
  // const modelUrl = 'https://m.cyberbrokers.com/eth/mech/653/files/mech_1k.0.vrm'; // モデルのURL

  // VRM 1
  const modelUrl = 'https://m.cyberbrokers.com/eth/mech/'+tokenId+'/files/mech_2k.vrm';
  const animationUrl = './assets/animations/Warming Up.fbx'; // MixamoのアニメーションのURL

  // See: https://threejs.org/docs/#manual/en/introduction/Animation-system
  loadVRM( modelUrl ).then( ( vrm ) => { // vrmを読み込む
    currentVRM = vrm; // currentGLTFにvrmを代入
    scene.add( vrm.scene ); // モデルをsceneに追加し、表示できるようにする

    const head = vrm.scene?.getChildByName('C_hips_001_SCJNT_000');
    let printChildren = (node, depth) => {
      let index = '';
      for(let i=0; i<depth; i++){
        index += ' ';
      }
      index += '-|';
      console.log(index + node.name)
      node.children.forEach((node)=>{
          printChildren(node, depth+1);
      })
    }
    printChildren(head, 0);
    
    camera.position.set( 0, head.getWorldPosition( new THREE.Vector3() ).y, 8.0 ); // カメラを頭が中心に来るように動かす

    currentMixer = new THREE.AnimationMixer( vrm.scene ); // vrmのAnimationMixerを作る
    currentMixer.timeScale = 1;
    
    loadMixamoAnimation( animationUrl, vrm ).then( ( clip ) => { // アニメーションを読み込む
      currentMixer.clipAction( clip ).play(); // アニメーションをMixerに適用してplay
    } );
  } );

  // -- update ---------------------------------------------------------------------------------------
  const clock = new THREE.Clock();
  clock.start();
  function update() {
    requestAnimationFrame( update );

    const delta = clock.getDelta(); // 前フレームとの差分時間を取得
    
    if ( currentMixer ) { // アニメーションが読み込まれていれば
      currentMixer.update( delta ); // アニメーションをアップデート
    }

    if ( currentVRM ) { // VRMが読み込まれていれば
      currentVRM.update( delta ); // VRMの各コンポーネントを更新
    }

    renderer.render( scene, camera ); // 描画
  };
  update();
}


function playAnimation(){
  loadMixamoAnimation( './assets/animations/'+animations[currentAnimation], currentVRM ).then( ( clip ) => { // アニメーションを読み込む
    currentMixer.stopAllAction();
    currentMixer.clipAction( clip ).play(); // アニメーションをMixerに適用してplay
  } );
}
function nextAnimation(){
  currentAnimation++;
  if(currentAnimation >= animations.length){
    currentAnimation = 0;
  }
  playAnimation();
}
function prevAnimation(){
  currentAnimation--;
  if(currentAnimation <= 0){
    currentAnimation = animations.length-1;
  }
  playAnimation();
}

document.addEventListener('keyup', (e) => {
  if (e.code === "ArrowUp"){
    prevAnimation();
  }
  else if (e.code === "ArrowDown"){
    nextAnimation();
  }
});


