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
   let IEX_API_KEY = "pk_90c3c41220f34be0923e7849242f4814";
   let qouteUrl = `https://cloud.iexapis.com/stable/stock/AAPL/quote?token=${IEX_API_KEY}`;

   console.log("qoute----> " + qouteUrl);
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
