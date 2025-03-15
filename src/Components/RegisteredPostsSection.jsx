import React from "react";

const RegisteredPostsSection = () => {
  return (
    <section className="flex flex-col gap-10 px-10">
      <div className="registered max-h-screen overflow-y-scroll" dir="rtl">
        <div className="border-primary flex items-center justify-between border-b pb-3">
          <div className="image">
            <img src="/images/user.png" alt="post-image" />
          </div>
          <div className="content flex items-center gap-8" dir="rtl">
            <div className="flex flex-col items-center gap-3">
              <div className="name flex items-center gap-2">
                <h4 className="text-primary text-xl font-bold">نوع العقار:</h4>
                <p className="text-secondary text-lg font-bold">منزل</p>
              </div>
              <div className="space flex items-center gap-2">
                <h4 className="text-primary text-xl font-bold">
                  المساحة الكلية:
                </h4>
                <p className="text-secondary text-lg font-bold">المساحة</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="price-rent flex items-center gap-2">
                <h4 className="text-primary text-xl font-bold">
                  سعر الأيجار :
                </h4>
                <p className="text-secondary text-lg font-bold">150$</p>
              </div>
              <div className="price-sale flex items-center gap-2">
                <h4 className="text-primary text-xl font-bold">سعر البيع :</h4>
                <p className="text-secondary text-lg font-bold">300$</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="company flex items-center gap-2">
                <h4 className="text-primary text-xl font-bold">العنوان:</h4>
                <p className="text-secondary text-lg font-bold">دمشق-سوريا</p>
              </div>
              <div className="deposit flex items-center gap-2">
                <h4 className="text-primary text-xl font-bold">سعر الرعبون:</h4>
                <p className="text-secondary text-lg font-bold">50$</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <h4 className="text-primary text-xl font-bold">اسم العميل</h4>
              <p className="text-secondary text-lg font-bold">رشيد</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisteredPostsSection;
