import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB6YxRVxhTlsbKlFbXYWTZ6PbRkLPCWrgA",
  authDomain: "activity-hatdog.firebaseapp.com",
  databaseURL: "https://activity-hatdog-default-rtdb.firebaseio.com",
  projectId: "activity-hatdog",
  storageBucket: "activity-hatdog.appspot.com",
  messagingSenderId: "442993496706",
  appId: "1:442993496706:web:de49b66728eba497deda9b",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
