/* global THREE, THREE_VRM, mixamoVRMRigMap */

/**
 * Mixamoのアニメーションを読み込み、VRM向けに調整して返す
 * @param {string} url Mixamoのモーションが入ったURL
 * @param {VRM} vrm VRMモデル
 * @returns {Promise<THREE.AnimationClip>} AnimationClip
 */
function loadMixamoAnimation( url, vrm ) {
  const loader = new THREE.FBXLoader(); // FBXを読み込むLoader
  return loader.loadAsync( url ).then( ( asset ) => {
    const clip = THREE.AnimationClip.findByName( asset.animations, 'mixamo.com' ); // AnimationClipを抽出する

    const tracks = []; // VRM用のKeyframeTrackをこの配列に格納する

    clip.tracks.forEach( ( track ) => {
      // 各TrackをVRM向けに変換し、 `tracks` に格納する
      const trackSplitted = track.name.split( '.' );
      const mixamoRigName = trackSplitted[ 0 ];
      const vrmBoneName = mixamoVRMRigMap[ mixamoRigName ];

      console.log('mixamoRigName: ', mixamoRigName, ' mechName: ',vrmBoneName );
      
      const vrmNodeName = vrm.scene?.getObjectByName(vrmBoneName)?.name;
      
      if ( vrmNodeName != null ) {
        const propertyName = trackSplitted[ 1 ];

        if ( track instanceof THREE.QuaternionKeyframeTrack ) {
          let vals = track.values;
          if(false && (vrmNodeName == 'L_foot_SCJNT_000' 
          || vrmNodeName == 'L_foot_SCJNT_001'
          || vrmNodeName == 'L_foot_SCJNT_002'
          || vrmNodeName == 'R_foot_SCJNT_000'
          || vrmNodeName == 'R_foot_SCJNT_001'
          || vrmNodeName == 'R_foot_SCJNT_002'
          )
           ){
            let newVals = [];
            for(let i=0; i<vals.length; i+=4){
              // var euler = new THREE.Euler(0, Math.PI, 0);
              // var quaternion = new THREE.Quaternion();
              // quaternion.setFromEuler(euler);
                //let vector = new THREE.Vector3(vals[0],vals[1],vals[2])
              // rotation.setFromQuaternion( quaternion )
              // var angle = Math.PI;
                //var angle = Math.PI/2;
              // var axis = new THREE.Vector3( 1, 0, 0 );
                //var axis = new THREE.Vector3( 0, 1, 0 );
              // var axis = new THREE.Vector3( 0, 0, 1 );
              // var axis = new THREE.Vector3( -1, 0, 0 );
              // var axis = new THREE.Vector3( 0, -1, 0 );
              // var axis = new THREE.Vector3( 0, 0, -1 );

              // var axis = new THREE.Vector3( 1, 1, 0 );
              // var axis = new THREE.Vector3( 0, 1, 1 );
              // var axis = new THREE.Vector3( 1, 0, 1 );
              // var axis = new THREE.Vector3( -1, 1, 0 );
              // var axis = new THREE.Vector3( 0, -1, 1 );
              // var axis = new THREE.Vector3( -1, 0, 1 );
              // var axis = new THREE.Vector3( 1, -1, 0 );
              // var axis = new THREE.Vector3( 0, 1, -1 );
              // var axis = new THREE.Vector3( 1, 0, -1 );

              // var axis = new THREE.Vector3( 1, 1, 1 );
              // var axis = new THREE.Vector3( -1, 1, 1 );
              // var axis = new THREE.Vector3( 1, -1, 1 );
              // var axis = new THREE.Vector3( 1, 1, -1 );
              // var axis = new THREE.Vector3( -1, -1, 1 );
              // var axis = new THREE.Vector3( 1, -1, -1 );
              // var axis = new THREE.Vector3( -1, 1, -1 );


              // vector.applyAxisAngle( axis, angle );

              // let vector = new THREE.Vector3(vals[0],vals[1],vals[2])

              // var angle2 = Math.PI;
              // var axis2 = new THREE.Vector3( 1, 0, 0 );
              // var axis2 = new THREE.Vector3( 0, 1, 0 );
              // var axis2 = new THREE.Vector3( 0, 0, 1 );

              // var axis2 = new THREE.Vector3( 1, 1, 0 );
              // var axis2 = new THREE.Vector3( 0, 1, 1 );
              // var axis2 = new THREE.Vector3( 1, 0, 1 );
              // vector.applyAxisAngle( axis2, angle2 );

              // var angle1 = Math.PI/2;
              // var axis1 = new THREE.Vector3( 0, 1, 0 );
              // vector.applyAxisAngle( axis1, angle1 );

              // var angle3 = Math.PI/2;
              // var axis3 = new THREE.Vector3( 0, 0, 1 );
              // vector.applyAxisAngle( axis3, angle3 );


              // const quaternion = new THREE.Quaternion();
              // quaternion.setFromAxisAngle( new THREE.Vector3( vals[i],vals[i+1],vals[i+2] ), vals[i+3] );

              let vector = new THREE.Vector3(vals[i],vals[i+1],vals[i+2])
              // const vector = new THREE.Vector3( 1, 1, 1 );
              // vector.applyQuaternion( quaternion );

              var angle3 = Math.PI/2;
              var axis3 = new THREE.Vector3( 0, 0, 1 );
              // vector.applyQuaternion( quaternion );
              vector.applyAxisAngle( axis3, angle3 );


              const quaternion = new THREE.Quaternion();
              quaternion.setFromAxisAngle( new THREE.Vector3( vals[i],vals[i+1],vals[i+2] ), Math.PI/2 );
              // quaternion.identity();
              var euler = new THREE.Euler(Math.PI*0.5, Math.PI*0.5, 0);
              quaternion.setFromEuler(euler);

              // quaternion.setFromRotationMatrix(new Matrix)

              // rotation.setFromQuaternion( quaternion )


              // cube.rotateOnAxis(axis1, angle1);
              // cube.rotateOnAxis(axis2, angle2);

              newVals[i] = quaternion.x;
              newVals[i+1] = quaternion.y;
              newVals[i+2] = quaternion.z;
              newVals[i+3] = quaternion.w;
              

              // newVals[i] = vector.x;
              // newVals[i+1] = vector.y;
              // newVals[i+2] = vector.z;
              // newVals[i+3] = vals[i+3];
            }
            vals = newVals;
          }
          tracks.push( new THREE.QuaternionKeyframeTrack(
            `${ vrmNodeName }.${ propertyName }`,
            track.times,
            vals.map( ( v, i ) => (
              ( vrm.meta?.metaVersion === '3' && ( i % 2 ) === 0 ) ? -v : v
            ) ),
          ) );
        } else if ( track instanceof THREE.VectorKeyframeTrack ) {
          tracks.push( new THREE.VectorKeyframeTrack(
            `${ vrmNodeName }.${ propertyName }`,
            track.times,
            track.values.map( ( v, i ) => (
              ( ( vrm.meta?.metaVersion === '3' && ( i % 3 ) !== 1 ) ? -v : v ) * 0.01
            ) ),
          ) );
        }
      }
    } );
    
    return new THREE.AnimationClip( 'vrmAnimation', clip.duration, tracks );
  } );
}
