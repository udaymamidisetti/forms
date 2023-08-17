import React from "react";
import { useSelector } from "react-redux";
import { shuffle } from "fast-shuffle";

const MultipleChoiceForm = (props) => {
  const { index } = props;
  const question = useSelector((state) => state.MultipleChoice.question);
  const hideNumber = useSelector((state) => state.MultipleChoice.hideNumber);
  const requiredOption = useSelector(
    (state) => state.MultipleChoice.requiredOption
  );
  const choiceLayout = useSelector(
    (state) => state.MultipleChoice.choiceLayout
  );
  const randomChoice = useSelector(
    (state) => state.MultipleChoice.randomChoice
  );
  const options = useSelector((state) => state.MultipleChoice.options);
  const image = useSelector((state) => state.MultipleChoice.images);
  const multipleAnswers = useSelector(
    (state) => state.MultipleChoice.multipleAnswers
  );
  return (
    // <div>
    //   <div className="max-w-[900px] m-auto pt-[30px]">
    //     <div className="flex items-center gap-[10px]">
    //       {hideNumber ? (
    //         <p className="bg-[#3A9CEA] pl-[8px] pr-[8px] pt-[4px] pb-[4px] text-[12px] rounded-md text-white font-semibold">
    //           {index + 1}
    //         </p>
    //       ) : (
    //         ""
    //       )}
    //       {requiredOption ? <span className="text-[red]">*</span> : ""}
    //       <div
    //         className="text-[13px]"
    //         dangerouslySetInnerHTML={{ __html: question }}
    //       />
    //       {/* {question} */}
    //     </div>
    //     {image === null ? "" : <img src={image} alt="image" />}
    //     <div className={choiceLayout === "horizontal" ? "flex" : ""}>
    //       {randomChoice
    //         ? shuffle(options).map((e, index) => (
    //             <>
    //               <div
    //                 className="flex gap-[5px] ml-[40px] mt-[10px] cursor-pointer hover:bg-[#3a9cea80] hover:border-[1px] hover:border-[#3a9cea80] h-[30px] p-[5px] items-center"
    //                 key={index}
    //               >
    //                 <input
    //                   type={multipleAnswers ? "checkbox" : "radio"}
    //                   id={index}
    //                 />
    //                 <div
    //                   className="text-[16px]"
    //                   htmlFor={index}
    //                   dangerouslySetInnerHTML={{ __html: e.title }}
    //                 />
    //               </div>
    //               {e.includeOtherTextField && <input />}
    //             </>
    //           ))
    //         : options.map((e, index) => (
    //             <div>
    //               <div
    //                 className="flex gap-[5px] ml-[40px] mt-[10px] cursor-pointer hover:bg-[#3a9cea80] hover:border-[1px] hover:border-[#3a9cea80] h-[30px] p-[5px] items-center"
    //                 key={index}
    //               >
    //                 {e.image === null ? "" : <img src={e.image} />}
    //                 <input
    //                   type={multipleAnswers ? "checkbox" : "radio"}
    //                   id={index}
    //                 />
    //                 <div
    //                   className="text-[16px]"
    //                   htmlFor={index}
    //                   dangerouslySetInnerHTML={{ __html: e.title }}
    //                 />
    //               </div>
    //               {e.includeOtherTextField && (
    //                 <input
    //                   className="border focus:outline-none ml-[60px] text-[14px] p-[5px] focus:w-[840px]"
    //                   placeholder="Text goes here"
    //                 />
    //               )}
    //             </div>
    //           ))}
    //     </div>
    //   </div>
    // </div>
    <div>
      {Object.entries(question).map(([componentId, componentData]) => (
        <div key={componentId}>
          <div dangerouslySetInnerHTML={{ __html: componentData.value }} />
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceForm;
