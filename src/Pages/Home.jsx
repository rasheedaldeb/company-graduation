import SideBar from "../Components/SideBar";
import TypeButtons from "../Components/TypeButtons";
import SectionHeader from "../Components/SectionHeader";
import { useContext } from "react";
import { StatesContext } from "../Context/Context";
import AddVilla from "../Components/AddVilla";
import AddHouse from "../Components/AddHouse";
import AddCommercialStore from "../Components/AddCommercialStore";
import AllPosts from "../Components/AllPosts/AllPosts";
const Home = () => {
  const { type } = useContext(StatesContext);
  return (
    <div className="flex justify-between py-10">
      <SideBar />
      <div className="flex w-[70%] flex-col gap-10">
        <div className="addPost flex flex-col gap-10">
          <SectionHeader title="اضافة عقار" />
          <TypeButtons />
          {type === "villa" && <AddVilla />}
          {type === "house" && <AddHouse />}
          {type === "commercial_store" && <AddCommercialStore />}
        </div>
        <AllPosts />
      </div>
    </div>
  );
};

export default Home;
