/**
 * Mixamoのリグ名をVRMのHumanoidボーン名に変換する
 */

/* CyberBroker Mech Bone Structure
-|C_hips_001_SCJNT_000
  -|L_leg_SCJNT_000
   -|L_leg_SCJNT_001
    -|L_foot_SCJNT_000
     -|L_foot_SCJNT_001
      -|L_foot_SCJNT_002
  -|R_leg_SCJNT_000
   -|R_leg_SCJNT_001
    -|R_foot_SCJNT_000
     -|R_foot_SCJNT_001
      -|R_foot_SCJNT_002
  -|C_spine_001_SCJNT_000
   -|C_spine_001_SCJNT_001
    -|C_spine_001_SCJNT_002
     -|C_spine_001_SCJNT_003
      -|C_spine_001_SCJNT_004
       -|C_neck_001_SCJNT_000
        -|C_head_001_SCJNT_000
         -|C_head_001_SCJNT_001
         -|L_eye_001_SCJNT_000
         -|R_eye_001_SCJNT_000
         -|C_jaw_001_SCJNT_000
          -|C_jaw_001_SCJNT_001
      -|L_shoulder_001_SCJNT_000
       -|L_arm_001_SCJNT_000
        -|L_arm_001_SCJNT_001
         -|L_hand_001_SCJNT_000
          -|L_hand_001_SCJNT_001
          -|L_finger_001_SCJNT_001
           -|L_finger_001_SCJNT_002
            -|L_finger_001_SCJNT_003
             -|L_finger_001_SCJNT_004
          -|L_finger_002_SCJNT_001
           -|L_finger_002_SCJNT_002
            -|L_finger_002_SCJNT_003
             -|L_finger_002_SCJNT_004
          -|L_finger_003_SCJNT_001
           -|L_finger_003_SCJNT_002
            -|L_finger_003_SCJNT_003
             -|L_finger_003_SCJNT_004
      -|R_shoulder_001_SCJNT_000
       -|R_arm_001_SCJNT_000
        -|R_arm_001_SCJNT_001
         -|R_hand_001_SCJNT_000
          -|R_hand_001_SCJNT_001
          -|R_finger_001_SCJNT_001
           -|R_finger_001_SCJNT_002
            -|R_finger_001_SCJNT_003
             -|R_finger_001_SCJNT_004
          -|R_finger_002_SCJNT_001
           -|R_finger_002_SCJNT_002
            -|R_finger_002_SCJNT_003
             -|R_finger_002_SCJNT_004
          -|R_finger_003_SCJNT_001
           -|R_finger_003_SCJNT_002
            -|R_finger_003_SCJNT_003
             -|R_finger_003_SCJNT_004
*/

