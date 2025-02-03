import React, { useState } from 'react'
import { RecursionListProps, JsonDataType } from '../../shared/types'
import DiseaseList from '../DiseaseList/DiseaseList'
import icons from '../../shared/icons'

export default function RecursionList(props: RecursionListProps) {
	const { jsonData } = props

	const [isSorted, setIsSorted] = useState(false)

	const handleIconClick = () => {
		setIsSorted((prevState) => !prevState)
	}

	return (
		<div className="list-wrapper">
			<div className="list-wrapper__data">
				{/* TODO: Отображение шапки раскрываемого списка с номером, названием и тд и тп. Продумать отображение иконки-стрелочки исходя из jsonData.children?.length*/}
				{/*jsonData.children && jsonData.children.length > 0 && (
                    <div className="list-wrapper__icons_right">
                        {icons.SortArrow}
                    </div>
                )*/}
				<div
					className={`list-wrapper__icons_right ${isSorted ? 'list-wrapper__icons_down' : ''}`}
					onClick={handleIconClick}
				>
					{icons.SortArrow}
				</div>

				<DiseaseList code={jsonData.code} name={jsonData.fullname} comment={jsonData.comment} />
			</div>
			<div className="list-wrapper__children">
				{/* TODO: Отображение дочерних элементов. Продумать флаг открытости/ закрытости списка 
				{
					jsonData.children?.length &&
						jsonData.children.map((child: JsonDataType) => <RecursionList jsonData={child} />) // child - это структура jsonData
				}*/}
			</div>
		</div>
	)
}
