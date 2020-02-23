import React from "react";
import ActorList from "../components/Actor/ActorList/index";

class PageActor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <ActorList />
        );
    }
}

export default PageActor;