import ProfileSection from "../Components/ProfileSection";
import SideBar from "../Components/SideBar";

const Profile = () => {
  return (
    <div className="flex justify-between py-10">
      <SideBar />
      <div className="flex w-[70%] flex-col gap-10">
        <ProfileSection />
      </div>
    </div>
  );
};

export default Profile;
