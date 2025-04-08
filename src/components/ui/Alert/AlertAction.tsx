// import React, {useState, Fragment} from 'react';
// import './Alert.scss'
//
// export default function AlertAction({open, setOpen, currentGo, alertText}) {
// 	const handleClose = () => {
// 		setOpen(false);
// 	};
//
// 	return (
// 		<Dialog
// 			open={open}
// 			onClose={handleClose}
// 			className="alertAction"
// 		>
// 			<DialogTitle className="alert-header">
// 				{alertText.title}
// 			</DialogTitle>
// 			<DialogContent>
// 				<DialogContentText className="alert-body" dangerouslySetInnerHTML={{__html: alertText.contents}} />
// 			</DialogContent>
// 			<DialogActions className="alert-footer">
// 				<Button onClick={handleClose} className="cancel">취소</Button>
// 				<Button onClick={currentGo} autoFocus>{alertText.btn}</Button>
// 			</DialogActions>
// 		</Dialog>
// 	);
// }

import React from "react";

export default function AlertAction(){
  return(
    <>

    </>
  )
};