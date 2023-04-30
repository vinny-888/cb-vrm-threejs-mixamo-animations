/* global THREE, THREE_VRM, loadVRM, loadMixamoAnimation */
let tokenId = 81;
let tokenIds = [];
let currentAnimation = 0;
// -- vrm ------------------------------------------------------------------------------------------
let currentVRMs = []; // 現在使用中のvrm、update内で使えるようにするため
let currentMixers = []; // 現在使用中のAnimationMixer、update内で使えるようにするため
let controls = null;

const getUrlParameter = (name) => {
  const query = new URLSearchParams(window.location.search);
  return query.get(name);
};
const init = () => {
  const id = getUrlParameter("id");
  if(id){
    tokenId = id;
  }
  const ids = getUrlParameter("ids");
  if(ids){
    let arr = ids.split(',');
    tokenIds = arr;
  } else {
    tokenIds = [tokenId];
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
  const camera = new THREE.PerspectiveCamera( 40.0, width / height, 0.01, 20.0 );
  camera.position.set( 0.0, 0.0, 5.0 );

  setTimeout(()=>{
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set( 0, 1.5, 0 );
  }, 0)

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


  tokenIds.forEach((id, index)=>{
  // VRM 1
    const modelUrl = 'https://m.cyberbrokers.com/eth/mech/'+id+'/files/mech_2k.vrm';
    const animationUrl = './assets/animations/Warming Up.fbx'; // MixamoのアニメーションのURL

    // See: https://threejs.org/docs/#manual/en/introduction/Animation-system
    loadVRM( modelUrl ).then( ( vrm ) => { // vrmを読み込む
      currentVRMs.push(vrm); // currentGLTFにvrmを代入
      scene.add( vrm.scene ); // モデルをsceneに追加し、表示できるようにする
      
      vrm.scene.position.x = 1.5*index - (tokenIds.length/2*1.5);
      const head = vrm.scene?.getObjectByName('C_hips_001_SCJNT_000');
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
      
      // camera.position.set( 0, 0, 0 ); // カメラを頭が中心に来るように動かす
      camera.position.set( 0, head.getWorldPosition( new THREE.Vector3() ).y, 8.0 );

      let mixer = new THREE.AnimationMixer( vrm.scene );
      mixer.timeScale = 1;
      currentMixers.push(mixer); // vrmのAnimationMixerを作る
      
      
      loadMixamoAnimation( animationUrl, vrm ).then( ( clip ) => { // アニメーションを読み込む
        mixer.clipAction( clip ).play(); // アニメーションをMixerに適用してplay
      } );
    } );
  })

  // -- update ---------------------------------------------------------------------------------------
  const clock = new THREE.Clock();
  clock.start();
  function update() {
    requestAnimationFrame( update );

    const delta = clock.getDelta(); // 前フレームとの差分時間を取得
    
    currentMixers.forEach((mixer)=>{
      if ( mixer ) { // アニメーションが読み込まれていれば
        mixer.update( delta ); // アニメーションをアップデート
      }
    })

    currentVRMs.forEach((vrm)=>{
      if ( vrm ) { // VRMが読み込まれていれば
        vrm.update( delta ); // VRMの各コンポーネントを更新
      }
    })

    renderer.render( scene, camera ); // 描画
  };
  update();
}


function playAnimation(){
  currentVRMs.forEach((vrm, index)=>{
    loadMixamoAnimation( './assets/animations/'+animations[currentAnimation], vrm ).then( ( clip ) => { // アニメーションを読み込む
      currentMixers[index].stopAllAction();
      currentMixers[index].clipAction( clip ).play(); // アニメーションをMixerに適用してplay
    } );
  });
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


