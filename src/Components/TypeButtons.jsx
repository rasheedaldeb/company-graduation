import { useContext } from "react";
import { StatesContext } from "../Context/Context";

const TypeButtons = () => {
  const { type, setType } = useContext(StatesContext);
  return (
    <section className="j flex items-center justify-center gap-30 px-10">
      <button
        onClick={() => setType("villa")}
        className={`${type === "villa" && "border-primary border bg-white"} bg-primary h-[40px] w-[100px] rounded-xl ${type === "villa" ? "text-primary" : "text-white"} cursor-pointer`}
      >
        فيلا
      </button>
      <button
        onClick={() => setType("commercial_store")}
        className={`${type === "commercial_store" && "border-primary border bg-white"} bg-primary h-[40px] w-[100px] rounded-xl ${type === "commercial_store" ? "text-primary" : "text-white"} cursor-pointer`}
      >
        محل تجاري
      </button>
      <button
        onClick={() => setType("house")}
        className={`${type === "house" && "border-primary border bg-white"} bg-primary h-[40px] w-[100px] rounded-xl ${type === "house" ? "text-primary" : "text-white"} cursor-pointer`}
      >
        منزل
      </button>
    </section>
  );
};

export default TypeButtons;
