import React from "react";
import { Tag } from 'antd';
import getColor from "../utils/common";

const Columns = [
    {
        title: "Key",
        dataIndex: "key",
        key: "key",
        width: "5%"
    },{
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: "8%"
    } ,{
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "40%"
    }, {
        title: "Actor",
        dataIndex: "actors",
        key: "actors",
        width: "10%"
    }, {
        title: "Length",
        dataIndex: "length",
        key: "length",
        width: "10%"
    }, {
        title: "Publish Date",
        dataIndex: "publish_date",
        key: "publish_date"
    }
];

export default Columns;