import React, { useEffect, useRef } from "react";

interface AutoResizeTextProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}

const AutoResizeText: React.FC<AutoResizeTextProps> = ({
  value,
  onChange,
  readOnly,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Сбрасываем высоту
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Устанавливаем новую высоту
    }
  }, [value]);

  return (
    <div className="custom-resize-text__wrapper">
      <textarea
        className="custom-resize-text__text"
        ref={textAreaRef}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        rows={1}
        style={{
          overflow: "hidden",
          minHeight: "auto",
        }}
      />
    </div>
  );
};

export default AutoResizeText;
