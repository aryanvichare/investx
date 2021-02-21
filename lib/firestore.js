import { firestore } from './firebase';

export async function createUser(uid, data) {
  const userData = await fetchUserData(uid);
  const selectedImpact = userData?.impact ?? 'broad';
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data, impact: selectedImpact }, { merge: true });
}

export async function fetchUserData(uid) {
  const documentRef = firestore.collection('users').doc(uid);
  const snapshot = await documentRef.get();
  return snapshot.data();
}

export function updateImpactPreference(uid, newImpact) {
  return firestore.collection('users').doc(uid).update({ impact: newImpact });
}
