import React from "react";
import {Spin} from 'antd';
import {useSelector} from "react-redux";

const MainApp= ({children}) => {
	const loading = useSelector(state => state.loading);

	return (
		<>
			{loading && <Spin spinning={true}/>}
			{children}
		</>
	)
}

export default MainApp;