const mixamoVRMRigMap = {
  'mixamorigHips': 'C_hips_001_SCJNT_000',
  'mixamorigSpine': 'C_spine_001_SCJNT_000',
  'mixamorigSpine1': 'C_spine_001_SCJNT_002',
  'mixamorigSpine2': 'C_spine_001_SCJNT_004',
  'mixamorigSpine3': 'C_spine_001_SCJNT_003', // Not Used but available in mech
  'mixamorigSpine4': 'C_spine_001_SCJNT_004', // Not Used but available in mech
  'mixamorigNeck': 'C_neck_001_SCJNT_000',
  'mixamorigHead': 'C_head_001_SCJNT_001',
  'mixamorigHeadTop_End': 'C_head_001_SCJNT_001', // Not Used but available in mech

  // Left Arm
  'mixamorigLeftShoulder': 'L_shoulder_001_SCJNT_000',
  'mixamorigLeftArm': 'L_arm_001_SCJNT_000',
  'mixamorigLeftForeArm': 'L_arm_001_SCJNT_001',
  'mixamorigLeftHand': 'L_hand_001_SCJNT_000',

  // Left Hand
  'mixamorigLeftHandThumb1': 'L_finger_001_SCJNT_001',
  'mixamorigLeftHandThumb2': 'L_finger_001_SCJNT_002',
  'mixamorigLeftHandThumb3': 'L_finger_001_SCJNT_003',
  'mixamorigLeftHandThumb4': 'L_finger_001_SCJNT_004', // Added and present

  'mixamorigLeftHandIndex1': '', // Missing in mech
  'mixamorigLeftHandIndex2': '', // Missing in mech
  'mixamorigLeftHandIndex3': '', // Missing in mech
  'mixamorigLeftHandIndex4': '', // Missing in mech

  'mixamorigLeftHandMiddle1': 'L_finger_002_SCJNT_001',
  'mixamorigLeftHandMiddle2': 'L_finger_002_SCJNT_002',
  'mixamorigLeftHandMiddle3': 'L_finger_002_SCJNT_003',
  'mixamorigLeftHandMiddle4': 'L_finger_002_SCJNT_004', // Added and present

  'mixamorigLeftHandRing1': '', // Missing in mech
  'mixamorigLeftHandRing2': '', // Missing in mech
  'mixamorigLeftHandRing3': '', // Missing in mech
  'mixamorigLeftHandRing4': '', // Missing in mech

  'mixamorigLeftHandPinky1': 'L_finger_003_SCJNT_001',
  'mixamorigLeftHandPinky2': 'L_finger_003_SCJNT_002',
  'mixamorigLeftHandPinky3': 'L_finger_003_SCJNT_003',
  'mixamorigLeftHandPinky4': 'L_finger_003_SCJNT_004', // Added and present

  // Right Arm
  'mixamorigRightShoulder': 'R_shoulder_001_SCJNT_000',
  'mixamorigRightArm': 'R_arm_001_SCJNT_000',
  'mixamorigRightForeArm': 'R_arm_001_SCJNT_001',
  'mixamorigRightHand': 'R_hand_001_SCJNT_000',

  // Right Hand
  'mixamorigRightHandPinky1': 'R_finger_003_SCJNT_001',
  'mixamorigRightHandPinky2': 'R_finger_003_SCJNT_002',
  'mixamorigRightHandPinky3': 'R_finger_003_SCJNT_003',
  'mixamorigRightHandPinky4': 'R_finger_003_SCJNT_004', // Added and present

  'mixamorigRightHandRing1': '', // Missing in mech
  'mixamorigRightHandRing2': '', // Missing in mech
  'mixamorigRightHandRing3': '', // Missing in mech
  'mixamorigRightHandRing4': '', // Missing in mech

  'mixamorigRightHandMiddle1': 'R_finger_002_SCJNT_001',
  'mixamorigRightHandMiddle2': 'R_finger_002_SCJNT_002',
  'mixamorigRightHandMiddle3': 'R_finger_002_SCJNT_003',
  'mixamorigRightHandMiddle4': 'R_finger_002_SCJNT_004', // Added and present

  'mixamorigRightHandIndex1': '', // Missing in mech
  'mixamorigRightHandIndex2': '', // Missing in mech
  'mixamorigRightHandIndex3': '', // Missing in mech
  'mixamorigRightHandIndex4': '', // Missing in mech

  'mixamorigRightHandThumb1': 'R_finger_001_SCJNT_001',
  'mixamorigRightHandThumb2': 'R_finger_001_SCJNT_002',
  'mixamorigRightHandThumb3': 'R_finger_001_SCJNT_003',
  'mixamorigRightHandThumb4': 'R_finger_001_SCJNT_004', // Added and present

  // Left Leg
  'mixamorigLeftUpLeg': 'L_leg_SCJNT_000',
  'mixamorigLeftLeg': 'L_leg_SCJNT_001',
  'mixamorigLeftFoot': 'L_foot_SCJNT_000',
  'mixamorigLeftToeBase': 'L_foot_SCJNT_001',
  'mixamorigLeftToe_End': 'L_foot_SCJNT_002', // Added and present

  // Right Leg
  'mixamorigRightUpLeg': 'R_leg_SCJNT_000',
  'mixamorigRightLeg': 'R_leg_SCJNT_001',
  'mixamorigRightFoot': 'R_foot_SCJNT_000',
  'mixamorigRightToeBase': 'R_foot_SCJNT_001',
  'mixamorigRightToe_End': 'R_foot_SCJNT_002', // Added and present
};

