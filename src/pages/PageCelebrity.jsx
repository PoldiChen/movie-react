import React from "react";
import CelebrityList from "../components/Celebrity/CelebrityList/index";

class PageCelebrity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <CelebrityList />
        );
    }
}

export default PageCelebrity;