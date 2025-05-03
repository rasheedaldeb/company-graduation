import { Link, useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./AllPosts.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
const AllPosts = () => {
  const token = localStorage.getItem("companytoken");
  const navigate = useNavigate();
  // fetch all posts states
  const [allPosts, setAllPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setAllPosts(res.data.data);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        if (e.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem("admintoken");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لايوجد اتصال بالانترنت");
        }
      }
    };
    fetchPosts();
  }, []);
  return (
    <section className="flex flex-col items-center gap-8 px-10">
      <SectionHeader title=" كافة المنشورات " />
      <input
        type="search"
        placeholder=" ابحث عن اسم الشركة"
        onChange={(e) => setInputValue(e.target.value)}
        className="border-primary min-h-[60px] w-full rounded-3xl border px-3 outline-none"
        dir="rtl"
      />
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
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          dir="rtl"
        >
          {allPosts.length !== 0 ? (
            allPosts
              .filter(
                (item) =>
                  item.Account &&
                  item.Account.name &&
                  item.Account.name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()),
              )
              .map((item) => (
                <SwiperSlide>
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="company flex items-center justify-between">
                      <img src="/images/user.png" alt="company" />
                      <Link className="text-secondary text-xl">
                        {item.Account.name}
                      </Link>
                    </div>
                    <div className="flex h-56 w-full items-center justify-center">
                      {item.mainImageUrl ? (
                        <img
                          className="mx-auto h-full dark:hidden"
                          src={`${import.meta.env.VITE_API_URL}${item.mainImageUrl}`}
                          alt="postImg"
                        />
                      ) : (
                        <h4 className="text-primary text-xl">لا يوجد صورة</h4>
                      )}
                    </div>
                    <div className="flex flex-col gap-7 pt-6">
                      <div
                        href="#"
                        className="text-lg leading-tight font-semibold text-gray-900 hover:underline dark:text-white"
                      >
                        {item.CommercialStore &&
                          item.CommercialStore.description}
                        {item.House && item.House.description}
                        {item.Villa && item.Villa.description}
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        {item.salePrice ? (
                          <h4 className="text-primary text-lg">سعر المبيع</h4>
                        ) : (
                          <h4 className="text-primary text-lg">سعر الايجار</h4>
                        )}
                        <p className="text-2xl leading-tight font-extrabold text-gray-900 dark:text-white">
                          ${item.salePrice ? item.salePrice : item.rentPrice}
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <Link
                          to={`/single-post/${item.id}`}
                          className="bg-primary hover:text-primary border-primary inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:border hover:bg-white"
                        >
                          تصفح العقار
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
          ) : error ? (
            <div className="flex items-center justify-center text-xl font-bold text-red-600">
              {error}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-secondary text-xl">لايوجد شركات</p>
            </div>
          )}
        </Swiper>
      )}
    </section>
  );
};

export default AllPosts;
