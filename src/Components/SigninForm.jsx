import axios from "axios";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [showPass, setShowPass] = useState(false);
  // signin states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignningIn, setIsSignningIn] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  // form object to send to the api
  const companySigninData = new FormData();
  companySigninData.append("email", email);
  companySigninData.append("password", password);
  // company signin api request
  const companySignin = async (e) => {
    e.preventDefault();
    setIsSignningIn(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        companySigninData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          if (res.data.data.role !== "company") {
            setIsSignningIn(false);
            setError("الايميل غير موجود , انشأ حساب جديد من فضلك");
          } else {
            setError("");
            setSuccess(res.data.message);
            setIsSignningIn(false);
            localStorage.setItem("companytoken", res.data.token);
            localStorage.setItem("companyId", res.data.data.id);
            localStorage.setItem("companyId2", res.data.data.companyId);
            navigate("/");
          }
        }, 2000);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
        setIsSignningIn(false);
      });
  };
  return (
    <section
      className="mt-10 flex w-full flex-col items-center gap-8"
      dir="rtl"
    >
      <h2 className="text-secondary text-3xl font-bold">
        تسجيل الدخول الى الحساب
      </h2>
      <form className="w-1/2" onSubmit={(e) => companySignin(e)}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              البريد الالكتروني
            </label>
            <input
              name="email"
              type="text"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none"
              placeholder="ادخل بريدك الالكتروني"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              كلمة المرور
            </label>
            <div className="border-primary flex h-[55px] w-full items-center justify-between rounded-3xl border bg-gray-100 px-4 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                className="h-full w-[80%] outline-none"
                placeholder="ضع كلمة المرور"
                required
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={
                  showPass ? "/public/images/eye.png" : "/images/closed-eye.png"
                }
                alt="eye"
                onClick={() => setShowPass(!showPass)}
                className="cursor-pointer"
              />
            </div>
          </div>
          {error ? (
            <div className="flex items-center justify-center text-xl text-red-600">
              {error}
            </div>
          ) : (
            <div className="flex items-center justify-center text-xl text-green-600">
              {success}
            </div>
          )}
          <div class="mt-5 flex w-full items-center justify-between">
            <p className="text-secondary flex items-center justify-center font-bold">
              ليس لديك حساب؟
              <Link to="/company-register" className="text-secondary underline">
                انشاء حساب
              </Link>
            </p>
            <button
              type="submit"
              class="bg-primary hover:bg-secondary block cursor-pointer rounded-3xl px-6 py-3 text-lg tracking-wider text-white"
            >
              {isSignningIn ? (
                <Oval
                  visible={true}
                  height="40"
                  width="40"
                  color="#fff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SigninForm;
