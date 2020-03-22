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
        title: "Log ID",
        dataIndex: "log_id",
        key: "log_id",
        width: "10%"
    } ,{
        title: "Level",
        dataIndex: "level",
        key: "level",
        width: "10%"
    }, {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "20%"
    }, {
        title: "Detail",
        dataIndex: "detail",
        key: "detail",
        width: "40%"
    }, {
        title: "Create At",
        dataIndex: "create_at",
        key: "create_at"
    }
];

export default Columns;