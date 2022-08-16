import React, { useState } from "react";

const Editable = ({
  text,
  type,
  placeholder,
  children,
  ...props
}) => {

  const [isEditing, setEditing] = useState(false);

  const handleKeyDown = (event, type) => {
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
        >
          <span style={{fontSize:'35px'}}>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;