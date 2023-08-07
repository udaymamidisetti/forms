import React from "react";
import { useDispatch, useSelector } from "react-redux";

const RatingScaleForm = (props) => {
  const { index } = props;
  const question = useSelector((state) => state.RatingScale.questionInput);
  const hideNumber = useSelector((state) => state.RatingScale.hideNumber);
  const requiredOption = useSelector(
    (state) => state.RatingScale.requiredOption
  );
  const agreedOptions = useSelector((state) => state.RatingScale.agreeOptions);
  const agreedOptionContent = () => {
    switch (agreedOptions) {
      case "agree2":
        return (
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
        );
      case "agree3":
        return (
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
        );
      case "agree4":
        return (
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
        );
      case "agree5":
        return (
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
          <p className="text-[13px]">
            {requiredOption ? <span className="text-[red]">*</span> : ""}
            {question}
          </p>
        </div>
        {agreedOptionContent()}
      </div>
    </div>
  );
};

export default RatingScaleForm;
