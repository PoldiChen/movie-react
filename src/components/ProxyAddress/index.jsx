import React from "react";
import {Table, Pagination, message} from "antd";
import Columns from "../../config/proxy_address.config";
import asyncFetch from "../../utils/asyncFetch";
import {API} from "../../config/api.config";
import _ from "lodash";
import PropTypes from "prop-types";

class ProxyAddressList extends React.Component {

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
        this.getProxyAddress();
    }

    handlePageChange = (e) => {
        let pagination = this.state.pagination;
        pagination.current = e;
        this.setState({
            pagination: pagination
        });
        this.getSystemLogs();
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    };


    getProxyAddress() {
        let pageSize = this.state.pagination.pageSize;
        let pageNum = this.state.pagination.current;
        let url = API.get_proxy_address + "?pageSize=" + pageSize + "&pageNum=" + pageNum + "&type=";
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let proxyAddresses = [];
                    res.data.map(function (row) {
                        proxyAddresses.push({
                            key: row.id,
                            country: row.country,
                            locate: row.locate,
                            protocol: row.protocol,
                            address: row.address,
                            port: row.port,
                            speed: row.speed,
                            connect_time: row.connectTime,
                            available_time: row.availableTime,
                            verify_time: row.verifyTime,
                            available: row.available,
                            create_at: row.createAt
                        });
                        return 0;
                    });

                    let pagination = this.state.pagination;
                    // pagination.total = res.data.total;
                    pagination.total = res.data.size;
                    this.setState({
                        dataSource: proxyAddresses,
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

ProxyAddressList.contextTypes = {
    token: PropTypes.string
};

export default ProxyAddressList;