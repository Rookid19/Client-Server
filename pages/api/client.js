import { auth } from "../../firebase";

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

export default function handler(req, res) {
   //    res.status(200).json({ name: "John Doe" });
   a();
   console.log(b);
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
