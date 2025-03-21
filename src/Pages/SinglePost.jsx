import SideBar from "../Components/SideBar";
import SectionHeader from "../Components/SectionHeader";
import SinglePostSection from "../Components/SinglePostSection";
const SinglePost = () => {
  return (
    <div className="flex justify-between">
      <SideBar />
      <div className="flex w-[80%] flex-col gap-10 py-10">
        <SectionHeader title="تفاصيل العقار" />
        <SinglePostSection />
      </div>
    </div>
  );
};

export default SinglePost;
