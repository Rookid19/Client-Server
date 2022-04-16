import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default async function handler(req, res) {
   //    a();
   const mainData = [];
   const q = query(collection(db, "UserInfo"));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
      mainData.push(doc.data().email);
   });
   let qouteUrl = `https://cloud.iexapis.com/stable/stock/AAPL/quote?token=${process.env.IEX_API_KEY}`;
   let chartUrl = `https://cloud.iexapis.com/stable/stock/AAPL/chart/1d?token=${process.env.IEX_API_KEY}`;

   await fetch(chartUrl)
      .then((response) => response.json())
      .then((data) => {
         //  console.log(data.length);
         let oldPrice = JSON.stringify(data[0].close);
         let newPrice = JSON.stringify(data[10].close);
         let gain = newPrice - oldPrice;
         let percentageGain = (gain/oldPrice)
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
