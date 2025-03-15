import { useContext } from "react";
import { StatesContext } from "../Context/Context";

const StatusButtons = () => {
  const { status, setStatus } = useContext(StatesContext);
  return (
    <section className="flex items-center justify-between px-10" dir="rtl">
      <button
        onClick={() => setStatus("waiting")}
        className={`${status === "waiting" && "border-primary border bg-white"} bg-primary h-[40px] w-[200px] rounded-xl ${status === "waiting" ? "text-primary" : "text-white"} cursor-pointer`}
      >
        المنشورات المعلقة
      </button>
      <button
        onClick={() => setStatus("rejected")}
        className={`${status === "rejected" && "border-primary border bg-white"} bg-primary h-[40px] w-[200px] rounded-xl ${status === "rejected" ? "text-primary" : "text-white"} cursor-pointer`}
      >
        المنشورات المرفوضة
      </button>
      <button
        onClick={() => setStatus("accepted")}
        className={`${status === "accepted" && "border-primary border bg-white"} bg-primary h-[40px] w-[200px] rounded-xl ${status === "accepted" ? "text-primary" : "text-white"} cursor-pointer`}
      >
        المنشورات المقبولة
      </button>
    </section>
  );
};

export default StatusButtons;
