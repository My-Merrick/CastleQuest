import { FcGoogle } from "react-icons/fc";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid); // Corrected document reference
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(), // Standardized field naming
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
      console.error("Google authorization error:", error); // Improved error logging
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onGoogleClick}
        className="flex items-center justify-center w-full py-3 text-sm font-medium tracking-wider text-white uppercase transition duration-150 ease-in-out bg-red-700 rounded shadow-md px-7 hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg"
      >
        <FcGoogle className="mr-2 text-2xl bg-white rounded-full" />
        Continue with Google
      </button>
    </div>
  );
};

export default Oauth;
