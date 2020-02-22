import React from "react";
import { Input, Divider, Popconfirm, message } from "antd";
import ModalView from "../ModalView/index";
import Columns from "../../../config/movie.config";
import IconLike from "../../common/IconLike/index";
import asyncFetch from "../../../utils/asyncFetch";
import { API } from "../../../config/api.config";
import _ from "lodash";
import PropTypes from "prop-types";

const { Search } = Input;

class MovieSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleOnSearch(e) {
        console.log("handleOnSearch");
        console.log(e);
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    style={{marginBottom: 15}}
                    onSearch={this.handleOnSearch}
                />
            </div>
        );
    }
}

MovieSearch.contextTypes = {
    token: PropTypes.string
};

export default MovieSearch;