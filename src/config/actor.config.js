import React from "react";
import { Tag } from 'antd';
import getColor from "../utils/common";

const Columns = [
    {
        title: "Key",
        dataIndex: "key",
        key: "key",
        width: "20%"
    }, {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%"
    }, {
        title: "Birth Date",
        dataIndex: "birth_date",
        key: "birth_date"
    }, {
        title: "Nationality",
        dataIndex: "nationality",
        key: "nationality"
    }
];

export default Columns;