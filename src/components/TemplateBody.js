import React, { useState, useEffect, useRef } from "react";
import { PiArrowCircleRightBold } from "react-icons/pi";
import { PiArrowCircleDownBold } from "react-icons/pi";
import { PiCircleHalfFill } from "react-icons/pi";
import { FaRegThumbsUp } from "react-icons/fa";
import { BiSolidMessage } from "react-icons/bi";
import { FaSortAmountDown } from "react-icons/fa";
import { BiSolidGrid } from "react-icons/bi";
import { LiaMedalSolid } from "react-icons/lia";
import { RxHeading } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa";
import { Link, json } from "react-router-dom";
import data from "../data";
import { useDispatch, useSelector } from "react-redux";
import { addOption } from "../redux/slices/FormSlice";
import TextField from "./TextField";
import YesorNo from "./YesorNo";
import MultipleChoice from "./MultipleChoice";
import MultipleChoiceGrid from "./MultipleChoiceGrid";
import DropDown from "./DropDown";
import DropDownGrid from "./DropDownGrid";
import NetPromoter from "./NetPromoter";
import TextFieldGrid from "./TextFieldGrid";
import RatingScale from "./RatingScale";
import RatingScaleMatrix from "./RatingScaleMatrix";
import Ranking from "./Ranking";
import PercentageSum from "./PercentageSum";
import Heading from "./Heading";
import CustomText from "./CustomText";
import ScoreDisplay from "./ScoreDisplay";
import { deleteOptionByIndex } from "../redux/slices/FormSlice";
import PageBreak from "./PageBreak";
import TemplatePreview from "./TemplatePreview";
const TemplateBody = () => {
  const dispatch = useDispatch();
  const array = useSelector((state) => state.formData.previewArray);
  const [drag, setDrag] = useState(true);
  const [display, setDisplay] = useState();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const selectedOptions = useSelector(
    (state) => state.formData.selectedOptions
  );
  const [dataArray, setDataArray] = useState([]);

  // const contentRef = useRef(null);

  // Scroll the screen to the dragged content when it appears
  // useEffect(() => {
  //   if (contentRef.current) {
  //     console.log(contentRef.current);
  //     contentRef.current.scrollIntoView({
  //       behavior: "smooth", // You can use 'auto' for instant scrolling or 'smooth' for smooth scrolling animation
  //       block: "start", // Scroll to the top of the element
  //       inline: "start", // Scroll to the left of the element
  //     });
  //   }
  // }, [contentRef]);

  const dragClass =
    "h-[420px] bg-[#e7e7e7] w-[750px] flex justify-center items-center border-dashed border-[#444444] border-[3px]";
  const dragClassContent = "w-[750px]";

  const handleDragStart = (optionId) => {
    // e.preventDefault();
    dispatch(addOption(optionId));
  };

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setValue(e.target.value);
  // };
  const handleDragEnter = (event) => {
    event.preventDefault();
    setDisplay(true);
    setDrag(false);
    // setDisplayedContent(draggedOption);
  };
  const handleDragLeave = (optionId) => {
    dispatch(addOption(optionId));
    setDrag(true);
    setDisplay(false);
  };
  const handleDrop = (optionId) => {
    console.log("Dropped");
    dispatch(addOption(optionId));
    // event.preventDefault();
    setDisplay(false);
  };
  const deleteOption = (index) => {
    dispatch(deleteOptionByIndex(index));
    // const deletedOption = localStorage.getItem('selectedOptions').slice(index,1)
    // dataArray.slice(index, 1);
  };
  const draggingContent = () => {
    const handleContainerDrag = (index) => {
      setDraggedIndex(index);
    };
    const handleContainDragOver = (event, index) => {
      event.preventDefault();
    };
    const handleContainerDrop = (event, index) => {
      event.preventDefault();
      if (draggedIndex === null || draggedIndex === index) {
        return;
      }
      const updatedItems = [...dataArray];
      const [removedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(index, 0, removedItem);
      // setItems(updatedItems);
      setDraggedIndex(null);
    };

    return (
      <>
        {selectedOptions.length === 0 ? (
          <div className="bg-[white] w-[750px] flex justify-center items-center transition-all duration-200 ease-in-expo">
            <div>
              <h1 className="text-[22px] w-full flex items-center gap-[10px]">
                Drag a question from the list on the right
                <FaArrowRight />
              </h1>
              <p className="w-full">
                or, you can{" "}
                <span className="text-[#3c8dd5] cursor-pointer">
                  learn more about FourEyes here
                </span>{" "}
                :-)
              </p>
            </div>
          </div>
        ) : (
          <div
            className="w-[750px] transition-all duration-500 ease-in-expo"
            // onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            // onDragLeave={handleDragLeave}
            // onDrop={handleDrop}
          >
            <div
              className="transition-opacity duration-200 ease-in-expo "
              onDragOver={(e) => e.preventDefault()}
              // ref={contentRef}
            >
              {selectedOptions.map((optionId, index) => {
                switch (optionId) {
                  case "MultipleChoice":
                    return (
                      <MultipleChoice
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "MultipleChoiceGrid":
                    return (
                      <MultipleChoiceGrid
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "DropDown":
                    return (
                      <DropDown
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "DropDownGrid":
                    return (
                      <DropDownGrid
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "YesNo":
                    return (
                      <YesorNo
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "NetPromoter":
                    return (
                      <NetPromoter
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "TextField":
                    return (
                      <TextField
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "TextFieldGrid":
                    return (
                      <TextFieldGrid
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "RatingScale":
                    return (
                      <RatingScale
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "RatingScaleMatrix":
                    return (
                      <RatingScaleMatrix
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "Ranking":
                    return (
                      <Ranking
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "PercentageSum":
                    return (
                      <PercentageSum
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "Heading":
                    return (
                      <Heading
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "CustomText":
                    return (
                      <CustomText
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "ScoreDisplay":
                    return (
                      <ScoreDisplay
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  case "PageBreak":
                    return (
                      <PageBreak
                        key={`${optionId}-${index}`}
                        index={index}
                        onDelete={() => deleteOption(index)}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        )}
      </>
    );
  };

  // useEffect(() => {
  //   draggingContent();
  // }, []);

  return (
    <div>
      {/* {optionContent ? <div>Set</div> : <div></div>} */}
      <div
        className="bg-[black]/[0.2] max-w-[1120px] m-auto pl-[30px] pr-[30px] pb-[30px]"
        // onDragOver={handleDragEnter}
        // onDragLeave={() => setDisplay(false)}
        // onDragEnd={() => setDisplay(true)}
      >
        {/* {data ? <TemplatePreview /> : <div>Nice Preview Your work</div>} */}
        <TemplatePreview />
        <div className="flex gap-[20px] justify-center">
          {draggingContent()}
          <div className="w-[285px] flex-wrap gap-[5px] h-[420px] transition-opacity duration-200 ease-in-expo">
            <div className="flex flex-wrap gap-[5px]">
              <p
                id="1"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                draggable
                // onDragStart={() => setDrag(false)}
                // onDragLeave={() => handleDragLeave("MultipleChoice")}
                onDragStart={() => handleDragStart("MultipleChoice")}
                // onDrop={() => handleDrop("MultipleChoice")}
                // onDrag={(e) => handleDragStart(e, "MultipleChoice")}
              >
                <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                Multiple Choice
              </p>
              <p
                id="2"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("MultipleChoiceGrid")}
                onDragLeave={() => setDrag(true)}
              >
                <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                Multiple Choice Grid
              </p>
              <p
                id="3"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("DropDown")}
                onDragLeave={() => setDrag(true)}
              >
                <PiArrowCircleDownBold className="text-[#43AED8] text-[25px] pl-[5px] " />
                Drop down
              </p>
              <p
                id="4"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("DropDownGrid")}
                onDragLeave={() => setDrag(true)}
              >
                <PiArrowCircleDownBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                Drop down Grid
              </p>
              <p
                id="5"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("YesNo")}
                onDragLeave={() => setDrag(true)}
              >
                <PiCircleHalfFill className="text-[#43AED8] text-[25px] pl-[5px]" />
                Yes/No
              </p>
              <p
                id="6"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("NetPromoter")}
                onDragLeave={() => setDrag(true)}
              >
                <FaRegThumbsUp className="text-[#43AED8] text-[25px] pl-[5px]" />
                Net Promoter
              </p>
            </div>
            <div className="flex flex-wrap gap-[5px] mt-[15px]">
              <p
                id="7"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("TextField")}
                onDragLeave={() => setDrag(true)}
              >
                <BiSolidMessage className="text-[#43AED8] text-[25px] pl-[5px]" />
                Text Field
              </p>
              <p
                id="8"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("TextFieldGrid")}
                onDragLeave={() => setDrag(true)}
              >
                <BiSolidMessage className="text-[#43AED8] text-[25px] pl-[5px] " />
                Text Field Grid
              </p>
            </div>
            <div className="flex flex-wrap gap-[5px] mt-[15px]">
              <p
                id="9"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("RatingScale")}
                onDragLeave={() => setDrag(true)}
              >
                <FaSortAmountDown className="text-[#43AED8] text-[25px] pl-[5px]" />
                Rating Scale
              </p>
              <p
                id="10"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("RatingScaleMatrix")}
                onDragLeave={() => setDrag(true)}
              >
                <BiSolidGrid className="text-[#43AED8] text-[25px] pl-[5px]" />
                Rating Matrix
              </p>
              <p
                id="11"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("Ranking")}
                onDragLeave={() => setDrag(true)}
              >
                <LiaMedalSolid className="text-[#43AED8] text-[25px] pl-[5px]" />
                Ranking
              </p>
              <p
                id="12"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("PercentageSum")}
                onDragLeave={() => setDrag(true)}
              >
                <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                Percentage/Sum
              </p>
            </div>
            <div className="flex flex-wrap gap-[5px] mt-[15px]">
              <p
                id="13"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("Heading")}
                onDragLeave={() => setDrag(true)}
              >
                <RxHeading className="text-[#43AED8] text-[25px] pl-[5px]" />
                Heading
              </p>
              <p
                id="14"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("CustomText")}
                onDragLeave={() => setDrag(true)}
              >
                <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                Custom Text
              </p>
              <p
                id="15"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("ScoreDisplay")}
                onDragLeave={() => setDrag(true)}
              >
                <LiaMedalSolid className="text-[#43AED8] text-[25px] pl-[5px]" />
                Score Display
              </p>
              <p
                id="16"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("PageBreak")}
                onDragLeave={() => setDrag(true)}
              >
                <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                Page Break
              </p>
            </div>
            <button className="bg-[#3c8dd5] w-full text-[white] mt-[20px] text-[14px] pt-[8px] pb-[8px]">
              Create a Template
            </button>
            {/* {array.length > 0 && ( */}
            <Link to="/uday/preview">
              <button className="bg-[#3c8dd5] w-full text-[white] mt-[20px] text-[14px] pt-[8px] pb-[8px]">
                Preview
              </button>
            </Link>
            {/* )} */}
          </div>
        </div>
      </div>
      <div className="h-[30px] w-[300px] bg-white m-auto flex items-center justify-center mt-[30px]">
        <p className="text-[14px]">Evega Technologies LLP</p>
      </div>
    </div>
  );
};

export default TemplateBody;
