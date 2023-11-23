import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
];

const NewTemplate1 = () => {
  const Sortable = useSortable();
  const Draggable = useDraggable();
  const Droppable = useDroppable();
  const [droppedOptions, setDroppedOptions] = useState([]);

  const handleDrop = (droppedId) => {
    const option = options.find((option) => option.id === droppedId);
    setDroppedOptions([...droppedOptions, option]);
  };

  return (
    <DndContext>
      <div className="app">
        <div className="options-container">
          {options.map((option) => (
            <Draggable key={option.id} id={option.id}>
              {({ draggableProps }) => (
                <div {...draggableProps} className="option-item">
                  {option.label}
                </div>
              )}
            </Draggable>
          ))}
        </div>
        <div className="droppable-container">
          <SortableContext>
            <Droppable onDrop={handleDrop}>
              {({ droppableProps }) => (
                <div {...droppableProps} className="droppable-area">
                  {droppedOptions.map((option) => (
                    <Sortable key={option.id}>
                      <div key={option.id} className="dropped-option">
                        {option.label}
                      </div>
                    </Sortable>
                  ))}
                </div>
              )}
            </Droppable>
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default NewTemplate1;
