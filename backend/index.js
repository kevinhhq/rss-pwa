const admin = require("firebase-admin");
const serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rss-pwa-ba0d0.firebaseio.com/"
});

const db = admin.database();
const ref = db.ref("newsData");
const newsRef = ref.child("newsA");
newsRef.set({
  title: "klhawsfasj",
  content: "sasdd",
  image: "shknandmnsa",
  source: "sdldsn",
  articles: "asadsdandsndsdnsjn"
});
