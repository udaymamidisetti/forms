import React, { useState } from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MultipleChoice from "./MultipleChoice";
import MultipleChoiceGrid from "./MultipleChoiceGrid";
import DropDown from "./DropDown";
import DropDownGrid from "./DropDownGrid";
import { PiArrowCircleRightBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  copyItems,
  deleteOptionByIndex,
  moveItems,
  reorderItems,
} from "../redux/slices/FormSlice";
import PageBreak from "./PageBreak";
import ScoreDisplay from "./ScoreDisplay";
import CustomText from "./CustomText";
import Heading from "./Heading";
import PercentageSum from "./PercentageSum";
import Ranking from "./Ranking";
import RatingScaleMatrix from "./RatingScaleMatrix";
import RatingScale from "./RatingScale";
import TextFieldGrid from "./TextFieldGrid";
import { TextField } from "@mui/material";
import NetPromoter from "./NetPromoter";
import YesorNo from "./YesorNo";
import { Link } from "react-router-dom";
import { RiDragMove2Fill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import TemplatePreview from "./TemplatePreview";
// import console = require('console');

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log("==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Content = styled.div``;

const Item = styled.div`
  width: 750px;
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${(props) => (props.isDragging ? "dashed #4099ff" : "solid #ddd")};
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;

const List = styled.div`
  border: 1px
    ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  padding-top: 0;
  border-radius: 3px;
  font-family: sans-serif;
`;

const Kiosk = styled(List)`
  width: 320px;
  height: 420px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  background-color: transparent;
  border: none;
`;

const Container = styled(List)`
  width: 750px;
  margin: 0.5rem 0.5rem 1.5rem;
  background: #ccc;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin: 0 1rem;
`;

const ITEMS = [
  {
    id: uuid(),
    content: "MultipleChoice",
    body: "<h1>Head<h1/>",
  },
  {
    id: uuid(),
    content: "MultipleChoiceGrid",
  },
  {
    id: uuid(),
    content: "DropDown",
  },
  {
    id: uuid(),
    content: "DropDownGrid",
  },
  {
    id: uuid(),
    content: "Yes/No",
  },
  {
    id: uuid(),
    content: "NetPromoter",
  },
  {
    id: uuid(),
    content: "TextField",
  },
  {
    id: uuid(),
    content: "TextFieldGrid",
  },
  {
    id: uuid(),
    content: "RatingScale",
  },
  {
    id: uuid(),
    content: "RatingScaleMatrix",
  },
  {
    id: uuid(),
    content: "Ranking",
  },
  {
    id: uuid(),
    content: "PercentageSum",
  },
  {
    id: uuid(),
    content: "Heading",
  },
  {
    id: uuid(),
    content: "CustomText",
  },
  {
    id: uuid(),
    content: "ScoreDisplay",
  },
  {
    id: uuid(),
    content: "PageBreak",
  },
];

const NewTemplate = () => {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.formData.items);
  const [state, setState] = useState({
    [uuid()]: [],
  });
  // const onDragEnd = (result) => {

  //   const { source, destination } = result;
  //   console.log("==> result", result);
  //   // dropped outside the list
  //   if (!destination) {
  //     return;
  //   }
  //   switch (source.droppableId) {
  //     case destination.droppableId:
  //       dispatch(
  //         reorderItems({
  //           droppableId: destination.droppableId,
  //           sourceIndex: source.index,
  //           destinationIndex: destination.index,
  //         })
  //       );
  //       break;
  //     case "ITEMS":
  //       dispatch(
  //         copyItems({
  //           ITEMS,
  //           droppableId: destination.droppableId,
  //           source,
  //           destination,
  //         })
  //       );
  //       break;
  //     default:
  //       dispatch(
  //         moveItems({
  //           sourceDroppableId: source.droppableId,
  //           destinationDroppableId: destination.droppableId,
  //           sourceIndex: source.index,
  //           destinationIndex: destination.index,
  //         })
  //       );
  //       break;
  //   }
  // };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log("==> result", result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setState({
          [destination.droppableId]: reorder(
            state[source.droppableId],
            source.index,
            destination.index
          ),
        });
        break;
      case "ITEMS":
        setState({
          [destination.droppableId]: copy(
            ITEMS,
            state[destination.droppableId],
            source,
            destination
          ),
        });
        break;
      default:
        setState(
          move(
            state[source.droppableId],
            state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };
  const addList = (e) => {
    this.setState({ [uuid()]: [] });
  };
  const deleteOption = (id) => {
    setState((prevState) => {
      const newState = { ...prevState };
      // Loop through each array and remove item by ID
      Object.keys(newState).forEach((key) => {
        newState[key] = newState[key].filter((item) => item.id !== id);
      });
      return newState;
    });
    // const deletedOption = localStorage.getItem('selectedOptions').slice(index,1)
    // dataArray.slice(index, 1);
  };
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <>
      <TemplatePreview />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center mt-[10px]">
          <Content>
            {/* <Button onClick={this.addList}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
            <ButtonText>Add List</ButtonText>
          </Button> */}
            {Object.keys(state).map((list, i) => {
              console.log("==> list", list);
              return (
                <Droppable key={list} droppableId={list}>
                  {(provided, snapshot) => (
                    <div
                      className="w-[750px] bg-white h-[420px]"
                      ref={provided.innerRef}
                      // isDraggingOver={snapshot.isDraggingOver}
                    >
                      {state[list].length ? (
                        state[list].map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                isDragging={snapshot.isDragging}
                                style={provided.draggableProps.style}
                              >
                                <div {...provided.dragHandleProps}>
                                  {/* <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                    />
                                  </svg> */}
                                  <RiDragMove2Fill className="absolute z-10 left-[500px]" />
                                </div>
                                {item.content === "MultipleChoice" && (
                                  <MultipleChoice
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(item.id)}
                                    dragHandleProps={item.dragHandleProps}
                                  />
                                )}
                                {item.content === "MultipleChoiceGrid" && (
                                  <MultipleChoiceGrid
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(item.id)}
                                  />
                                )}
                                {item.content === "DropDown" && (
                                  <DropDown
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(item.id)}
                                  />
                                )}
                                {item.content === "DropDownGrid" && (
                                  <DropDownGrid
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(item.id)}
                                  />
                                )}
                                {item.content === "YesNo" && (
                                  <YesorNo
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "NetPromoter" && (
                                  <NetPromoter
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "TextField" && (
                                  <TextField
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "TextFieldGrid" && (
                                  <TextFieldGrid
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "RatingScale" && (
                                  <RatingScale
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "RatingScaleMatrix" && (
                                  <RatingScaleMatrix
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "Ranking" && (
                                  <Ranking
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "PercentageSum" && (
                                  <PercentageSum
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "Heading" && (
                                  <Heading
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "CustomText" && (
                                  <CustomText
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "ScoreDisplay" && (
                                  <ScoreDisplay
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                                {item.content === "PageBreak" && (
                                  <PageBreak
                                    key={`${item.content}-${index}`}
                                    index={index}
                                    componentId={`component${index + 1}`}
                                    onDelete={() => deleteOption(index)}
                                  />
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : provided.placeholder ? (
                        <div className="bg-[white] w-[750px] h-[100%] flex justify-center items-center transition-all duration-200 ease-in-expo">
                          <div>
                            <h1 className="text-[22px] w-full flex items-center gap-[10px]">
                              Drag a question from the list on the right
                              <FaArrowRight />
                            </h1>
                            <p className={` w-full`}>
                              or, you can{" "}
                              <span className="text-[#3c8dd5] cursor-pointer">
                                learn more about FourEyes here
                              </span>{" "}
                              :-)
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>trry</div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </Content>
          <Droppable droppableId="ITEMS" isDropDisabled={true}>
            {(provided, snapshot) => (
              <Kiosk
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {ITEMS.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                          style={provided.draggableProps.style}
                          className={`${
                            snapshot.isDragging ? "d-none" : ""
                          } flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo`}
                        >
                          <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                          {item.content}
                        </div>
                        {snapshot.isDragging && (
                          <div className="flex items-center bg-white w-[140px] h-[30px] text-[12px] gap-[5px] cursor-all-scroll transition-all duration-200 ease-in-expo">
                            <PiArrowCircleRightBold className="text-[#43AED8] text-[25px] pl-[5px]" />
                            {item.content}
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </Draggable>
                ))}
                <Link to="/uday/preview">
                  <button className="bg-[#3c8dd5] w-[140px] ml-[70px] text-[white] mt-[20px] text-[14px] pt-[8px] pb-[8px]">
                    Preview
                  </button>
                </Link>
              </Kiosk>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};
export default NewTemplate;
