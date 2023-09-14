import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import TextFieldForm from "../components/previewPageComponents/TextFieldForm";
import YesorNoForm from "../components/previewPageComponents/YesorNoForm";
import MultipleChoiceForm from "../components/previewPageComponents/MultipleChoiceForm";
import { useNavigate, useParams } from "react-router-dom";
import DropDownForm from "../components/previewPageComponents/DropDownForm";
import RatingScaleForm from "../components/previewPageComponents/RatingScaleForm";
import HeadingForm from "../components/previewPageComponents/HeadingForm";
import ScoreDisplayForm from "../components/previewPageComponents/ScoreDisplayForm";
import MultipleChoiceGridForm from "../components/previewPageComponents/MultipleChoiceGridForm";
import CustomTextForm from "../components/previewPageComponents/CustomTextForm";
import NetPromoterForm from "../components/previewPageComponents/NetPromoterForm";
import PercentageSumForm from "../components/previewPageComponents/PercentageSumForm";
import RankingForm from "../components/previewPageComponents/RankingForm";
import TextFieldGridForm from "../components/previewPageComponents/TextFieldGridForm";
import RatingScaleMatrixForm from "../components/previewPageComponents/RatingScaleMatrixForm";
import DropDownGridForm from "../components/previewPageComponents/DropDownGridForm";

const Preview = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState([]);
  const tokenId = useSelector((state) => state.formData.tokenId);
  console.log(tokenId);
  const selectedOptions = useSelector(
    (state) => state.formData.selectedOptions
  );

  const sortedOptions = [...new Set(selectedOptions)];
  console.log(sortedOptions);
  const options = useSelector((state) => state.formData.options);

  useEffect(() => {
    getAllOptionValues();
  }, []);

  const getAllOptionValues = async () => {
    const values = {
      tokenId: id,
    };
    axios
      .post("https://demo.sending.app/react-api", values)
      .then((response) => {
        console.log(response.data.form_data);
        setData(JSON.parse(response.data.form_data));
        console.log(data);
      })
      .catch((e) => console.log(e));
  };
  // console.log(Object.keys(data));
  const keys = [...data].map((item) => Object.values(item)[0]);
  console.log(keys);
  const getOptionContent = (optionId) => {
    const option = options.find((opt) => opt.id === optionId);
    if (option) {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = option.content;
      return tempElement.outerHTML;
    }
    return "";
  };

  const htmlStructure = (
    <div>
      {/* {data.map((optionId, index) => {
        const keys = data.map((item) => Object.keys(item)[0]);
        const dataType = data[keys];
        switch (keys) {
          case "TextField1":
            return (
              <TextFieldForm
                key={`${optionId}-${index}`}
                index={index}
                questionData={dataType}
              />
            );
          case "YesNo":
            return <YesorNoForm key={`${optionId}-${index}`} index={index} />;
          case "MultipleChoice":
            return (
              <MultipleChoiceForm key={`${optionId}-${index}`} index={index} />
            );
          case "DropDown":
            return <DropDownForm key={`${optionId}-${index}`} index={index} />;
          case "RatingScale":
            return (
              <RatingScaleForm key={`${optionId}-${index}`} index={index} />
            );
          case "Heading":
            return <HeadingForm key={`${optionId}-${index}`} index={index} />;
          case "ScoreDisplay":
            return (
              <ScoreDisplayForm key={`${optionId}-${index}`} index={index} />
            );
          case "MultipleChoiceGrid":
            return (
              <MultipleChoiceGridForm
                key={`${optionId}-${index}`}
                index={index}
              />
            );
          case "CustomText":
            return (
              <CustomTextForm key={`${optionId}-${index}`} index={index} />
            );
          default:
            return null;
        }
      })} */}
      {/* {data.map((e,i) => (
        
      ))} */}
      {/* {console.log(Object.values(data))} */}
      {keys.map((e, i) => {
        console.log(data);
        return (
          <div key={i}>
            <div>
              {e.slice(0, -1) === "TextField" && (
                <TextFieldForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "Multiplechoice" && (
                <MultipleChoiceForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "Heading" && (
                <HeadingForm
                  questionData={data[i].overallStates}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "RatingScale" && (
                <RatingScaleForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "ScoreDisplay" && (
                <ScoreDisplayForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "YesNo" && (
                <YesorNoForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "DropDown" && (
                <DropDownForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "CustomText" && (
                <CustomTextForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "NetPromoter" && (
                <NetPromoterForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "PercentageSum" && (
                <PercentageSumForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "Ranking" && (
                <RankingForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "MultipleChoiceGrid" && (
                <MultipleChoiceGridForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "TextFieldGrid" && (
                <TextFieldGridForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "RatingScaleMatrix" && (
                <RatingScaleMatrixForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
              {e.slice(0, -1) === "DropDownGrid" && (
                <DropDownGridForm
                  questionData={data[i].overallStates}
                  index={i}
                  key={`${keys}-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const handleSubmit = () => {
    const htmlStructurePost = document.getElementById("htmlContent");
    const data = {
      html_json: htmlStructurePost.innerHTML,
    };
    console.log(htmlStructurePost.innerHTML);
    // const url = `https://demo.sending.app/react-api?html_json`;

    axios
      .post("https://demo.sending.app/react-api", data)
      .then((response) => {
        console.log(response);
        console.log("HTML structure submitted successfully");
      })
      .catch((error) => {
        console.error("Failed to submit HTML structure:", error);
      });
  };

  // useEffect(() => {
  //   getAllConditions();
  // }, []);

  return (
    <div
      className="max-w-[1000px] bg-[white] m-auto h-[100vh] overflow-scroll"
      id="htmlContent"
    >
      {htmlStructure}
      <div className="max-w-[900px] flex justify-end m-auto">
        <button
          className="mt-[15px] bg-transparent border rounded-md pt-[6px] pb-[6px] pr-[12px] pl-[12px] text-[#444444] hover:text-[#3A9CEA] hover:border-[#3A9CEA]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Preview;
