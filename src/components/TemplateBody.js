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
import { addOption, setChoicesOrder } from "../redux/slices/FormSlice";
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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    // console.log(destination.droppableId);
    // dispatch(
    //   setChoicesOrder({
    //     sourceIndex: source.index,
    //     destinationIndex: destination.index,
    //   })
    // );

    // const droppedOption = result.draggableId;
    // console.log(droppedOption);
    // if (droppedOption === null) {
    //   return;
    // } else {
    //   dispatch(addOption(droppedOption));
    // }
    switch (source.droppableId) {
      case destination.droppableId:
        dispatch(
          setChoicesOrder({
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
        break;
      case "ITEMS":
      // const droppedOption = result.draggableId;
      // dispatch(addOption(droppedOption));
      // break;
      default:
        const droppedOption = result.draggableId;
        dispatch(addOption(droppedOption));
        break;
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // Change styles based on whether it's dragging or not
    userSelect: "none",
    background: isDragging ? "lightgrey" : "white",
    ...draggableStyle,
  });

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
    return (
      <Droppable droppableId="ITEMS">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-[750px] transition-all duration-500 ease-in-expo"
          >
            {selectedOptions.length ? (
              selectedOptions.map((optionId, index) => (
                <Draggable
                  draggableId={String(index)}
                  key={index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <div className="flex items-center gap-[5px] mt-[5px]">
                        {optionId === "MultipleChoice" && (
                          <MultipleChoice
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "MultipleChoiceGrid" && (
                          <MultipleChoiceGrid
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "DropDown" && (
                          <DropDown
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "DropDownGrid" && (
                          <DropDownGrid
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "YesNo" && (
                          <YesorNo
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "NetPromoter" && (
                          <NetPromoter
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "TextField" && (
                          <TextField
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "TextFieldGrid" && (
                          <TextFieldGrid
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "RatingScale" && (
                          <RatingScale
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "RatingScaleMatrix" && (
                          <RatingScaleMatrix
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "Ranking" && (
                          <Ranking
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "PercentageSum" && (
                          <PercentageSum
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "Heading" && (
                          <Heading
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "CustomText" && (
                          <CustomText
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "ScoreDisplay" && (
                          <ScoreDisplay
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId === "PageBreak" && (
                          <PageBreak
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`component${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="bg-[white] w-[750px] h-[100%] flex justify-center items-center transition-all duration-200 ease-in-expo">
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
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-[20px] justify-center">
            {draggingContent()}
            <div className="w-[285px] flex-wrap gap-[5px] h-[420px] transition-opacity duration-200 ease-in-expo">
              <div>
                <Droppable
                  direction="horizontal"
                  isDropDisabled={true}
                  droppableId="ITEMSCONTENT"
                >
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}

                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                    >
                      <div className="flex flex-wrap gap-[5px]">
                        <Draggable draggableId="MultipleChoice" index={0}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={`${
                                snapshot.isDragging ? "d-none" : ""
                              } flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo`}
                            >
                              <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Multiple Choice
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="MultipleChoiceGrid" index={1}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Multiple Choice Grid
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="DropDown" index={2}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <PiArrowCircleDownBold className="text-[#43AED8] text-[25px] pl-[5px] " />
                              Drop down
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="DropDownGrid" index={3}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <PiArrowCircleDownBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Drop down Grid
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="YesNo" index={4}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <PiCircleHalfFill className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Yes/No
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="NetPromoter" index={5}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <FaRegThumbsUp className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Net Promoter
                            </div>
                          )}
                        </Draggable>
                        {/* {provided.placeholder} */}
                      </div>
                      <div className="flex flex-wrap gap-[5px] mt-[15px]">
                        <Draggable draggableId="TextField" index={6}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={`${
                                snapshot.isDragging ? "d-none" : ""
                              } flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo`}
                            >
                              <BiSolidMessage className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Text Field
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="TextFieldGrid" index={7}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <BiSolidMessage className="text-[#43AED8] text-[25px] pl-[5px] " />
                              Text Field Grid
                            </div>
                          )}
                        </Draggable>

                        {/* {provided.placeholder} */}
                      </div>
                      <div className="flex flex-wrap gap-[5px] mt-[15px]">
                        <Draggable draggableId="RatingScale" index={8}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={`${
                                snapshot.isDragging ? "d-none" : ""
                              } flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo`}
                            >
                              <FaSortAmountDown className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Rating Scale
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="RatingScaleMatrix" index={9}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <BiSolidGrid className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Rating Matrix
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="Ranking" index={10}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <LiaMedalSolid className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Ranking
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="PercentageSum" index={11}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Percentage/Sum
                            </div>
                          )}
                        </Draggable>

                        {/* {provided.placeholder} */}
                      </div>
                      <div className="flex flex-wrap gap-[5px] mt-[15px]">
                        <Draggable draggableId="Heading" index={12}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={`${
                                snapshot.isDragging ? "d-none" : ""
                              } flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo`}
                            >
                              <RxHeading className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Heading
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="CustomText" index={13}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Custom Text
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="ScoreDisplay" index={14}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <LiaMedalSolid className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Score Display
                            </div>
                          )}
                        </Draggable>
                        <Draggable draggableId="PageBreak" index={15}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo"
                            >
                              <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                              Page Break
                            </div>
                          )}
                        </Draggable>

                        {/* {provided.placeholder} */}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="flex flex-wrap gap-[5px]">
                {/* <p
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
              </p> */}
                {/* <p
                id="3"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("DropDown")}
                onDragLeave={() => setDrag(true)}
              >
                <PiArrowCircleDownBold className="text-[#43AED8] text-[25px] pl-[5px] " />
                Drop down
              </p> */}
                {/* <p
                id="4"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("DropDownGrid")}
                onDragLeave={() => setDrag(true)}
              >
                <PiArrowCircleDownBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                Drop down Grid
              </p> */}
                {/* <p
                id="5"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("YesNo")}
                onDragLeave={() => setDrag(true)}
              >
                <PiCircleHalfFill className="text-[#43AED8] text-[25px] pl-[5px]" />
                Yes/No
              </p> */}
                {/* <p
                id="6"
                className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px]  cursor-all-scroll"
                draggable
                onDragStart={() => handleDragStart("NetPromoter")}
                onDragLeave={() => setDrag(true)}
              >
                <FaRegThumbsUp className="text-[#43AED8] text-[25px] pl-[5px]" />
                Net Promoter
              </p> */}
              </div>
              {/* <div className="flex flex-wrap gap-[5px] mt-[15px]">
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
              </div> */}
              {/* <div className="flex flex-wrap gap-[5px] mt-[15px]">
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
              </div> */}
              {/* <div className="flex flex-wrap gap-[5px] mt-[15px]">
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
              </div> */}
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
        </DragDropContext>
      </div>
      <div className="h-[30px] w-[300px] bg-white m-auto flex items-center justify-center mt-[30px]">
        <p className="text-[14px]">Evega Technologies LLP</p>
      </div>
    </div>
  );
};

export default TemplateBody;
