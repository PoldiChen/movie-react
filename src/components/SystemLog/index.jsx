import React from "react";
import {Table, Pagination, Popconfirm, message} from "antd";

import Columns from "../../config/system_log.config";

import asyncFetch from "../../utils/asyncFetch";
import {API} from "../../config/api.config";
import _ from "lodash";
import PropTypes from "prop-types";

class SystemLogList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 20
            }
        };
    }

    componentDidMount() {
        this.getSystemLogs();
    }

    handlePageChange = (e) => {
        // console.log("handlePageChange");
        // console.log(e);
        let pagination = this.state.pagination;
        pagination.current = e;
        this.setState({
            pagination: pagination
        });
        this.getSystemLogs();
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    };


    getSystemLogs() {
        let pageSize = this.state.pagination.pageSize;
        let pageNum = this.state.pagination.current;
        let url = API.get_system_log + "?pageSize=" + pageSize + "&pageNum=" + pageNum + "&type=";
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let logs = [];
                    res.data.list.map(function (row) {

                        logs.push({
                            key: row.id,
                            log_id: row.logId,
                            level: row.level,
                            type: row.type,
                            detail: row.detail,
                            create_at: row.createAt
                        });
                        return 0;
                    });

                    let pagination = this.state.pagination;
                    pagination.total = res.data.total;
                    this.setState({
                        dataSource: logs,
                        pagination: pagination
                    });

                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }


    render() {

        const columns = _.clone(Columns);

        return (
            <div>
                <Table
                    dataSource={this.state.dataSource}
                    columns={columns}
                    pagination={false}
                />
                <Pagination style={{marginTop: "10px", textAlign: "right"}} {...this.state.pagination} onChange={this.handlePageChange}/>
            </div>
        );
    }

}

SystemLogList.contextTypes = {
    token: PropTypes.string
};

export default SystemLogList;