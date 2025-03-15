import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ComplaintSection = () => {
  const token = localStorage.getItem("companytoken");
  const navigate = useNavigate();
  // fetch complaints states
  const [myComplaints, setMyComplaints] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const fetchCompanyComplaints = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/complaint/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
      } catch (e) {
        console.log(e);
        if (e.status === 401) {
          alert(e.response.data.message);
          navigate("/company-signin");
        }
      }
    };
    fetchCompanyComplaints();
  }, []);
  return (
    <section className="flex flex-col gap-10 px-10">
      <input
        type="text"
        placeholder="ابحث"
        className="border-primary h-[50px] w-full rounded-3xl border px-3 outline-none"
        dir="rtl"
      />
      <div className="complaints max-h-screen overflow-y-scroll" dir="rtl">
        <div className="complaint border-primary flex items-center justify-between border-b pb-3">
          <div className="name flex flex-col items-center gap-3">
            <h4 className="text-primary text-xl font-bold">اسم المستخدم</h4>
            <p className="text-secondary text-lg font-bold">رشيد</p>
          </div>
          <div className="email flex flex-col items-center gap-3">
            <h4 className="text-primary text-xl font-bold">بريد المستخدم</h4>
            <p className="text-secondary text-lg font-bold">
              rasheed@gmail.com
            </p>
          </div>
          <div className="phone flex flex-col items-center gap-3">
            <h4 className="text-primary text-xl font-bold">رقم المستخدم</h4>
            <p className="text-secondary text-lg font-bold">0937071349</p>
          </div>
          <div className="complaint-content flex w-[30%] flex-col items-center gap-3">
            <h4 className="text-primary text-xl font-bold">الشكوى</h4>
            <p className="text-secondary text-lg font-bold">test test test</p>
          </div>
          <div className="flex items-center justify-center">
            <button className="cursor-pointer rounded-xl bg-red-500 px-6 py-3 text-white">
              حذف
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintSection;
