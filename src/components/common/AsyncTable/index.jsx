import React from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types';
import _ from 'lodash'
import asyncFetch from "../../../utils/asyncFetch";

class AsyncTable extends React.Component {

    constructor(props, context) {
        super(props);
        this.defaultPage = {
            pageSize: 10,
            total: 0,
            current: 1,
            showSizeChanger: true,
            showTotal: (total, range) =>  context.languagePak.pageInfo.replace('%s', range[0]).replace('%e', range[1]).replace('%t', total),
            onShowSizeChange: this.handleShowSizeChange,
            pageSizeOptions: ['5','10','20','50','100']
        };
        this.state = {
            data: [],
            pagination: props.pagination ? {...this.defaultPage} : {},
            sorter: props.defaultSort || {},
            loading: false,
	        error: false
	    }
    }

    componentWillReceiveProps(nextProps, context) {
        const pagination = _.clone(this.state.pagination);
        pagination.showTotal = (total, range) => context.languagePak.pageInfo.replace('%s', range[0]).replace('%e', range[1]).replace('%t', total);
        this.setState({pagination: pagination});
    }

    componentDidMount() {
        const initPaginationParam = this.props.pagination ? {
            limit: this.state.pagination.pageSize,
            start: (this.state.pagination.current - 1) * this.state.pagination.pageSize + 1,
            pageNum: this.state.pagination.current,
            ...this.state.sorter
        } : {...this.state.sorter};
        this.getData(initPaginationParam);
    }

    preGetData = () => {
        const paginationParam = this.props.pagination ? {
            limit: this.state.pagination.pageSize,
            start: (this.state.pagination.current - 1) * this.state.pagination.pageSize + 1,
            pageNum: this.state.pagination.current,
            ...this.state.sorter
        } : {...this.state.sorter};
        this.getData(paginationParam);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.fetchId !== this.props.fetchId) {
            if (!_.isEqual(prevProps.params, this.props.params)) {
                this.setState({
                    pagination: this.props.pagination ? {...this.defaultPage} : {},
                    sorter: this.props.defaultSort || {}
                }, this.preGetData)
            } else {
                this.preGetData()
            }
        }
    }

    handleShowSizeChange = (current, pageSize)=>{
        let pagination = {...this.state.pagination};
        pagination.cursor = current;
        pagination.pageSize = pageSize;
        this.setState({pagination: pagination})
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
            sorter: {
                sortColumn: sorter.field,
                sortDir: sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined
            }
        });
        const sortParam = {};
        if (sorter.field !== undefined) {
            sortParam.sortColumn = sorter.field;
            sortParam.sortDir = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined
        }
        if (this.props.pagination) {
            this.getData({
                limit: pagination.pageSize,
                start: (pagination.current - 1) * pagination.pageSize + 1,
                pageNum: pagination.current,
                ...sortParam,
                ...filters,
            });
        } else {
            this.getData({
                ...sortParam,
                ...filters,
            });
        }
    };

    getData = (paginationParams = {}) => {
        const {method, api, params, successCallBack, startFetching, fakeData} = this.props;
        let allParams = {...paginationParams, ...params};
        this.setState({ loading: true });
        if (startFetching) {
            startFetching()
        }
        if (fakeData) {
            setTimeout(() => {
                const pagination = {...this.state.pagination};
                pagination.total = 200;
                let data = _.cloneDeep(fakeData);
                if (this.props.preProcessor) {
                    data = this.props.preProcessor(data, 200)
                }
                this.setState({
                    loading: false,
                    data: data,
                    pagination,
                }, () => {
                    if (successCallBack) {
                        successCallBack({data: fakeData, fetchId: this.props.fetchId, pagination: pagination});
                    }
                });
            }, 1000)
        } else {
            asyncFetch(
                method || 'GET', api, allParams,
                (res) => {
                    if (res.code === 0) {
                        const pagination = {...this.state.pagination};
                        let data = [];
                        if (!Array.isArray(res.data)) {
                            pagination.total = res.data.count;
                            data = _.cloneDeep(res.data.list);
                        } else {
                            data = res.data
                        }
                        if (this.props.preProcessor) {
                            data = this.props.preProcessor(data, !Array.isArray(res.data) ? res.data.count : undefined, res.data)
                        }
                        this.setState({
                            loading: false,
                            error: false,
                            data: data,
                            pagination,
                        });
                        if (successCallBack) {
                            successCallBack({
                                data: !Array.isArray(res.data) ? res.data.list : res.data,
                                pagination: pagination
                            });
                        }
                    } else {
                        this.setState({
                            loading: false,
                            error: true
                        });
                    }
                }, {}, 'cors',
                (msg) => {
                    this.setState({
                        loading: false,
                        error: true
                    });
                }
            );
        }
    };

    handleRow = (record, index)=>{
        let className = "trOdd";
        if (index%2 === 0) {
            className = "trEven"
        }
        let customRet = {};
        if (this.props.onRow) {
            customRet = this.props.onRow(record, index);
        }
        return {
            className: this.props.intervalRow ? className : '',
            ...customRet
        };
    };

    generateSortColumn = (basicColumns) => {
        let columns = _.cloneDeep(basicColumns);
        const sorter = this.state.sorter;
        columns = columns.map((column) => {
            if (column.dataIndex === sorter.sortColumn && column.sorter === true) {
                return {
                    ...column,
                    sortOrder: sorter.sortDir === 'asc' ? 'ascend' : sorter.sortDir === 'desc' ? 'descend' : false
                }
            } else {
                return {
                    ...column,
                    sortOrder: false
                }
            }
        });
        return columns
    };

    render() {
        const language = this.context.languagePak;
        const {data, pagination, loading, error} = this.state;
        const columns = this.generateSortColumn(this.props.columns);
        return (
            <Table {...this.props}
                   columns={columns}
                   locale={{emptyText: error ? language.noticeTableError: language.noticeTableNoData}}
                   dataSource={data}
                   pagination={this.props.pagination ? pagination : false}
                   loading={loading}
                   onChange={this.handleTableChange}
                   onRow={(column,index)=>(this.handleRow(column, index))}
            />
        )
    }
}

AsyncTable.propTypes = {
    defaultSort: PropTypes.shape({
        sortDir: PropTypes.oneOf(['asc', 'desc']),
        sortColumn: PropTypes.string
    }), //是否按照某一列默认排序
    intervalRow: PropTypes.bool, //是否间隔显示行色
    preProcessor: PropTypes.func, //正确获取数据时对数据的预处理。 !!!!不允许做排序操作，删除列表项操作
    fetchId: PropTypes.number, //用来标识一次请求（在调用该组件的组件中维持状态，fetchId发生变化，内部会重新获取数据
    method: PropTypes.string,
    api: PropTypes.string.isRequired,
    params: PropTypes.object,
    successCallBack: PropTypes.func, //返回的参数为 {data: data, fetchId: fetchId, pagination: pagination}
    failCallBack: PropTypes.func, //返回的参数为 {msg: msg, fetchId: fetchId}
    startFetching: PropTypes.func,
    pagination: PropTypes.bool, //置为false时不显示分页信息，其他情况显示后台分页信息
    columns: PropTypes.array.isRequired,
    //其他Antd的table参数同文档描述正确生效
    fakeData: PropTypes.array //用于在API接口不可用时用来模拟异步请求返回的数据
};

AsyncTable.defaultProps = {
    intervalRow: true
};

AsyncTable.contextTypes = {
    languagePak: PropTypes.object
};

export default AsyncTable