import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    navigate(`/products?category=${data.title}`);
    setDropDown(false);
    
  };
  return (
    <div className=" mt-2 md:mt-0 pb-4 w-[200px] md:w-[270px] bg-gradient-to-r from-gray-200 to-slate-200 ... absolute z-30 rounded-b-md shadow-2xl border border-black overflow-y-auto scrollbar-thin max-h-[85vh]">
      {categoriesData &&
        categoriesData.map((category, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => handleSubmit(category)}
          >
            <img
              src={category.image_Url}
              alt="log"
              className="w-[25px] h-[25px] object-contain ml-[18px] select-none"
            />
            <h3 className="m-3 cursor-pointer select-none">{category.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
