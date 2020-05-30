import React from "react";
import {Table, Pagination, Popconfirm, message} from "antd";
import Columns from "../../../config/system_setting.config";
import asyncFetch from "../../../utils/asyncFetch";
import {API} from "../../../config/api.config";
import _ from "lodash";
import PropTypes from "prop-types";
import SystemSettingEdit from "../SystemSettingEdit/index";

class SystemSettingList extends React.Component {

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
        this.getSystemSetting();
    }

    getSystemSetting() {
        let url = API.get_system_setting;
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let settings = [];
                    res.data.map(function (row) {
                        settings.push({
                            key: row.id,
                            settingKey: row.settingKey,
                            settingValue: row.settingValue,
                            comment: row.comment,
                            updateAt: row.updateAt,
                            createAt: row.createAt
                        });
                        return 0;
                    });

                    this.setState({
                        dataSource: settings
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
                    <a onClick={() => this.onEdit(record)}>Edit</a>
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
                <SystemSettingEdit
                    visible={this.state.editVisible}
                    title={this.state.editTitle}
                    record={this.state.editRecord}
                    handleOnOk={() => this.handleEditOk()}
                    handleOnCancel={() => this.handleEditCancel()}
                />
            </div>
        );
    }
}

SystemSettingList.contextTypes = {
    token: PropTypes.string
};

export default SystemSettingList;