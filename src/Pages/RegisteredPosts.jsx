import React from "react";
import SideBar from "../Components/SideBar";
import SectionHeader from "../Components/SectionHeader";
import RegisteredPostsSection from "../Components/RegisteredPostsSection";

const RegisteredPosts = () => {
  return (
    <div className="flex justify-between py-10">
      <SideBar />
      <div className="flex w-[80%] flex-col gap-10">
        <SectionHeader title="العقارات المحجوزة" />
        <RegisteredPostsSection />
      </div>
    </div>
  );
};

export default RegisteredPosts;
