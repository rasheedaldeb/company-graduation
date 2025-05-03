import SideBar from "../Components/SideBar";

import AllPosts from "../Components/AllPosts/AllPosts";
const Home = () => {
  return (
    <div className="flex justify-between py-10">
      <SideBar />
      <div className="flex w-[70%] flex-col gap-10">
        <AllPosts />
      </div>
    </div>
  );
};

export default Home;
