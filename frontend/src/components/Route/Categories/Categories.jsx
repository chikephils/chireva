import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={` my-12 flex justify-between w-full bg-white shadow-sm p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((item, index) => (
              <div className="flex items-start" key={index}>
                {item.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs md-text-sm">{item.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={`p-1 lg:p-6 rounded-lg mb-12 mt-3  md:${styles.section}`} id="categories">
        <div className="grid grid-cols-2 gap-[5px] md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[10px] xl:grid-cols-5 xl:gap-[20px] justify-items-center shadow-md p-2 lg:p-3">
          {categoriesData &&
            categoriesData.map((category) => {
              const handleClick = (category) => {
                navigate(`/products?category=${category.title}`);
              };
              return (
                <div
                  className="w-full min-h-[90px]  max-h-full  flex items-center justify-between p-2 cursor-pointer overflow-hidden bg-white rounded-lg shadow-lg "
                  key={category.id}
                  onClick={() => handleClick(category)}
                >
                  <p className=" text-xs md:text-sm font-medium leading-[1,3]">
                    {category.title}
                  </p>
                  <img
                    src={category.image_Url}
                    alt={category.title}
                    className="w-[70px] md:w-[120px] object-cover"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
