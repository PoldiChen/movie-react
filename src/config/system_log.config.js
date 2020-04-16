import React from "react";

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
        width: "20%"
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
        key: "detail"
    }, {
        title: "Create At",
        dataIndex: "create_at",
        key: "create_at",
        width: "15%"
    }
];

export default Columns;