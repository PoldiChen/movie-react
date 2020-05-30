import React from "react";
import {Table, Pagination, Popconfirm, message} from "antd";
import Columns from "../../../config/job_declare.config";
import asyncFetch from "../../../utils/asyncFetch";
import {API} from "../../../config/api.config";
import _ from "lodash";
import PropTypes from "prop-types";
// import SystemSettingEdit from "../SystemSettingEdit/index";

class JobDeclareList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            editVisible: false,
            editTitle: '',
            editRecord: {}
        };
    }

    componentDidMount() {
        this.getJobDeclare();
    }

    getJobDeclare() {
        let url = API.get_job_declare;
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let jobs = [];
                    let index = 1;
                    res.data.map(function (row) {
                        let parameter = '';
                        let parameterArray = row.parameter;
                        parameterArray.map(function (param) {
                            parameter += param["param_name"] + ", ";
                            return 0;
                        });
                        jobs.push({
                            key: index,
                            jobName: row.job_name,
                            jobParameters: parameter
                        });
                        index ++;
                        return 0;
                    });

                    this.setState({
                        dataSource: jobs
                    });
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    onEdit = (record) => {
        console.log("onEdit");
        console.log(record);
        this.setState({
            editVisible: true,
            editTitle: record.key,
            editRecord: record
        });
    };

    handleEditOk() {
        console.log("handleModalViewOnOk");
        this.setState({editVisible: false});
    }

    handleEditCancel() {
        console.log("handleModalViewOnCancel");
        this.setState({editVisible: false});
    }

    render() {
        const columns = _.clone(Columns);

        columns.push({
            title: 'Operate',
            key: 'action',
            width: '18%',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.onEdit(record)}>Create</a>
                </span>
            ),
        });

        return (
            <div>
                <Table
                    dataSource={this.state.dataSource}
                    columns={columns}
                    pagination={false}
                />
                {/*<SystemSettingEdit*/}
                    {/*visible={this.state.editVisible}*/}
                    {/*title={this.state.editTitle}*/}
                    {/*record={this.state.editRecord}*/}
                    {/*handleOnOk={() => this.handleEditOk()}*/}
                    {/*handleOnCancel={() => this.handleEditCancel()}*/}
                {/*/>*/}
            </div>
        );
    }
}

JobDeclareList.contextTypes = {
    token: PropTypes.string
};

export default JobDeclareList;