import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';

const NEWS_BASE_URL = ' https://newsapi.org/v2/everything';
const NEWS_API_KEY = process.env.NEWSAPI_API_KEY;


if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
  console.log('Firebase Initialized');
}
const firestore = firebase.firestore();
const articleStore = firestore.collection('articles');

export default async (req, res) => {
  try {
    console.log(req.body);
    const { query } = req.query;

    const snapshot = await articleStore.doc(query).get();
    if (snapshot.exists) {
      console.log(`Return from firestore ${query}`);
      return res.json(snapshot.data()['articles']);
    }

    const response = await axios.get(NEWS_BASE_URL, {
      params: { q: query, pageSize: 6, apiKey: NEWS_API_KEY },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { articles } = response.data;
    await articleStore.doc(query).set(response.data);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error });
  }
};
