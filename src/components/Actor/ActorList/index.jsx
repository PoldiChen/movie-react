import React from "react";
import { Input, Table, Divider, Popconfirm, message, Button, Row, Col } from "antd";
import ActorModal from "../ActorModal/index";
import Columns from "../../../config/actor.config";
import IconLike from "../../common/IconLike/index";
import asyncFetch from "../../../utils/asyncFetch";
import { API } from "../../../config/api.config";
import _ from "lodash";
import PropTypes from "prop-types";

const { Search } = Input;

class ActorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            modalViewVisible: false,
            modalViewTitle: "",
            modalViewRecord: {}
        };
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.getActors("");
    }

    onView = (record) => {
        console.log("onView");
        console.log(record);
        this.setState({
            modalViewVisible: true,
            modalViewTitle: record.name,
            modalViewRecord: record
        });
    };

    handleModalViewOnOk() {
        console.log("handleModalViewOnOk");
        this.setState({modalViewVisible: false});
    }

    handleModalViewOnCancel() {
        console.log("handleModalViewOnCancel");
        this.setState({modalViewVisible: false});
    }

    getActors(name) {
        console.log('ActorList@getActors');
        let url = API.get_actors + "?name=" + name;
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let actors = [];
                    res.data.map(function(row) {
                        actors.push({
                            key: row.id,
                            name: row.name,
                            birth_date: row.birthDate,
                            nationality: row.nationality,
                            search: row.search
                        });
                        return 0;
                    });
                    this.setState({
                        dataSource: actors
                    });
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    deleteMarker(record) {
        let url = API.delete_marker.replace("%s", record.key);
        asyncFetch('DELETE', url, {},
            (res) => {
                if (res.code === 0) {
                    message.success('delete success.');
                    this.getActors();
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    handleOnSearch = (e) => {
        console.log("ActorList@handleOnSearch");
        console.log(e);
        this.getActors(e);
    };

    handleOnAdd = () => {
        console.log("ActorList@handleOnAdd");
        let record = {
            key: 0,
            birth_date: 0,
            nationality: '',
            search: 0
        };
        this.setState({
            modalViewVisible: true,
            modalViewTitle: 'Create New Actor',
            modalViewRecord: record
        });
    };

    render() {

        const columns = _.clone(Columns);
        columns.push({
            title: 'Operate',
            key: 'action',
            width: '18%',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.onView(record)}>View</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.onEdit(record)}>Edit</a>
                    <Divider type="vertical" />

                    <Popconfirm
                        title="sure to delete?"
                        onConfirm={() => this.deleteMarker(record)}
                        okText="Yes"
                        cancelText="No">
                        <a>Delete</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <IconLike />
                </span>
            ),
        });

        return (
            <div>

                <Row>
                    <Col span="23">
                        <Search
                            placeholder="input search text"
                            enterButton="Search"
                            style={{marginBottom: 15}}
                            onSearch={this.handleOnSearch}
                        />
                    </Col>
                    <Col span="1">
                        <Button onClick={this.handleOnAdd} type="primary" style={{marginLeft: "5px"}}>Add</Button>
                    </Col>
                </Row>

                <Table
                    dataSource={this.state.dataSource}
                    columns={columns}
                />
                <ActorModal
                    visible={this.state.modalViewVisible}
                    title={this.state.modalViewTitle}
                    record={this.state.modalViewRecord}
                    handleOnOk={() => this.handleModalViewOnOk()}
                    handleOnCancel={() => this.handleModalViewOnCancel()}
                >

                </ActorModal>
            </div>
        );
    }

}

ActorList.contextTypes = {
    token: PropTypes.string
};

export default ActorList;