import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../../firebase";


export default async function handler(req, res) {
   //    a();
   const mainData = [];
   const q = query(collection(db, "UserInfo", "randy@gmail.com", "Deposit"));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
      mainData.push(doc.data());
   });
   console.log("lenght---> " + mainData.length);

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
