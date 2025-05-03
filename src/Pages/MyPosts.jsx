import SideBar from "../Components/SideBar";
import SectionHeader from "../Components/SectionHeader";
import StatusButtons from "../Components/StatusButtons";
import PostsByStates from "../Components/PostsByStates";
const MyPosts = () => {
  return (
    <div className="flex justify-between py-10">
      <SideBar />
      <div className="flex w-[80%] flex-col gap-10">
        <div className="myposts flex flex-col gap-10">
          <SectionHeader title="منشوراتي" />
          <StatusButtons />
          <PostsByStates />
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
