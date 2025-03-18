import React from "react";
import SideBar from "../Components/SideBar";
import UpdatePostForm from "../Components/UpdatePostForm";
import SectionHeader from "../Components/SectionHeader";
const UpdatePost = () => {
  return (
    <div className="flex justify-between py-10">
      <SideBar />
      <div className="flex w-[70%] flex-col gap-10">
        <SectionHeader title="تعديل المنشور" />
        <UpdatePostForm />
      </div>
    </div>
  );
};

export default UpdatePost;
