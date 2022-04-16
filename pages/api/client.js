import {
   addDoc,
   collection,
   doc,
   getDocs,
   onSnapshot,
   query,
   serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export default async function handler(req, res) {
   //    a();
   const emails = [];
   const q = query(collection(db, "UserInfo"));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
      emails.push(doc.data().email);
   });
   //    let qouteUrl = `https://cloud.iexapis.com/stable/stock/AAPL/quote?token=${process.env.IEX_API_KEY}`;
   let chartUrl = `https://cloud.iexapis.com/stable/stock/AAPL/chart/1d?token=${process.env.IEX_API_KEY}`;

   await fetch(chartUrl)
      .then((response) => response.json())
      .then((data) => {
         //  console.log(data.length);
         let oldPrice = JSON.stringify(data[0].close);
         let newPrice = JSON.stringify(data[10].close);
         let gain = newPrice - oldPrice;
         let percentageGain = (gain / oldPrice) * 100;

         onSnapshot(
            collection(db, "UserInfo", auth?.currentUser?.email, "Profile"),
            (snapshot) => {
               snapshot.docs.map((doc) => ({
                  data: doc.data(),
               }));
            }
         );
         emails.map((email) => {
            addDoc(doc(db, "UserInfo", email, "Graph", "1W", "Points"), {
               ticker: "AAPL",
               gain: gain,
               percentageGain: percentageGain,
               createdAt: serverTimestamp(),
            });
         });
      });

   //    setInterval(() => {
   //       for (let i = 0; i < mainData.length; i++) {
   //          fetch("http://localhost:3001/api/server", {
   //             method: "POST",
   //             headers: {
   //                "Content-Type": "application/json",
   //             },
   //             body: JSON.stringify(mainData[i]),
   //          });
   //       }
   //    }, 3000);
}

handler();
