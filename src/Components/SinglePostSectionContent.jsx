import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

const SinglePostSectionContent = () => {
  const token = localStorage.getItem("companytoken");
  const { id } = useParams();
  const navigate = useNavigate();
  // fetch post details states
  const [postDetails, setPostDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  // post details api request
  useEffect(() => {
    const fetchPostDetails = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res);
        setPostDetails([res.data.data]);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        if (e.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem("companytoken");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لايوجد اتصال بالانترنت");
        }
      }
    };
    fetchPostDetails();
  }, []);
  return (
    <>
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
        <>
          {postDetails.map((item) => (
            <section className="flex w-[45%] flex-col items-center gap-5">
              <div className="top border-primary flex w-full flex-col items-center gap-5 border-b pb-3">
                <div className="flex w-full items-center justify-between">
                  <img src="/images/user.png" alt="company" />
                  <p className="text-secondary text-xl">{item.Account.name}</p>
                </div>
              </div>
              <div className="name flex w-full flex-col items-center gap-5">
                <div className="flex w-full items-center justify-between">
                  <p className="text-primary text-lg">{item.type}</p>
                  <h3 className="text-primary text-center text-xl font-bold">
                    نوع العقار
                  </h3>
                </div>
                <div className="prices border-primary flex w-full items-center justify-between border-b pb-3">
                  {item.rentPrice && (
                    <div className="rent flex flex-col items-center gap-2">
                      <h4 className="text-secondary text-xl">سعر الايجار</h4>
                      <p className="text-primary text-lg">{item.rentPrice}$</p>
                    </div>
                  )}
                  {item.salePrice && (
                    <div className="sale flex flex-col items-center gap-2">
                      <h4 className="text-secondary text-xl">سعر البيع</h4>
                      <p className="text-primary text-lg">{item.salePrice}$</p>
                    </div>
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="text-secondary text-xl">رعبون الحجز</h4>
                    <p className="text-primary text-lg">{item.deposit}$</p>
                  </div>
                </div>
                <div className="space-floor border-primary flex w-full items-center justify-between border-b pb-3">
                  {item.CommercialStoreOrHouse && (
                    <div className="space" dir="rtl">
                      <h4 className="text-secondary text-xl">المساحة</h4>
                      <p className="text-primary text-lg">
                        {" "}
                        {item.CommercialStoreOrHouse.area}متر
                      </p>
                    </div>
                  )}
                  {item.Villa && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="landArea flex items-center gap-2">
                        <h4 className="text-secondary text-xl">مساحة الارض</h4>
                        <p className="text-primary text-lg">
                          {item.Villa.landArea}
                        </p>
                      </div>
                      <div className="buildingArea">
                        <h4 className="text-secondary text-xl">مساحة الفيلا</h4>
                        <p className="text-primary text-lg">
                          {item.Villa.buildingArea}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="floor" dir="rtl">
                    <h4 className="text-secondary text-xl">العنوان</h4>
                    <p className="text-primary text-lg">
                      {" "}
                      {item.CommercialStoreOrHouse &&
                        item.CommercialStoreOrHouse.location}
                      {item.Villa && item.Villa.location}
                    </p>
                  </div>
                  <div className="created-at flex flex-col items-center gap-2">
                    <h4 className="text-secondary text-xl">تاريخ النشر</h4>
                    <p className="text-primary text-center text-lg">
                      {item.CommercialStoreOrHouse &&
                        item.CommercialStoreOrHouse.createdAt}
                      {item.Villa && item.Villa.createdAt}
                    </p>
                  </div>
                </div>
                <div className="border-primary flex w-full flex-col items-center gap-5 border-b pb-3">
                  <h3 className="text-primary text-center text-2xl font-bold">
                    الوصف
                  </h3>
                  <p className="text-primary text-lg">
                    {item.CommercialStoreOrHouse &&
                      item.CommercialStoreOrHouse.description}
                    {item.Villa && item.Villa.description}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </>
      )}
      {error && (
        <div className="flex items-center justify-center text-xl font-bold text-red-600">
          {error}
        </div>
      )}
    </>
  );
};

export default SinglePostSectionContent;
