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
        width: "40%"
    }, {
        title: "Publish Date",
        dataIndex: "publish_date",
        key: "publish_date"
    }
];

export default Columns;