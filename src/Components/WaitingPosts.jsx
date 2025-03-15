const WaitingPosts = () => {
  // const [confirm, setConfirm] = useState(null)
  // const confirmToggle = (i) => {
  //   if (confirm == i) {
  //     return setConfirm(null);
  //   }
  //   setConfirm(i);
  // };
  return (
    <section className="flex flex-col gap-10 py-5">
      <div
        className="waiting-posts max-h-screen w-full overflow-y-scroll px-2"
        dir="rtl"
      >
        <div className="waiting-post border-primary flex items-center justify-between border-b pb-3">
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
            <div className="flex flex-col items-center gap-3">
              <div className="company flex items-center gap-2">
                <h4 className="text-primary text-xl font-bold">
                  مساحة العقار:
                </h4>
                <p className="text-secondary text-lg font-bold">دمشق-سوريا</p>
              </div>
              <div className="deposit flex items-center gap-2">
                <h4 className="text-primary text-xl font-bold">مساحة الارض:</h4>
                <p className="text-secondary text-lg font-bold">50$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingPosts;
