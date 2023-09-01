import { configureStore } from "@reduxjs/toolkit";
import textFieldReducer from "../slices/TextFieldSlice";
import formDataReducer from "../slices/FormSlice";
import YesorNoReducer from "../slices/YesorNoslice";
import MultipleChoiceReducer from "../slices/MultipleChoiceSlice";
import DropDownReducer from "../slices/DropDownSlice";
import RatingScaleReducer from "../slices/RatingScaleSlice";
import headingReducer from "../slices/HeadingSlice";
import ScoreDisplayReducer from "../slices/ScoreDisplaySlice";
import CustomTextSliceReducer from "../slices/CustomTextSlice";
import MultiplechoiceGridReducer from "../slices/MultipleChoiceGridSlice";
import DropDownGridReducer from "../slices/DropdownGridSlice";
import NetPromoterSlice from "../slices/NetPromoterSlice";
import TextFieldGridReducer from "../slices/TextFieldGridSlice";
import RatingMatrixReducer from "../slices/RatingMatrixSlice";
import PercentageSumReducer from "../slices/PercentageSumSlice";
import RankingReducer from "../slices/RankingSlice";

export const store = configureStore({
  reducer: {
    textField: textFieldReducer,
    formData: formDataReducer,
    YesorNO: YesorNoReducer,
    MultipleChoice: MultipleChoiceReducer,
    DropDown: DropDownReducer,
    RatingScale: RatingScaleReducer,
    Heading: headingReducer,
    ScoreDisplay: ScoreDisplayReducer,
    CustomText: CustomTextSliceReducer,
    MultipleChoiceGrid: MultiplechoiceGridReducer,
    DropDownGrid: DropDownGridReducer,
    NetPromoter: NetPromoterSlice,
    TextFieldGrid: TextFieldGridReducer,
    RatingMatrix: RatingMatrixReducer,
    PercentageSum: PercentageSumReducer,
    Ranking: RankingReducer,
  },
});
