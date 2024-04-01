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
    <div className="pb-6 w-[270px] md:w-[270px] bg-gradient-to-r from-gray-200 to-slate-200 ...  absolute z-50 rounded-md shadow-2xl border border-black overflow-y-auto scrollbar-none h-[60vh]">
      {categoriesData &&
        categoriesData.map((category, index) => (
          <div
            key={index}
            className={`${styles.normalFlex} !border-black border-[1px] rounded-md m-1 !shadow-xl  bg-gradient-to-r from-gray-400 to-slate-200 ...  `}
            onClick={() => handleSubmit(category)}
          >
            <img
              src={category.image_Url}
              alt="log"
              className="w-[25px] h-[25px] object-contain ml-[18px] select-none rounded-full"
            />
            <h3 className="m-3 cursor-pointer select-none">{category.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
