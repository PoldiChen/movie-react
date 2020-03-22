import React from "react";
import { Input, Table, Divider, Popconfirm, message } from "antd";
import ModalView from "../ModalView/index";
import Columns from "../../../config/movie.config";
import IconLike from "../../common/IconLike/index";
import asyncFetch from "../../../utils/asyncFetch";
import { API } from "../../../config/api.config";
import _ from "lodash";
import PropTypes from "prop-types";
import AsyncTable from "../../common/AsyncTable";

const { Search } = Input;

class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            modalViewVisible: false,
            modalViewTitle: "",
            modalViewRecord: {},
            pagination: {
                pageSize: 10,
                total: 0,
                current: 1,
                showSizeChanger: true,
                showTotal: (total, range) =>  '当前显示%t条数据中的第%s-%e条'.replace('%s', range[0]).replace('%e', range[1]).replace('%t', total),
                onShowSizeChange: this.handleShowSizeChange,
                pageSizeOptions: ['5','10','20','50','100']
            }
        };
        this.defaultPage = {
            pageSize: 10,
            total: 0,
            current: 1,
            showSizeChanger: true,
            showTotal: (total, range) =>  '当前显示%t条数据中的第%s-%e条'.replace('%s', range[0]).replace('%e', range[1]).replace('%t', total),
            onShowSizeChange: this.handleShowSizeChange,
            pageSizeOptions: ['5','10','20','50','100']
        };
    }

    handleShowSizeChange = (current, pageSize)=>{
        let pagination = {...this.state.pagination};
        pagination.cursor = current;
        pagination.pageSize = pageSize;
        this.setState({pagination: pagination})
    };

    componentDidMount() {
        console.log("componentDidMount");
        this.getMovies("");
    }

    onView = (record) => {
        console.log("onView");
        console.log(record);
        this.setState({
            modalViewVisible: true,
            modalViewTitle: record.title,
            modalViewRecord: record
        });
    };

    handleModalViewOnOk() {
        console.log("handleModalViewOnOk");
        this.setState({modalViewVisible: false});
        this.getMovies("");
    }

    handleModalViewOnCancel() {
        console.log("handleModalViewOnCancel");
        this.setState({modalViewVisible: false});
    }

    getMovies(name) {
        console.log('MovieList@getMovies');
        console.log(this.state.pagination);
        let pageSize = this.state.pagination.pageSize;
        let pageNum = this.state.pagination.current;
        let url = API.get_movies + "?pageSize="+pageSize+"&pageNum="+pageNum+"&name=" + name;
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let total = res.data.total;
                    console.log("total:" + total);
                    let pagination = this.state.pagination;
                    pagination.total = total;
                    this.setState({pagination: pagination});
                    let movies = [];
                    res.data.list.map(function(row) {
                        let celebrityNames = [];
                        row.actors.map(function(actor) {
                            celebrityNames.push(actor.name);
                            return 0;
                        });
                        movies.push({
                            key: row.id,
                            name: row.name,
                            publish_date: row.publishDate,
                            length: row.length,
                            code: row.code,
                            celebrities: celebrityNames.join('、')
                        });
                        return 0;
                    });
                    this.setState({
                        dataSource: movies
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
                    this.getMarkers();
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    handleOnSearch = (e) => {
        console.log("MovieList@handleOnSearch");
        console.log(e);
        this.getMovies(e);
    };

    handleOnTableChange = (e) =>{
        console.log("MovieList@handleOnTableChange");
        console.log(e);
        let pagination = this.state.pagination;
        pagination.current = e.current;
        this.setState({
            pagination: pagination
        });
        this.getMovies("");
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

                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    style={{marginBottom: 15}}
                    onSearch={this.handleOnSearch}
                />
                <Table
                    dataSource={this.state.dataSource}
                    columns={columns}
                    pagination={this.state.pagination}
                    onChange={this.handleOnTableChange}
                />
                {/*<ModalView*/}
                    {/*visible={this.state.modalViewVisible}*/}
                    {/*title={this.state.modalViewTitle}*/}
                    {/*record={this.state.modalViewRecord}*/}
                    {/*handleOnOk={() => this.handleModalViewOnOk()}*/}
                    {/*handleOnCancel={() => this.handleModalViewOnCancel()}*/}
                {/*/>*/}
            </div>
        );
    }

}

MovieList.contextTypes = {
    token: PropTypes.string
};

export default MovieList;