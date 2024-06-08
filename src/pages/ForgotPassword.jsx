import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import OAuth from "../components/OAuth";
import Oauth from "../components/Oauth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset password Link sent to your Gmail Address");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }

  return (
    <section>
      <h1 className="mt-6 text-3xl font-bold text-center">Forgot Password </h1>

      <div className="flex flex-wrap items-center justify-center max-w-6xl px-6 py-12 mx-auto ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5fGVufDB8fDB8fHww"
            alt="key"
            className="w-full rounded-3xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="w-full px-4 py-2 mb-6 text-xl text-gray-700 transition ease-in-out bg-white rounded border-grey-300"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
            />

            <div className="flex justify-between text-sm whitespace-nowrap sm:text-lg">
              <p className="mb-6 ">
                Don't have a account?
                <Link
                  to={"/signup"}
                  className="ml-3 text-red-600 transition duration-200 ease-in-out hover:text-red-700"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to={"/signIn"}
                  className="ml-3 text-blue-700 transition duration-200 ease-in-out hover:text-blue-900"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-white uppercase shadow-md bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out mb-6 hover:shadow-lg active:bg-blue-800"
            >
              Send reset Password
            </button>
            <div className="flex items-center my-4 before:border-t after:border-t before:flex-1 after:flex-1 before:border-gray-300 after:border-gray-300">
              <p className="mx-4 font-semibold text-center">OR</p>
            </div>
            <Oauth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
