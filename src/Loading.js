import React from 'react'
import ReactLoading from "react-loading"

const Loading = () => {

    const style = {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };
    


return (
    <center style={style}>
        <ReactLoading type={'spinningBubbles'} color="blue" />
    </center>
)
}

export default Loading