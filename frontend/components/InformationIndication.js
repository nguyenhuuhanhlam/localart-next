// import styled from 'styled-components'

// const Layout = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	min-height: 2em;
	
// 	.text {
// 		display: inherit;
// 		padding-left: 8px;
// 		color: gray;
// 		font-size: 10pt;
// 	}

// 	.bi {
// 		color: gray;
// 	}
// `

const InformationIndication = ({ iconName,text }) =>
{
	return (
		<div>
			<i className={"bi " + iconName}/>
			<div className="text">{text}</div>
		</div>
	)
}

export default InformationIndication