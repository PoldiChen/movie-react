import React from "react";
import { Tag } from 'antd';
import getColor from "../utils/common";

const Columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%"
    }, {
        title: "Publish Date",
        dataIndex: "publish_date",
        key: "publish_date"
    }
];

export default Columns;