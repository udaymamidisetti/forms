import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import TextFieldForm from "../components/previewPageComponents/TextFieldForm";
import YesorNoForm from "../components/previewPageComponents/YesorNoForm";
import MultipleChoiceForm from "../components/previewPageComponents/MultipleChoiceForm";
import { useNavigate } from "react-router-dom";
import DropDownForm from "../components/previewPageComponents/DropDownForm";
import RatingScaleForm from "../components/previewPageComponents/RatingScaleForm";
import HeadingForm from "../components/previewPageComponents/HeadingForm";
import ScoreDisplayForm from "../components/previewPageComponents/ScoreDisplayForm";
import MultipleChoiceGridForm from "../components/previewPageComponents/MultipleChoiceGridForm";
import CustomTextForm from "../components/previewPageComponents/CustomTextForm";
import Cookies from "js-cookie";

const Preview = () => {
  const navigate = useNavigate();
  const selectedOptions = useSelector(
    (state) => state.formData.selectedOptions
  );
  const options = useSelector((state) => state.formData.options);
  const ref_id = Cookies.get("tokenId");
  console.log(ref_id);
  console.log(selectedOptions);
  console.log(...options);

  const getOptionContent = (optionId) => {
    const option = options.find((opt) => opt.id === optionId);
    if (option) {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = option.content;
      return tempElement.outerHTML;
    }
    return "";
  };

  // console.log(getOptionContent())
  // const containerRef = React.useRef(null);

  const htmlStructure = (
    <div>
      {selectedOptions.map((optionId, index) => {
        switch (optionId) {
          case "TextField":
            return <TextFieldForm key={`${optionId}-${index}`} index={index} />;
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

  const getAllConditions = async () => {
    const data = {
      token_id: ref_id,
    };
    const values = {
      ref_id: data,
    };
    await axios
      .get(`https://demo.sending.app/react-api?ref_id=${ref_id}`)
      .then((response) => {
        console.log("Response:", response);
        // Cookies.set("tokenId", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

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
