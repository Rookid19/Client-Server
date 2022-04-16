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

   console.log(mainData[1])
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
