import React from "react";
import { useSelector } from "react-redux";
const HeadingForm = () => {
  const heading = useSelector((state) => state.Heading.heading);
  console.log(heading);
  return (
    <div>
      <h1 className="text-[24px] font-bold text-[#333333] h-[100px]">
        {Object.entries(heading).map(([componentId, componentData]) => (
          <div key={componentId}>
            <p>{componentData.value}</p>
          </div>
        ))}
        {/* {heading.map((component) => ( */}
        {/* <div key={component.componentId}> */}
        {/* <h3>Component ID: {component.componentId}</h3> */}
        {/* <p>Heading: {component.value}</p> */}
        {/* </div> */}
        {/* ))} */}
      </h1>
    </div>
  );
};

export default HeadingForm;
