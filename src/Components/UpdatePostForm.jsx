import React from "react";
import { Oval } from "react-loader-spinner";

const UpdatePostForm = () => {
  return (
    <section className="flex w-full flex-col gap-10 p-10">
      <form
        className="flex flex-col gap-6"
        dir="rtl"
        // onSubmit={(e) => createHousePost(e)}
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              مساحة الأرض
            </label>
            <input
              name="name"
              type="text"
              //   value={landArea}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل مساحة الارض "
              //   onChange={(e) => setLandArea(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              مساحة المنزل
            </label>
            <input
              name="name"
              type="text"
              //   value={buildingArea}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل مساحة المنزل "
              //   onChange={(e) => setBuildingArea(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              المساحة الكلية
            </label>
            <input
              name="name"
              type="text"
              //   value={totalArea}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل المساحة الكلية "
              //   onChange={(e) => setTotalArea(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              عنوان العقار
            </label>
            <input
              name="name"
              type="text"
              //   value={location}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل عنوان العقار "
              //   onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              سعر البيع
            </label>
            <input
              name="name"
              type="number"
              //   value={salePrice}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل سعر البيع "
              //   onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              سعر الايجار
            </label>
            <input
              name="name"
              type="number"
              //   value={rentPrice}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل سعر الايجار "
              //   onChange={(e) => setRentPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              رعبون الحجز
            </label>
            <input
              name="name"
              type="number"
              //   value={deposite}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل رعبون الحجز "
              //   onChange={(e) => setDeposite(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              وصف العقار
            </label>
            <textarea
              placeholder="اضف وصف للعقار"
              //   value={desc}
              //   onChange={(e) => setDesc(e.target.value)}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
            ></textarea>
          </div>
        </div>
        <div className="image flex items-center justify-between">
          <label
            htmlFor="image"
            className="bg-primary flex h-[52px] w-[150px] cursor-pointer items-center justify-center rounded-lg text-[17px] font-medium text-white"
          >
            اضافة صورة رئيسية
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            // onChange={(e) => setMainImg(e.target.files[0])}
          />
          <img
            // src={
            //   mainImg
            //     ? URL.createObjectURL(mainImg)
            //     : "/images/no-image-icon-0.jpg"
            // }
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
              اضافة صور للعقار
            </label>
            <div className="upload-btn-wrapper rounded-xl">
              <button className="image-btn text-white"> + </button>
              <input
                type="file"
                name="myfile"
                multiple
                // onChange={uploadMultipleImages}
                className="cursor-pointer"
              />
            </div>
          </div>
          {/* {error && (
                <div className="flex items-center justify-center text-xl text-red-600">
                  {error}
                </div>
              )}
              {success && (
                <div className="flex items-center justify-center text-xl text-green-600">
                  {success}
                </div>
              )} */}
          <button
            type="submit"
            className="bg-primary hover:bg-secondary block cursor-pointer rounded-3xl px-10 py-3 text-lg text-white"
          >
            {/* {isSending ? (
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
                  "انشاء"
                )} */}
            تعديل
          </button>
        </div>
        {/* <div className="flex flex-wrap items-center justify-center gap-7">
              {previwImages.map((image) => (
                <img
                  src={image}
                  alt=""
                  className="h-[150px] w-[150px] rounded-xl"
                />
              ))}
            </div> */}
      </form>
    </section>
  );
};

export default UpdatePostForm;
