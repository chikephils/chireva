import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSeller } from "../../features/shop/shopSlice";
import { categoriesData } from "../../static/data";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  createProduct,
  getAllProducts,
} from "../../features/product/productSlice";
import { toast } from "react-toastify";
import SmallLoader from "../Layout/SmallLoader";
import CreateLoader from "../Layout/createLoader";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const CreateProduct = () => {
  const seller = useSelector(selectSeller);
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    setImages((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setImages((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, description: "" }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, category: "" }));
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, stock: "" }));
  };

  const handleDiscountPriceChange = (e) => {
    setDiscountPrice(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, discountPrice: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const errors = {};
    if (!name.trim()) {
      errors.name = "Product Name is required";
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }
    if (!category) {
      errors.category = "Category is required";
    }
    if (!discountPrice) {
      errors.discountPrice = "Discount price is required";
    }
    if (!stock) {
      errors.stock = "Stock is required";
    }
    if (images.length === 0) {
      errors.images = "At least one image is required";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setShowLoader(false);
      return;
    }

    const newImages = [];

    // Convert images to Data URLs
    for (const image of images) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      await new Promise((resolve) => {
        reader.onload = () => {
          newImages.push(reader.result);
          resolve();
        };
      });
    }

    const newForm = new FormData();

    newImages.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("shopId", seller._id);
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);

    try {
      setShowLoader(true);
      await dispatch(
        createProduct({
          name,
          description,
          category,
          originalPrice,
          discountPrice,
          stock,
          shopId: seller._id,
          images: newImages,
        })
      );
      toast.success("Product Created Successfully");
      setName("");
      setCategory("");
      setDescription("");
      setOriginalPrice("");
      setDiscountPrice("");
      setStock("");
      setImages([]);
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      setShowLoader(false);
      dispatch(getAllProducts());
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <>
        {showLoader && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50 z-10 flex items-center justify-center">
            <CreateLoader />
          </div>
        )}
      </>
      <div className="w-full  px-2 ">
        <div className=" w-full  flex items-center justify-center  py-2 sticky top-0 mb-1 bg-gray-400  z-50">
          <h5 className="pb-2 text-base md:text-lg lg:text-xl font-semibold text-center">
            Create Product
          </h5>
        </div>

        {/* create product form  */}
        <div className="h-[70h]  overflow-y-scroll scrollbar-none pb-6 pt-1">
          <form onSubmit={handleSubmit}>
            <div>
              <label className=" block text-[14px] md:text-[16px] font-medium ">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your product name..."
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-sm"
              />
              {formErrors.name && (
                <p className="text-red-500">{formErrors.name}</p>
              )}
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter product description..."
                rows={4}
                className=" cursor-pointer appearance-none blappearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-[16px]"
              />
              {formErrors.description && (
                <p className="text-red-500">{formErrors.description}</p>
              )}
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[45px] rounded-[5px]"
                value={category}
                onChange={handleCategoryChange}
              >
                <option
                  className="text-[12px] md:text-sm"
                  value="Choose a Category"
                >
                  {" "}
                  Choose a Category{" "}
                </option>
                {categoriesData &&
                  categoriesData.map((type) => (
                    <option
                      className="text-[12px] md:text-sm font-medium"
                      value={type.title}
                      key={type.id}
                    >
                      {type.title}
                    </option>
                  ))}
              </select>
              {formErrors.category && (
                <p className="text-red-500">{formErrors.category}</p>
              )}
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Original Price
              </label>
              <input
                type="number"
                name="price"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Enter your product price..."
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-[16px]"
              />
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Price (with discount) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={discountPrice}
                onChange={handleDiscountPriceChange}
                placeholder="Enter your discount price..."
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-[16px]"
              />
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={stock}
                onChange={handleStockChange}
                placeholder="Enter your product name..."
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-[16px]"
              />
              {formErrors.stock && (
                <p className="text-red-500">{formErrors.stock}</p>
              )}
            </div>

            <br />
            <>
              <label className="block text-[14px] md:text-[16px] font-medium pb-3">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <DragDropContext onDragEnd={handleDragPhoto}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      className=" flex flex-wrap gap-[15px]"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      placeholder={provided.placeholder}
                    >
                      {images.length < 1 && (
                        <>
                          <input
                            type="file"
                            id="uploads"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            multiple
                          />
                          <label htmlFor="uploads" className=" rounded-[10px]">
                            <AiOutlinePlusCircle
                              size={24}
                              className="mt-3 cursor-pointer"
                              color="#555"
                            />
                            <p>Upload from your device</p>
                          </label>
                        </>
                      )}
                      {images.length >= 1 && (
                        <>
                          {images.map((photo, index) => {
                            return (
                              <Draggable
                                key={index}
                                draggableId={index.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="relative md:w-[120px] md:h-[100px] lg:min-h-[120px] 320px:w-[100px] 320px:h-[80px] 375px:w-[120px] 375px:h-[100px] cursor-move"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <img
                                      src={URL.createObjectURL(photo)}
                                      alt="pics"
                                      className="w-full h-full"
                                    />
                                    <MdDeleteForever
                                      size={28}
                                      className="absolute -top-1 -right-2 cursor-pointer font-extrabold "
                                      onClick={() => handleRemovePhoto(index)}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          <input
                            type="file"
                            id="uploads"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            multiple
                          />
                          <label htmlFor="uploads">
                            <AiOutlinePlusCircle
                              size={24}
                              className="mt-3 cursor-pointer"
                              color="#555"
                            />
                            <p>Upload from your device</p>
                          </label>
                        </>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {formErrors.images && (
                <p className="text-red-500">{formErrors.images}</p>
              )}
            </>

            <br />
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className=" flex items-center justify-center cursor-pointer appearance-none  w-full px-3 h-[45px] border border-gray-300 rounded-md placeholder-white focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm bg-black text-white"
              >
                {showLoader ? <SmallLoader /> : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