/* These are not in use but kept for reference */
const mixamoVRMRigMap_orig = {
  'mixamorigHips': 'hips',
  'mixamorigSpine': 'spine',
  'mixamorigSpine1': 'chest',
  'mixamorigSpine2': 'upperChest',
  'mixamorigNeck': 'neck',
  'mixamorigHead': 'head',
  'mixamorigLeftShoulder': 'leftShoulder',
  'mixamorigLeftArm': 'leftUpperArm',
  'mixamorigLeftForeArm': 'leftLowerArm',
  'mixamorigLeftHand': 'leftHand',

  'mixamorigLeftHandThumb1': 'leftThumbProximal',
  'mixamorigLeftHandThumb2': 'leftThumbIntermediate',
  'mixamorigLeftHandThumb3': 'leftThumbDistal',
  'mixamorigLeftHandIndex1': 'leftIndexProximal',
  'mixamorigLeftHandIndex2': 'leftIndexIntermediate',
  'mixamorigLeftHandIndex3': 'leftIndexDistal',
  'mixamorigLeftHandMiddle1': 'leftMiddleProximal',
  'mixamorigLeftHandMiddle2': 'leftMiddleIntermediate',
  'mixamorigLeftHandMiddle3': 'leftMiddleDistal',
  'mixamorigLeftHandRing1': 'leftRingProximal',

  'mixamorigLeftHandRing2': 'leftRingIntermediate',
  'mixamorigLeftHandRing3': 'leftRingDistal',

  'mixamorigLeftHandPinky1': 'leftLittleProximal',
  'mixamorigLeftHandPinky2': 'leftLittleIntermediate',
  'mixamorigLeftHandPinky3': 'leftLittleDistal',

  'mixamorigRightShoulder': 'rightShoulder',
  'mixamorigRightArm': 'rightUpperArm',
  'mixamorigRightForeArm': 'rightLowerArm',
  'mixamorigRightHand': 'rightHand',

  'mixamorigRightHandPinky1': 'rightLittleProximal',
  'mixamorigRightHandPinky2': 'rightLittleIntermediate',
  'mixamorigRightHandPinky3': 'rightLittleDistal',
  'mixamorigRightHandRing1': 'rightRingProximal',
  'mixamorigRightHandRing2': 'rightRingIntermediate',
  'mixamorigRightHandRing3': 'rightRingDistal',
  'mixamorigRightHandMiddle1': 'rightMiddleProximal',
  'mixamorigRightHandMiddle2': 'rightMiddleIntermediate',
  'mixamorigRightHandMiddle3': 'rightMiddleDistal',

  'mixamorigRightHandIndex1': 'rightIndexProximal',
  'mixamorigRightHandIndex2': 'rightIndexIntermediate',
  'mixamorigRightHandIndex3': 'rightIndexDistal',
  'mixamorigRightHandThumb1': 'rightThumbProximal',
  'mixamorigRightHandThumb2': 'rightThumbIntermediate',
  'mixamorigRightHandThumb3': 'rightThumbDistal',

  'mixamorigLeftUpLeg': 'leftUpperLeg',
  'mixamorigLeftLeg': 'leftLowerLeg',
  'mixamorigLeftFoot': 'leftFoot',
  'mixamorigLeftToeBase': 'leftToes',

  'mixamorigRightUpLeg': 'rightUpperLeg',
  'mixamorigRightLeg': 'rightLowerLeg',
  'mixamorigRightFoot': 'rightFoot',
  'mixamorigRightToeBase': 'rightToes',
};
