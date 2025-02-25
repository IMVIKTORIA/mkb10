import React, { useState, useRef, useEffect } from "react";

/** Пропсы Данных элемента списка заболеваний */
interface DiseaseListDataProps { 
  code?: string,
  name?: string, 
  comment?: string, 
  isVisible: boolean 
}

/** Данные элемента списка заболеваний */
const DiseaseListData = ({ code, name, comment, isVisible }: DiseaseListDataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const commentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const toggleComment = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (commentRef.current) {
      const { scrollHeight, clientHeight } = commentRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [comment, isVisible]);

  return (
    <div className="disease-list">
      <div className="disease-list__info">
        <div className="disease-list__code">{code}</div>
        <div className="disease-list__name">{name}</div>
      </div>
      {isVisible && comment && (
        <div
          ref={commentRef}
          className={`disease-list__comment ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          {comment}
        </div>
      )}
      {isVisible && isOverflowing && !isExpanded && comment && (
        <div className="disease-list__button" onClick={toggleComment}>
          [показать описание]
        </div>
      )}
    </div>
  );
};

export default DiseaseListData;
