import { useContext, useEffect, useState } from "react";
import { StatesContext } from "../Context/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const PostsByStates = () => {
  const token = localStorage.getItem("companytoken");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { status, deleted, setDeleted } = useContext(StatesContext);
  // fetch company posts states
  const [myPosts, setMyPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // delete post states
  const [success, setSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirm, setConfirm] = useState(null);
  // open and close confirm button
  const confirmToggle = (i) => {
    if (confirm == i) {
      return setConfirm(null);
    }
    setConfirm(i);
  };
  // delete post api request
  const deletePost = async (id) => {
    setIsDeleting(true);
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setSuccess(res.data.message);
        setIsDeleting(false);
        setTimeout(() => {
          setDeleted(!deleted);
          setSuccess("");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setDeleteError(err.response.data.message);
        setIsDeleting(false);
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
  // fetch company postst based on states api request
  useEffect(() => {
    const fetchPostsByState = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/status/${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res.data);
        setMyPosts(res.data.data);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        setIsFetching(false);
        if (e.response.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem(" companytoken");
          navigate("/company-signin");
        }
        if (e.message === "Network Error") {
          setError("لا يوجد اتصال بالانترنت");
        }
      }
    };
    fetchPostsByState();
  }, [status, deleted]);
  return (
    <section className="flex flex-col gap-10 py-5">
      {success && (
        <div className="flex items-center justify-center text-xl font-bold text-green-600">
          {success}
        </div>
      )}
      {deleteError && (
        <div className="flex items-center justify-center text-xl font-bold text-red-600">
          {deleteError}
        </div>
      )}
      <div
        className="posts max-h-screen w-full overflow-y-scroll px-2"
        dir="rtl"
      >
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
        ) : myPosts.length !== 0 ? (
          myPosts.map((item) => (
            <div className="post border-primary flex items-center justify-between border-b pb-3">
              <div className="image">
                <img
                  src={`https://real-estate-app-i5m8.onrender.com${item.mainImageUrl}`}
                  alt="post-image"
                  className="h-[150px] w-[150px] rounded-xl"
                />
              </div>
              <div className="content flex items-center gap-8" dir="rtl">
                <div className="flex flex-col items-start gap-3">
                  <div className="name flex items-center gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      نوع العقار:
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.type}
                    </p>
                  </div>
                  <div className="space flex items-center gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      المساحة الكلية:
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.House && item.House.area}
                      {item.CommercialStore && item.CommercialStore.area}
                      {item.Villa && item.Villa.area}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <div className="price-rent flex items-center gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      سعر الأيجار :
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.rentPrice}$
                    </p>
                  </div>
                  <div className="price-sale flex items-center gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      سعر البيع :
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.salePrice}$
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <div className="company flex items-center gap-2">
                    <h4 className="text-primary text-xl font-bold">العنوان:</h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.House && item.House.location}
                      {item.CommercialStore && item.CommercialStore.location}
                      {item.Villa && item.Villa.location}
                    </p>
                  </div>
                  <div className="deposit flex items-center gap-2">
                    <h4 className="text-primary text-xl font-bold">
                      سعر الرعبون:
                    </h4>
                    <p className="text-secondary text-lg font-bold">
                      {item.deposit}$
                    </p>
                  </div>
                </div>
              </div>
              {status === "pending" && (
                <div className="flex flex-col items-center gap-10">
                  <h4 className="text-primary text-xl font-bold">الوصف</h4>
                  <p className="text-secondary text-lg font-bold">
                    {item.House && item.House.description}
                    {item.CommercialStore && item.CommercialStore.description}
                    {item.Villa && item.Villa.description}
                  </p>
                </div>
              )}
              {status === "accepted" && (
                <div className="buttons flex items-center gap-7">
                  <div className="flex flex-col items-center gap-5">
                    <button
                      onClick={() => confirmToggle(item.id)}
                      className="cursor-pointer rounded-xl bg-red-500 px-6 py-3 text-white"
                    >
                      حذف
                    </button>
                    <div
                      className={`${confirm === item.id ? "flex" : "hidden"} flex-col items-center gap-5`}
                    >
                      <p className="text-secondary text-center text-lg font-bold">
                        هل انت متأكد من الحذف؟
                      </p>
                      <button
                        onClick={() => deletePost(item.id)}
                        className="bg-primary cursor-pointer rounded-xl px-6 py-3 text-white"
                      >
                        {isDeleting ? (
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
                          "تأكيد"
                        )}
                      </button>
                    </div>
                  </div>
                  <Link
                    to={`/update-post/${item.id}/${item.type}`}
                    className="cursor-pointer rounded-xl bg-orange-500 px-6 py-3 text-white"
                  >
                    تعديل
                  </Link>
                </div>
              )}
              {status === "rejected" && (
                <div className="flex flex-col items-center gap-10">
                  <h4 className="text-xl font-bold text-red-500">سبب الرفض</h4>
                  <p className="text-secondary text-lg font-bold">
                    {item.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-secondary text-xl">لا يوجد منشورات</p>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center justify-center text-xl text-red-600">
          {error}
        </div>
      )}
    </section>
  );
};

export default PostsByStates;
