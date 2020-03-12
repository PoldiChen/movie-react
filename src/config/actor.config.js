import React from "react";
import { Tag } from 'antd';
import getColor from "../utils/common";

const Columns = [
    {
        title: "Key",
        dataIndex: "key",
        key: "key",
        width: "5%"
    }, {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "8%"
    }, {
        title: "Height",
        dataIndex: "height",
        key: "height",
        width: "8%"
    },{
        title: "Birth Date",
        dataIndex: "birth_date",
        key: "birth_date",
        width: "8%"
    }, {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: "8%"
    }, {
        title: "Nationality",
        dataIndex: "nationality",
        key: "nationality",
        width: "8%"
    }, {
        title: "Birth Place",
        dataIndex: "birth_place",
        key: "birth_place",
        width: "8%"
    },{
        title: "Hobby",
        dataIndex: "hobby",
        key: "hobby",
        width: "25%"
    } ,{
        title: "Search",
        dataIndex: "search",
        key: "search"
    }
];

export default Columns;