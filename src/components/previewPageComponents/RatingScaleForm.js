import React from "react";
import { useDispatch, useSelector } from "react-redux";

const RatingScaleForm = (props) => {
  const { index, questionData } = props;
  const {
    question,
    hideNumber,
    requiredOption,
    agreeOptions,
    image,
    displayMode,
  } = questionData;
  console.log(agreeOptions);
  // const question = useSelector((state) => state.RatingScale.questionInput);
  // const hideNumber = useSelector((state) => state.RatingScale.hideNumber);
  // const requiredOption = useSelector(
  //   (state) => state.RatingScale.requiredOption
  // );
  // const agreedOptions = useSelector((state) => state.RatingScale.agreeOptions);
  const agreedOptionContent = () => {
    switch (agreeOptions) {
      case "agree2":
        return (
          <div>
            {displayMode === "Radio" ? (
              <div className="ml-[30px] mt-[10px]">
                <div>
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <select className="border w-[90%] focus:outline-none p-[5px]">
                  <option></option>
                  <option>Agree</option>
                  <option>Disagree</option>
                </select>
              </div>
            )}
          </div>
        );
      case "agree3":
        return (
          <div>
            {displayMode === "Radio" ? (
              <div className="ml-[30px] mt-[10px]">
                <div>
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree Strongly
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree Strongly
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <select className="border w-[90%] focus:outline-none p-[5px]">
                  <option></option>
                  <option>Agree Strongly</option>
                  <option> Agree</option>
                  <option>Disagree Strongly</option>
                </select>
              </div>
            )}
          </div>
        );
      case "agree4":
        return (
          <div>
            {displayMode === "Radio" ? (
              <div className="ml-[30px] mt-[10px]">
                <div>
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree Strongly
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree Strongly
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <select className="border w-[90%] focus:outline-none p-[5px]">
                  <option></option>
                  <option>Agree Strongly</option>
                  <option>Agree</option>
                  <option>Disagree</option>
                  <option> Disagree Strongly</option>
                </select>
              </div>
            )}
          </div>
        );
      case "agree5":
        return (
          <div>
            {displayMode === "Radio" ? (
              <div className="ml-[30px] mt-[10px]">
                <div>
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree Strongly
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Agree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Neither Agree nor Disagree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree
                  </label>
                </div>
                <div className="mt-[5px]">
                  <label className="flex items-center gap-[5px]">
                    <input type="radio" />
                    Disagree Strongly
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <select className="border w-[90%] focus:outline-none p-[5px]">
                  <option></option>
                  <option>Agree Strongly</option>
                  <option>Agree</option>
                  <option>Neither Agree nor Disagree</option>
                  <option>Disagree</option>
                  <option> Disagree Strongly</option>
                </select>
              </div>
            )}
          </div>
        );
      default:
        break;
    }
  };
  return (
    <div>
      {" "}
      <div className="max-w-[900px] m-auto pt-[30px]">
        <div className="flex items-center gap-[10px]">
          {hideNumber ? (
            <p className="bg-[#3A9CEA] pl-[8px] pr-[8px] pt-[4px] pb-[4px] text-[12px] rounded-md text-white font-semibold">
              {index + 1}
            </p>
          ) : (
            ""
          )}
          {requiredOption ? <span className="text-[red]">*</span> : null}
          <div
            className="text-[13px]"
            dangerouslySetInnerHTML={{ __html: question }}
          />
        </div>
        {image === null ? "" : <img src={image} alt="image" />}
        {agreedOptionContent()}
      </div>
    </div>
  );
};

export default RatingScaleForm;
