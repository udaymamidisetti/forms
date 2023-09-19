import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addOption,
  deleteState,
  setChoicesOrder,
  setTokenId,
} from "../redux/slices/FormSlice";
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
import Header from "./Header";
import axios from "axios";
const TemplateBody = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.formData.tokenId);
  const overallStates = useSelector((state) => state.formData.allStateValues);
  const selectedOptions = useSelector(
    (state) => state.formData.selectedOptions
  );
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    console.log(destination.droppableId);
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
        dispatch(
          setChoicesOrder({
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
      default:
        const droppedOption = result.draggableId;
        dispatch(
          addOption({
            droppedOption: droppedOption,
            componentId: droppedOption + destination.index,
          })
        );
        break;
    }
  };

  const deleteOption = (index) => {
    dispatch(deleteOptionByIndex(index));
    dispatch(deleteState(index));
    // const deletedOption = localStorage.getItem('selectedOptions').slice(index,1)
    // dataArray.slice(index, 1);
  };
  const handleSave = async () => {
    const values = {
      form_data: overallStates,
      tokenId: id,
    };

    await axios
      .post("https://demo.sending.app/react-api", values)
      .then((response) => {
        console.log("Response:", response.data);
        dispatch(setTokenId(response.data.tokenId));
        window.open(`/uday/preview/${response.data.tokenId}`, "_blank");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
                        {optionId.droppedOption === "MultipleChoice" && (
                          <MultipleChoice
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`Multiplechoice${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "MultipleChoiceGrid" && (
                          <MultipleChoiceGrid
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`MultipleChoiceGrid${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "DropDown" && (
                          <DropDown
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`DropDown${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "DropDownGrid" && (
                          <DropDownGrid
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`DropDownGrid${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "YesNo" && (
                          <YesorNo
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`YesNo${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "NetPromoter" && (
                          <NetPromoter
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`NetPromoter${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "TextField" && (
                          <TextField
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`TextField${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "TextFieldGrid" && (
                          <TextFieldGrid
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`TextFieldGrid${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "RatingScale" && (
                          <RatingScale
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`RatingScale${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "RatingScaleMatrix" && (
                          <RatingScaleMatrix
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`RatingScaleMatrix${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "Ranking" && (
                          <Ranking
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`Ranking${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "PercentageSum" && (
                          <PercentageSum
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`PercentageSum${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "Heading" && (
                          <Heading
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`Heading${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "CustomText" && (
                          <CustomText
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`CustomText${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "ScoreDisplay" && (
                          <ScoreDisplay
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`ScoreDisplay${index + 1}`}
                            onDelete={() => deleteOption(index)}
                          />
                        )}
                        {optionId.droppedOption === "PageBreak" && (
                          <PageBreak
                            key={`${optionId}-${index}`}
                            index={index}
                            componentId={`PageBreak${index + 1}`}
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

  return (
    <div>
      <div className="bg-[black]/[0.2] max-w-[1120px] m-auto pl-[30px] pr-[30px] pb-[30px] mt-[30px]">
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
                    <div {...provided.droppableProps} ref={provided.innerRef}>
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
              <div className="flex flex-wrap gap-[5px]"></div>

              {/* <button className="bg-[#3c8dd5] w-full text-[white] mt-[20px] text-[14px] pt-[8px] pb-[8px]">
                Create a Template
              </button> */}
              {/* {array.length > 0 && ( */}
              {/* <Link to={`/uday/preview/${id}`} target="__blank"> */}
              <button
                className="bg-[#3c8dd5] w-full text-[white] mt-[20px] text-[14px] pt-[8px] pb-[8px]"
                onClick={handleSave}
              >
                Preview
              </button>
              {/* </Link> */}

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
