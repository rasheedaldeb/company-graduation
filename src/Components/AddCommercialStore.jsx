import { useState } from "react";
import "./Add.css";
const AddCommercialStore = () => {
  const [mainImg, setMainImg] = useState("");
  return (
    <section className="flex flex-col gap-10 p-10">
      <form className="flex flex-col gap-6" dir="rtl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              مساحة الأرض
            </label>
            <input
              name="name"
              type="text"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل مساحة الارض "
              required
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              مساحة المحل التجاري
            </label>
            <input
              name="name"
              type="text"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل مساحة المحل التجاري "
              required
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              عنوان العقار
            </label>
            <input
              name="name"
              type="text"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل عنوان العقار "
              required
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              سعر البيع
            </label>
            <input
              name="name"
              type="number"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل سعر البيع "
              required
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              سعر الايجار
            </label>
            <input
              name="name"
              type="number"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل سعر الايجار "
              required
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              رعبون الحجز
            </label>
            <input
              name="name"
              type="number"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل رعبون الحجز "
              required
            />
          </div>
        </div>
        <div>
          <label className="text-secondary mb-2 block text-lg font-bold">
            وصف العقار
          </label>
          <textarea
            placeholder="اضف وصف للعقار"
            className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
          ></textarea>
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
            required
            onChange={(e) => setMainImg(e.target.files[0])}
          />
          <img
            src={
              mainImg
                ? URL.createObjectURL(mainImg)
                : "/images/no-image-icon-0.jpg"
            }
            alt="addv"
            className="h-[150px] w-[150px] rounded-xl"
          />
        </div>
        <div className="flex flex-col items-center gap-10">
          <label
            htmlFor="mulie"
            className="text-secondary flex cursor-pointer items-center justify-center rounded-lg text-[17px] font-medium"
          >
            اضافة صور للعقار
          </label>
          <div className="upload-btn-wrapper cursor-pointer rounded-xl">
            <button className="image-btn text-white"> + </button>
            <input type="file" name="myfile" multiple />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddCommercialStore;
