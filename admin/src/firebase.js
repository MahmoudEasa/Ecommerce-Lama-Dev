import { updateImgProduct } from "./redux/apiCalls/productApiCalls";
import { updateImgUser } from "./redux/apiCalls/userApiCalls";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  updateImgFailure,
  updateImgStart,
  updateImgSuccess,
} from "./redux/productRedux";
import {
  updateUserImgStart,
  updateUserImgSuccess,
  updateUserImgFailure,
} from "./redux/userRedux";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwrX96u8NHJY3CHm6PjRr0nfJoBJd1MoE",
  authDomain: "shop-ef540.firebaseapp.com",
  projectId: "shop-ef540",
  storageBucket: "shop-ef540.appspot.com",
  messagingSenderId: "653600017951",
  appId: "1:653600017951:web:62b138d478bcd5bbdb4f2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseImg = (file, dispatch, type) => {
  if (file) {
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress === 0 && type === "product" && dispatch(updateImgStart());
        progress === 0 && type === "user" && dispatch(updateUserImgStart());
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            if (type === "product") {
              updateImgProduct(dispatch, downloadURL);
              dispatch(updateImgSuccess());
            } else {
              updateImgUser(dispatch, downloadURL);
              dispatch(updateUserImgSuccess());
            }
          })
          .catch((err) => {
            if (type === "product") {
              dispatch(updateImgFailure());
            } else {
              dispatch(updateUserImgFailure());
            }
          });
      }
    );
  }
};
