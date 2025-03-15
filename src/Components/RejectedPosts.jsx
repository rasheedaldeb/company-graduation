const RejectedPosts = () => {
  return (
    <section className="flex flex-col gap-10 py-5">
      <div
        className="waiting-posts max-h-screen w-full overflow-y-scroll px-2"
        dir="rtl"
      >
        <div className="accepted-post border-primary flex items-center justify-between border-b pb-3">
          <div className="content flex w-[70%] items-center gap-8" dir="rtl">
            <div className="image">
              <img src="/images/user.png" alt="post-image" />
            </div>
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
          </div>
          <div className="flex w-[30%] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <h4 className="text-xl font-bold text-red-500">سبب الرفض</h4>
              <p className="text-secondary text-lg font-bold">سبب الرفض</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RejectedPosts;
