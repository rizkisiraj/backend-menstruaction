const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtCgn8xdmrnj8ZTE5zp8g5BogP0o7bG2o",
  authDomain: "menstruaction-b5dd1.firebaseapp.com",
  projectId: "menstruaction-b5dd1",
  storageBucket: "menstruaction-b5dd1.appspot.com",
  messagingSenderId: "726366381968",
  appId: "1:726366381968:web:fdbd1e1b21b390df523515",
  measurementId: "G-9GR7C0FS7K"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firestore.getFirestore(app);

const firebaseHelpers = {

  updateTotalDonation: async (id, totalDonation) => {
    const docRef = firestore.doc(db, 'donations', id);
    try {
      await firestore.updateDoc(docRef, {
        progressFund : totalDonation,
      })
    } catch(e) {
      throw e;
    }
  },

  updateDonors: async (orderId) => {
    try {
      const arr = orderId.split("-");
      const id = arr[0];
      const q = firestore.query(firestore.collection(db, 'donations', id, 'donors'), firestore.where('order_id', '==', orderId));
    
      const querySnapshot = await firestore.getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await firestore.updateDoc(doc.ref, {
          isDonated: true
        });

        const docRef = firestore.doc(db, 'donations', id);
        const donationSnap = await firestore.getDoc(docRef);
        const progressFundTemp = donationSnap.data().progressFund + doc.data().totalDonation;
        const targetFund = donationSnap.data().targetFund;
        try {
          if(progressFundTemp >= targetFund) {
            await firestore.updateDoc(docRef, {
              isFinish : true,
            });
          }
          await firestore.updateDoc(docRef, {
            progressFund : donationSnap.data().progressFund + doc.data().totalDonation,
          });
        } catch(e) {
          console.log(e);
        }
      })
    } catch(e) {
      console.log(e);
    }

  },
}

// const updateDonors = async (orderId) => {
//   const arr = orderId.split("-");
//   const id = arr[0];
//   console.log(id);
//   const q = firestore.query(firestore.collection(db, 'donations', id, donors), firestore.where('order_id', '==', orderId));

//   const querySnapshot = await firestore.getDocs(q);
//   querySnapshot.forEach(async (doc) => {
//     await firestore.updateDoc(doc.ref, {
//       isDonated: true
//     });

//     updateTotalDonation(id, doc.data().totalDonation);

//   })
  

  
// }

// const updateTotalDonation = async (id, totalDonation) => {
//     const docRef = firestore.doc(db, 'donations', id);
//     try {
//       await firestore.updateDoc(docRef, {
//         progressFund : totalDonation,
//       })
//     } catch(e) {
//       console.log(e);
//     }
// }

module.exports = {firebaseHelpers};