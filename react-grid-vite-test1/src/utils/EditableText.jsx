// EditableTextItem.js hello
import React, { useState, useRef, useEffect } from 'react';
import "./Background.css";

const EditableTextItem = ({ initialText, id, onStateChange, colors }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
    onStateChange(id, text);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Save the changes or perform any required actions here
  };

  // Focus the input field when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputRef}
        />
      ) : (
        (id === "Background") ? (<span className='background-text'
                                       style={{color: colors.headerFont}}>{text}</span>)
                              : (<span className='background-text'>{text}</span>)
      )}
    </div>
  );
};

export default EditableTextItem;