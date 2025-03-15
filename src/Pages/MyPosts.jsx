import { useContext } from "react";
import { StatesContext } from "../Context/Context";
import SideBar from "../Components/SideBar";
import SectionHeader from "../Components/SectionHeader";
import StatusButtons from "../Components/StatusButtons";
import WaitingPosts from "../Components/WaitingPosts";
import RejectedPosts from "../Components/RejectedPosts";
import AcceptedPosts from "../Components/AcceptedPosts";
const MyPosts = () => {
  const { status } = useContext(StatesContext);
  return (
    <div className="flex w-screen justify-between py-10">
      <SideBar />
      <div className="flex w-[75%] flex-col gap-10">
        <div className="myposts flex flex-col gap-10">
          <SectionHeader title="منشوراتي" />
          <StatusButtons />
          {status === "waiting" && <WaitingPosts />}
          {status === "rejected" && <RejectedPosts />}
          {status === "accepted" && <AcceptedPosts />}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
