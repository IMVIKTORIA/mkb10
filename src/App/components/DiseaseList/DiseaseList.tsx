import React, { useState } from 'react'

const DiseaseList = ({ code, name, comment }) => {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleComment = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className="disease-list">
			<div className="disease-list__info">
				<div className="disease-list__code">{code}</div>
				<div className="disease-list__name">{name}</div>
			</div>
			{comment && (
				<div className={`disease-list__comment ${isExpanded ? 'expanded' : 'collapsed'}`}>
					{comment}
				</div>
			)}
			{!isExpanded && comment && (
				<div className="disease-list__button" onClick={toggleComment}>
					[показать описание]
				</div>
			)}
		</div>
	)
}

export default DiseaseList
