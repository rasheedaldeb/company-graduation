import React, { useContext } from "react";
import SideBar from "../Components/SideBar";
import { StatesContext } from "../Context/Context";
import SectionHeader from "../Components/SectionHeader";
import TypeButtons from "../Components/TypeButtons";
import AddVilla from "../Components/AddVilla";
import AddHouse from "../Components/AddHouse";
import AddCommercialStore from "../Components/AddCommercialStore";
const AddEstate = () => {
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
      </div>
    </div>
  );
};

export default AddEstate;
