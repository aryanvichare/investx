import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';

const API = 'https://esg-environmental-social-governance-data.p.rapidapi.com/search';

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = process.env.RAPID_API_HOST;
const FMP_CLOUD_API_KEY = process.env.FMP_CLOUD_API_KEY;

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
  console.log('Firebase Initialized');
}
const firestore = firebase.firestore();
const ratioStore = firestore.collection('ratios');

export default async (req, res) => {
  const symbol = req.query.symbol.toUpperCase()

  const snapshot = await ratioStore.doc(symbol).get();
  if (snapshot.exists) {
    console.log(`Return from firestore ${symbol}`);
    return res.json(snapshot.data());
  }

  const resp = await axios.get(`https://fmpcloud.io/api/v3/ratios/${symbol}?period=quarter&limit=1&apikey=${FMP_CLOUD_API_KEY}`);

  const data = {
    'ratios': resp.data
  };
  await ratioStore.doc(symbol).set(data);
  res.status(200).json(data);
};
