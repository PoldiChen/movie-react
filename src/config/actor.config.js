import React from "react";
import { Tag } from 'antd';
import getColor from "../utils/common";

const Columns = [
    {
        title: "Key",
        dataIndex: "key",
        key: "key",
        width: "15%"
    }, {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%"
    }, {
        title: "Birth Date",
        dataIndex: "birth_date",
        key: "birth_date",
        width: "20%"
    }, {
        title: "Nationality",
        dataIndex: "nationality",
        key: "nationality",
        width: "15%"
    }, {
        title: "Search",
        dataIndex: "search",
        key: "search"
    }
];

export default Columns;