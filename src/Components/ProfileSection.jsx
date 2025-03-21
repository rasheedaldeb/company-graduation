import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const ProfileSection = () => {
  const companyId = localStorage.getItem("companyId");
  const token = localStorage.getItem("companytoken");
  const navigate = useNavigate();
  // get prev company data states
  const [prevProfil, setPrevProfile] = useState({
    name: "",
    email: "",
    wallet: "",
    desc: "",
    mission: "",
    vision: "",
    facebook: "",
    twitter: "",
    insta: "",
    whatsapp: "",
    telegram: "",
    linkedin: "",
  });
  // company data states
  const [openAboutUsForm, setOpenAboutUsForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [error, setError] = useState("");
  const [companyProfileData, setCompanyProfileData] = useState();
  // add and  about us states
  const [desc, setDesc] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [added, setAdded] = useState(false);
  const [aboutUsError, setAboutUsError] = useState("");
  const [aboutUsSuccess, setAboutUsSuccess] = useState("");
  // add and social media states
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [insta, setInsta] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialError, setSocialError] = useState("");
  const [socialSuccess, setSocialSuccess] = useState("");
  // update name and email profile states
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  // update info form data
  const updateData = new FormData();
  updateData.append("name", prevProfil.name);
  updateData.append("email", prevProfil.email);
  updateData.append("description", prevProfil.desc);
  updateData.append("walletBalance", prevProfil.wallet);
  updateData.append("mission", prevProfil.mission);
  updateData.append("vision", prevProfil.vision);
  updateData.append("facebook", prevProfil.facebook);
  updateData.append("twitter", prevProfil.twitter);
  updateData.append("instagram", prevProfil.insta);
  updateData.append("whatsapp", prevProfil.whatsapp);
  updateData.append("telegram", prevProfil.telegram);
  updateData.append("linkedin", prevProfil.linkedin);
  //  update profile data api request
  const updateProfileData = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/auth/editAccount/${companyId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        setIsUpdating(false);
        setUpdateSuccess(res.data.message);
        setTimeout(() => {
          setUpdateSuccess("");
        }, 2000);
        setOpenUpdateForm(false);
        setAdded(!added);
      })
      .catch((err) => {
        console.log(err);
        setIsUpdating(false);
        setUpdateError(err.response.data.message);
        setTimeout(() => {
          setUpdateError("");
        }, 2000);
      });
  };
  // social media form data
  const socialData = new FormData();
  facebook && socialData.append("facebook", facebook);
  twitter && socialData.append("twitter", twitter);
  insta && socialData.append("instagram", insta);
  whatsapp && socialData.append("whatsapp", whatsapp);
  telegram && socialData.append("telegram", telegram);
  linkedin && socialData.append("linkedin", linkedin);
  // add social media api request
  const addSocialMedia = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/socialMedia`, socialData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        setSocialSuccess(res.data.message);
        setTimeout(() => {
          setSocialSuccess("");
        }, 2000);
        setOpenAboutUsForm(false);
        setAdded(!added);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        setSocialError(err.response.data.message);
        setTimeout(() => {
          setSocialError("");
        }, 2000);
      });
  };
  // about us api request
  const sendAboutUs = async (e) => {
    e.preventDefault();
    setIsSending(true);
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/about_us`,
        {
          description: desc,
          mission: mission,
          vision: vision,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        setAboutUsSuccess(res.data.message);
        setTimeout(() => {
          setAboutUsSuccess("");
        }, 2000);
        setIsSending(false);
        setOpenAboutUsForm(false);
        setAdded(!added);
      })
      .catch((err) => {
        console.log(err);
        setIsSending(false);
        setAboutUsError(err.response.data.message);
        setTimeout(() => {
          setAboutUsError("");
        }, 2000);
        if (e.response.status === 401) {
          alert("انتهت صلاحية الجلسة سجل الدخول مرة اخرى");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      });
  };
  //   fetch profile data api request
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/account/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setCompanyProfileData(res.data.data);
        setPrevProfile({
          name: res.data.data.name,
          email: res.data.data.email,
          wallet: res.data.data.walletBalance,
        });
      } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
          alert("انتهت صلاحية الجلسة سجل الدخول مرة اخرى");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      }
    };
    fetchCompanyData();
  }, [added]);
  // fetch prev aboutUs api request
  useEffect(() => {
    const fetchPrevAboutUs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/about_us/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPrevAboutUs();
  }, []);
  // fetch prev social media api request
  useEffect(() => {
    const fetchPrevSocialMedia = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/socialMedia/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPrevSocialMedia();
  }, []);
  return (
    // profile jsx
    <section className="flex flex-col items-center gap-10">
      <SectionHeader title="حسابي" />
      <div
        className="bg-secondary flex min-h-[460px] w-[600px] flex-col items-center justify-center rounded-lg p-5"
        dir="rtl"
      >
        {companyProfileData ? (
          <div>
            {/* company image and name */}
            <div className="top flex w-full flex-col items-center border-b border-white py-5">
              <img
                src={`https://real-estate-app-i5m8.onrender.com${companyProfileData.profileImageUrl}`}
                alt="avatar"
                className="h-[150px] w-[150px] rounded-full border border-gray-200 p-3"
              />
              <h3 className="text-3xl font-bold text-white">
                {companyProfileData.name}
              </h3>
            </div>
            {/* company email and number */}
            <div className="flex flex-col gap-10">
              <div className="email_nomber flex w-full items-center gap-10 border-b border-white py-5">
                <h4 className="text-2xl font-bold text-white">
                  {companyProfileData.email}
                </h4>
                <h4 className="text-2xl font-bold text-white">
                  {companyProfileData.phone}
                </h4>
              </div>
              <div className="location-authCode flex w-full items-center justify-between border-b border-white py-5">
                <div className="flex flex-col items-center gap-5">
                  <h3 className="text-2xl font-bold text-white">العنوان</h3>
                  <h4 className="text-2xl font-bold text-white">
                    {companyProfileData.location}
                  </h4>
                </div>
                <div className="flex flex-col items-center gap-5">
                  <h2 className="text-2xl font-bold text-white">
                    رقم السجل التجاري
                  </h2>
                  <h4 className="text-2xl font-bold text-white">
                    {companyProfileData.authCode}
                  </h4>
                </div>
              </div>
              <div className="py-5">
                <p className="flex flex-col items-center gap-5 text-center text-2xl font-bold text-white">
                  <h4>تم الانشاء بتاريخ :</h4>
                  {companyProfileData.createdAt}
                </p>
              </div>
              {/* success message  */}
              {aboutUsSuccess && (
                <div className="flex items-center justify-center text-xl text-green-500">
                  {aboutUsSuccess}
                </div>
              )}
              {socialSuccess && (
                <div className="flex items-center justify-center text-xl text-green-500">
                  {socialSuccess}
                </div>
              )}
              {updateSuccess && (
                <div className="flex items-center justify-center text-xl text-green-500">
                  {updateSuccess}
                </div>
              )}
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-bold text-white">المحفظة</h4>
                <p className="rounded-sm border border-white px-7 py-3 text-xl font-bold text-white">
                  {companyProfileData.walletBalance}$
                </p>
              </div>
              {/* update and add info buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setOpenUpdateForm(!openUpdateForm)}
                  className="text-secondary flex h-[52px] w-[150px] cursor-pointer items-center justify-center rounded-lg bg-white text-[17px] font-medium"
                >
                  تعديل المعلومات
                </button>
                <button
                  onClick={() => setOpenAboutUsForm(!openAboutUsForm)}
                  className="text-secondary flex h-[52px] w-[210px] cursor-pointer items-center justify-center rounded-lg bg-white text-[17px] font-medium"
                >
                  اضافة معلومات الى الحساب
                </button>
              </div>
              {/* add about us jsx */}
              <div className={`${openAboutUsForm ? "block" : "hidden"} `}>
                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => sendAboutUs(e)}
                >
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة وصف للشركة
                    </label>
                    <textarea
                      placeholder="اضف وصف"
                      required
                      onChange={(e) => setDesc(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                    ></textarea>
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة هدف للشركة
                    </label>
                    <input
                      name="name"
                      type="text"
                      onChange={(e) => setMission(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الهدف "
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة رؤية للشركة
                    </label>
                    <input
                      name="name"
                      type="text"
                      onChange={(e) => setVision(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرؤية "
                    />
                  </div>
                  {aboutUsError && (
                    <div className="flex items-center justify-center text-xl text-red-600">
                      {aboutUsError}
                    </div>
                  )}
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="text-secondary flex h-[52px] w-[150px] cursor-pointer items-center justify-center rounded-lg bg-white text-[17px] font-medium"
                    >
                      {isSending ? (
                        <Oval
                          visible={true}
                          height="30"
                          width="30"
                          color="#fff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "ارسال"
                      )}
                    </button>
                  </div>
                </form>
                {/* add social jsx */}
                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => addSocialMedia(e)}
                >
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة رابط فيسبوك
                    </label>
                    <input
                      name="name"
                      type="url"
                      onChange={(e) => setFacebook(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط "
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة رابط تويتر
                    </label>
                    <input
                      name="name"
                      type="url"
                      onChange={(e) => setTwitter(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط "
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة رابط انستاغرام
                    </label>
                    <input
                      name="name"
                      type="url"
                      onChange={(e) => setInsta(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط "
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة رابط واتس اب
                    </label>
                    <input
                      name="name"
                      type="url"
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط "
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة رابط تلغرام
                    </label>
                    <input
                      name="name"
                      type="url"
                      onChange={(e) => setTelegram(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط "
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      اضافة رابط لينكدان
                    </label>
                    <input
                      name="name"
                      type="url"
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط "
                    />
                  </div>
                  {/* error messages */}
                  {socialError && (
                    <div className="flex items-center justify-center text-xl text-red-600">
                      {socialError}
                    </div>
                  )}
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="text-secondary flex h-[52px] w-[150px] cursor-pointer items-center justify-center rounded-lg bg-white text-[17px] font-medium"
                    >
                      {isSubmitting ? (
                        <Oval
                          visible={true}
                          height="30"
                          width="30"
                          color="#fff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "ارسال"
                      )}
                    </button>
                  </div>
                  {/* update info jsx */}
                </form>
              </div>
              <div className={`${openUpdateForm ? "block" : "hidden"}`}>
                <form
                  className="flex flex-col gap-10"
                  onSubmit={(e) => updateProfileData(e)}
                >
                  <div className="flex items-center justify-between">
                    <div className="name">
                      <label className="mb-2 block text-lg font-bold text-white">
                        الاسم
                      </label>
                      <input
                        type="text"
                        placeholder="ادخل اسمك"
                        value={prevProfil.name}
                        onChange={(e) =>
                          setPrevProfile({
                            ...prevProfil,
                            name: e.target.value,
                          })
                        }
                        className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      />
                    </div>
                    <div className="email">
                      <label className="mb-2 block text-lg font-bold text-white">
                        البريد الالكتروني
                      </label>
                      <input
                        type="email"
                        value={prevProfil.email}
                        onChange={(e) =>
                          setPrevProfile({
                            ...prevProfil,
                            email: e.target.value,
                          })
                        }
                        placeholder="ادخل بريدك الالكتروني "
                        className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="email">
                      <label className="mb-2 block text-lg font-bold text-white">
                        اضافة رصيد للمحفظة
                      </label>
                      <input
                        type="number"
                        value={prevProfil.wallet}
                        onChange={(e) =>
                          setPrevProfile({
                            ...prevProfil,
                            wallet: e.target.value,
                          })
                        }
                        placeholder="ادخل قيمة الرصيد "
                        className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل وصف الشركة
                    </label>
                    <textarea
                      placeholder="اضف وصف"
                      value={prevProfil.desc}
                      onChange={(e) =>
                        setPrevProfile({ ...prevProfil, desc: e.target.value })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                    ></textarea>
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل هدف الشركة
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={prevProfil.mission}
                      onChange={(e) =>
                        setPrevProfile({
                          ...prevProfil,
                          mission: e.target.value,
                        })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الهدف "
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل رؤية الشركة
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={prevProfil.vision}
                      onChange={(e) =>
                        setPrevProfile({
                          ...prevProfil,
                          vision: e.target.value,
                        })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرؤية "
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل رابط الفيسبوك
                    </label>
                    <input
                      name="name"
                      type="url"
                      value={prevProfil.facebook}
                      onChange={(e) =>
                        setPrevProfile({
                          ...prevProfil,
                          facebook: e.target.value,
                        })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط الجديد"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل رابط التويتر
                    </label>
                    <input
                      name="name"
                      type="url"
                      value={prevProfil.twitter}
                      onChange={(e) =>
                        setPrevProfile({
                          ...prevProfil,
                          twitter: e.target.value,
                        })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط الجديد"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل رابط الانستاغرام
                    </label>
                    <input
                      name="name"
                      type="url"
                      value={prevProfil.insta}
                      onChange={(e) =>
                        setPrevProfile({ ...prevProfil, insta: e.target.value })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط الجديد"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل رابط الواتس اب
                    </label>
                    <input
                      name="name"
                      type="url"
                      value={prevProfil.whatsapp}
                      onChange={(e) =>
                        setPrevProfile({
                          ...prevProfil,
                          whatsapp: e.target.value,
                        })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط الجديد"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل رابط التلغرام
                    </label>
                    <input
                      name="name"
                      type="url"
                      value={prevProfil.telegram}
                      onChange={(e) =>
                        setPrevProfile({
                          ...prevProfil,
                          telegram: e.target.value,
                        })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط الجديد"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-lg font-bold text-white">
                      تعديل رابط اللينكدان
                    </label>
                    <input
                      name="name"
                      type="url"
                      value={prevProfil.linkedin}
                      onChange={(e) =>
                        setPrevProfile({
                          ...prevProfil,
                          linkedin: e.target.value,
                        })
                      }
                      className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                      placeholder="ادخل الرابط الجديد"
                    />
                  </div>
                  {updateError && (
                    <div className="flex items-center justify-center text-xl text-red-600">
                      {updateError}
                    </div>
                  )}
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="text-secondary flex h-[52px] w-[150px] cursor-pointer items-center justify-center rounded-lg bg-white text-[17px] font-medium"
                    >
                      {isUpdating ? (
                        <Oval
                          visible={true}
                          height="30"
                          width="30"
                          color="#fff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "ارسال"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <Oval
            visible={true}
            height="40"
            width="40"
            color="#fff"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {error && (
          <div className="flex items-center justify-center text-xl text-red-600">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileSection;
