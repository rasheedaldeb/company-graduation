import axios from "axios";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePostForm = () => {
  // get post id from url
  const { postId, type } = useParams();
  const token = localStorage.getItem("companytoken");
  const navigate = useNavigate();
  // prev data states
  const [isFetching, setIsFetching] = useState(false);
  const [prevData, setPrevData] = useState({
    mainImg: "",
    landArea: "",
    buildingArea: "",
    poolArea: "",
    area: "",
    location: "",
    salePrice: "",
    rentPrice: "",
    deposite: "",
    desc: "",
  });

  // update house states
  const [newImages, setNewImages] = useState([]);
  const [newMainImg, setNewMainImg] = useState("");
  const [previwImages, setPreviwImages] = useState([]);
  const [isSending, setISSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // update form data
  const updatePostData = new FormData();
  updatePostData.append("mainImage", prevData.mainImg);
  newImages.forEach((image) => {
    updatePostData.append("images", image);
  });
  prevData.landArea && updatePostData.append("landArea", prevData.landArea);
  prevData.buildingArea &&
    updatePostData.append("buildingArea", prevData.buildingArea);
  prevData.poolArea && updatePostData.append("poolArea", prevData.poolArea);

  updatePostData.append("area", prevData.area);
  updatePostData.append("location", prevData.location);
  updatePostData.append("salePrice", prevData.salePrice);
  updatePostData.append("rentPrice", prevData.rentPrice);
  updatePostData.append("deposit", prevData.deposite);
  updatePostData.append("description", prevData.desc);
  updatePostData.append("type", type);
  // upload images function
  const uploadMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    const newImages = files.map((image) => URL.createObjectURL(image));
    setPreviwImages((prev) => [...prev, ...newImages]);
  };
  // fetch prev post
  useEffect(() => {
    const fetchPrevData = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res.data);
        setPrevData({
          mainImg: res.data.data.mainImageUrl,
          landArea: res.data.data.Villa && res.data.data.Villa.landArea,
          buildingArea: res.data.data.Villa && res.data.data.Villa.buildingArea,
          poolArea: res.data.data.Villa && res.data.data.Villa.poolArea,
          area:
            res.data.data.CommercialStoreOrHouse &&
            res.data.data.CommercialStoreOrHouse.area,
          location: res.data.data.CommercialStoreOrHouse
            ? res.data.data.CommercialStoreOrHouse.location
            : res.data.data.Villa.location,
          salePrice: res.data.data.salePrice,
          rentPrice: res.data.data.rentPrice,
          deposite: res.data.data.deposit,
          desc: res.data.data.CommercialStoreOrHouse
            ? res.data.data.CommercialStoreOrHouse.description
            : res.data.data.Villa.description,
        });
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        setIsFetching(false);
        if (e.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem("companytoken");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      }
    };
    fetchPrevData();
  }, []);
  // update posta api request
  const updatePost = async (e) => {
    e.preventDefault();
    setISSending(true);
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/post/${postId}`,
        updatePostData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        setISSending(false);
        setSuccess(res.data.message);
        setTimeout(() => {
          navigate("/my-posts");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setISSending(false);
        if (err.status === 401) {
          alert(err.response.data.message);
          localStorage.removeItem("companytoken");
          navigate("/company-signin");
        }
        if (err.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      });
  };
  return (
    <section className="flex w-full flex-col gap-10 p-10">
      {isFetching ? (
        <div className="flex items-center justify-center">
          <Oval
            visible={true}
            height="40"
            width="40"
            color="rgb(23, 43, 78)"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <form
          className="flex flex-col gap-6"
          dir="rtl"
          onSubmit={(e) => updatePost(e)}
        >
          <div className="grid grid-cols-2 gap-6">
            {type === "villa" && (
              <>
                <div>
                  <label className="text-secondary mb-2 block text-lg font-bold">
                    مساحة الأرض
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={prevData.landArea}
                    className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                    placeholder="ادخل مساحة الارض "
                    onChange={(e) =>
                      setPrevData({ ...prevData, landArea: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-secondary mb-2 block text-lg font-bold">
                    مساحة الفيلا
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={prevData.buildingArea}
                    className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                    placeholder="ادخل مساحة البناء "
                    onChange={(e) =>
                      setPrevData({ ...prevData, buildingArea: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-secondary mb-2 block text-lg font-bold">
                    مساحة المسبح
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={prevData.poolArea}
                    className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                    placeholder="ادخل مساحة المسبح "
                    onChange={(e) =>
                      setPrevData({ ...prevData, poolArea: e.target.value })
                    }
                  />
                </div>
              </>
            )}
            {prevData.area && (
              <div>
                <label className="text-secondary mb-2 block text-lg font-bold">
                  تعديل المساحة
                </label>
                <input
                  name="name"
                  type="text"
                  value={prevData.area}
                  className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                  placeholder="ادخل المساحة  "
                  onChange={(e) =>
                    setPrevData({ ...prevData, area: e.target.value })
                  }
                />
              </div>
            )}
            <div>
              <label className="text-secondary mb-2 block text-lg font-bold">
                تعديل عنوان العقار
              </label>
              <input
                name="name"
                type="text"
                value={prevData.location}
                className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                placeholder="ادخل عنوان العقار "
                onChange={(e) =>
                  setPrevData({ ...prevData, location: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-secondary mb-2 block text-lg font-bold">
                تعديل سعر البيع
              </label>
              <input
                name="name"
                type="number"
                value={prevData.salePrice}
                className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                placeholder="ادخل سعر البيع "
                onChange={(e) =>
                  setPrevData({ ...prevData, salePrice: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-secondary mb-2 block text-lg font-bold">
                تعديل سعر الايجار
              </label>
              <input
                name="name"
                type="number"
                value={prevData.rentPrice}
                className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                placeholder="ادخل سعر الايجار "
                onChange={(e) =>
                  setPrevData({ ...prevData, rentPrice: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-secondary mb-2 block text-lg font-bold">
                تعديل رعبون الحجز
              </label>
              <input
                name="name"
                type="number"
                value={prevData.deposite}
                className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                placeholder="ادخل رعبون الحجز "
                onChange={(e) =>
                  setPrevData({ ...prevData, deposite: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-secondary mb-2 block text-lg font-bold">
                تعديل وصف العقار
              </label>
              <textarea
                placeholder="اضف وصف للعقار"
                value={prevData.desc}
                onChange={(e) =>
                  setPrevData({ ...prevData, desc: e.target.value })
                }
                className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              ></textarea>
            </div>
          </div>
          <div className="image flex items-center justify-between">
            <label
              htmlFor="image"
              className="bg-primary flex h-[52px] w-[180px] cursor-pointer items-center justify-center rounded-lg text-[17px] font-medium text-white"
            >
              تعديل الصورة الرئيسية
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={(e) => {
                setPrevData({ ...prevData, mainImg: e.target.files[0] }),
                  setNewMainImg(e.target.files[0]);
              }}
            />
            <img
              src={
                newMainImg
                  ? URL.createObjectURL(prevData.mainImg)
                  : `${import.meta.env.VITE_API_URL}${prevData.mainImg}`
              }
              alt="addv"
              className="h-[150px] w-[150px] rounded-xl"
            />
          </div>
          <div className="flex items-center justify-between gap-10">
            <div className="flex flex-col gap-5">
              <label
                htmlFor="mulie"
                className="text-secondary flex cursor-pointer items-center justify-center rounded-lg text-[17px] font-medium"
              >
                تعديل صور العقار
              </label>
              <div className="upload-btn-wrapper rounded-xl">
                <button className="image-btn text-white"> + </button>
                <input
                  type="file"
                  name="myfile"
                  multiple
                  onChange={uploadMultipleImages}
                  className="cursor-pointer"
                />
              </div>
            </div>
            {error && (
              <div className="flex items-center justify-center text-xl text-red-600">
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center justify-center text-xl text-green-600">
                {success}
              </div>
            )}
            <button
              type="submit"
              className="bg-primary hover:bg-secondary block cursor-pointer rounded-3xl px-10 py-3 text-lg text-white"
            >
              {isSending ? (
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
                "تعديل"
              )}
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-7">
            {previwImages &&
              previwImages.map((url) => (
                <img
                  src={url}
                  alt=""
                  className="h-[150px] w-[150px] rounded-xl"
                />
              ))}
          </div>
        </form>
      )}
    </section>
  );
};

export default UpdatePostForm;
