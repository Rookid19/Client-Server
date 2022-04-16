import { collection, onSnapshot } from "firebase/firestore";

import { auth, db } from "../../firebase";
import react from "react";

const users = [
   {
      id: "acct_273wbuwbu",
      firstName: "Grey",
      lastName: "Hennesay",
      holdings: {
         company: "Amazon, Inc",
         ticker: "AMZN",
         gain: "$327.89",
         timestamp: "2692262672",
      },
   },
   {
      id: "acct_2537839j3hewjw",
      firstName: "Rae",
      lastName: "Morgan",
      holdings: {
         comppany: "Tesla, Inc.",
         ticker: "TSLA",
         gain: "-$55.90",
         timestamp: "27822667787",
      },
   },
];
const b = [];
const a = () => {
   const unsub = onSnapshot(
      collection(db, "UserInfo", "randy@gmail.com", "Deposit"),
      (snapshot) => {
         //  setTransferDeposit(
         b.push(
            snapshot.docs.map((doc) => ({
               data: doc.data(),
            }))
         );
      }
   );

   return unsub;
};

const mainData = [];
const q = query(
   collection(db, PARTNERS_TABLE),
   where("username", "==", username),
   where("password", "==", password),
   where("approved", "==", true)
);
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
   mainData.push(doc.data());
});

export default function handler(req, res) {
   a();
   console.log("lenght---> " + b.length);

   //    res.status(200).json({ name: "John Doe" });
   //    setInterval(() => {
   //       for (let i = 0; i < users.length; i++) {
   //          fetch("http://localhost:3000/api/server", {
   //             method: "POST",
   //             headers: {
   //                "Content-Type": "application/json",
   //             },
   //             body: JSON.stringify(users[i]),
   //          });
   //       }
   //    }, 3000);
}

handler();
