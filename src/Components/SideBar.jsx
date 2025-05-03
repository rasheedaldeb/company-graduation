import axios from "axios";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const token = localStorage.getItem("token");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    setIsLoggingOut(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setIsLoggingOut(false);
        console.log(res);
        localStorage.removeItem("companytoken");
        alert(res.data.message);
        navigate("/admin-signin");
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem("companytoken");
          localStorage.removeItem("companyId");
          navigate("/company-signin");
        }
      });
  };
  return (
    <aside className="border-primary fixed top-0 right-0 flex h-full w-[20%] flex-col items-center gap-6 overflow-hidden border-l">
      <div className="logo">
        <img
          src="/images/logo.png"
          alt="logo"
          className="h-[170px] w-[170px]"
          loading="lazy"
        />
      </div>
      <div className="profile">
        <Link to="/profile">
          <img src="/images/user.png" alt="profile" />
        </Link>
      </div>
      <div className="links">
        <ul className="flex flex-col items-center gap-8">
          <li>
            <Link to="/" className="text-secondary text-xl font-bold">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link to="/add-estate" className="text-secondary text-xl font-bold">
              اضافة عقار
            </Link>
          </li>
          <li>
            <Link to="/my-posts" className="text-secondary text-xl font-bold">
              منشوراتي
            </Link>
          </li>
          <li>
            <Link
              to="/registered-posts"
              className="text-secondary text-xl font-bold"
            >
              الحجوزات
            </Link>
          </li>
        </ul>
      </div>
      <div className="logout">
        <button
          onClick={logout}
          className="bg-primary cursor-pointer rounded-xl p-3 text-white"
        >
          {isLoggingOut ? (
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
            "تسجيل الخروج"
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
