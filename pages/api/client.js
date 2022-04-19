import { async } from "@firebase/util";
import {
   addDoc,
   collection,
   doc,
   getDocs,
   query,
   serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export default async function handler(req, res) {
   const emails = [];
   const q = query(collection(db, "UserInfo"));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
      emails.push(doc.data().email);
   });

   let chartUrl = `https://cloud.iexapis.com/stable/stock/AAPL/chart/1d?token=${process.env.IEX_API_KEY}`;

   setInterval(async () => {
      await fetch(chartUrl)
         .then((response) => response.json())
         .then((data) => {
            console.log(data.length);
            let oldPrice = JSON.stringify(data[0].close);
            let newPrice = JSON.stringify(data[10].close);

            emails.map(async (email) => {
               // console.log(email);
               const q = query(collection(db, "UserInfo", email, "MyStocks"));
               const querySnapshot = await getDocs(q);
               querySnapshot.forEach((document, index) => {
                  // console.log("---> " + doc.data().ticker);
                  let gain = (newPrice - oldPrice) * document.data().ticker;
                  let percentageGain = (gain / oldPrice) * 100;
                  addDoc(doc(db, "UserInfo", email, "Graph", "1W", "Points"), {
                     ticker: "AAPL",
                     gain: gain,
                     percentageGain: percentageGain,
                     createdAt: serverTimestamp(),
                  });
               });
            });
         });
   }, 30000);
}

handler();
