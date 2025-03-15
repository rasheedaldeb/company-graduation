import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";

const AllPosts = () => {
  return (
    <section className="flex flex-col items-center gap-8 px-10">
      <SectionHeader title="كافة المنشورات" />
      <div className="posts grid grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="company flex items-center justify-between">
            <img src="/images/user.png" alt="company" />
            <Link className="text-secondary text-xl">اسم الشركة</Link>
          </div>
          <div className="h-56 w-full">
            <a href="#">
              <img
                className="mx-auto h-full dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt=""
              />
              <img
                className="mx-auto hidden h-full dark:block"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                alt=""
              />
            </a>
          </div>
          <div className="pt-6">
            <a
              href="#"
              className="text-lg leading-tight font-semibold text-gray-900 hover:underline dark:text-white"
            >
              Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max
            </a>

            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-2xl leading-tight font-extrabold text-gray-900 dark:text-white">
                $1,699
              </p>

              <button
                type="button"
                className="bg-primary hover:text-primary border-primary inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:border hover:bg-white"
              >
                تصفح العقار
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
