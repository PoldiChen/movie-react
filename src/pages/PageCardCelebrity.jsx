import React from "react";
import { Card, Row, Col, message, Pagination } from 'antd';
import asyncFetch from "../utils/asyncFetch";
import { API } from "../config/api.config";

const { Meta } = Card;

class PageCardCelebrity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            celebrities: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 40
            }
        };
    }

    componentDidMount() {
        this.getCelebrities("");
    }

    getCelebrities(name) {
        // console.log('ActorList@getActors');
        let pageSize = this.state.pagination.pageSize;
        let pageNum = this.state.pagination.current;
        let url = API.get_celebrities + "?pageSize=" + pageSize + "&pageNum=" + pageNum + "&name=" + name;
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let celebrities = [];
                    res.data.list.map(function(row) {
                        celebrities.push({
                            key: row.id,
                            name: row.name,
                            english_name: row.englishName,
                            covers: row.covers
                        });
                        return 0;
                    });
                    let pagination = this.state.pagination;
                    pagination.total = res.data.total;
                    this.setState({
                        celebrities: celebrities,
                        pagination: pagination
                    });
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    handlePageChange = (e) => {
        // console.log("handlePageChange");
        // console.log(e);
        let pagination = this.state.pagination;
        pagination.current = e;
        this.setState({
            pagination: pagination
        });
        this.getCelebrities("");
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    };

    render() {

        let lines = [];
        let groupSize = 8;
        let group = [];
        this.state.celebrities.map((celebrity) => {
            // console.log(actor);
            if (group.length < groupSize) {
                group.push(celebrity);
            } else {
                lines.push(group);
                group = [];
                group.push(celebrity);
            }
        });

        console.log("lines size:" + lines.length);
        // console.log()



        return (

            <div>

                {
                    lines.map((line) => {

                        return (
                            <Row gutter={60} style={{marginBottom: "20px"}}>
                                {
                                    line.map((celebrity) => {
                                        let imgSrc = "http://localhost/ANZD-001_cover_0.jpg";
                                        if (celebrity.covers.length > 0) {
                                            imgSrc = "http://localhost" + celebrity['covers'][0]['path'] + celebrity['covers'][0]['fileName'];
                                        }
                                        // let
                                        return (
                                            <Col span={3}>
                                                <Card
                                                    hoverable
                                                    cover={<img alt="example" src={imgSrc} />}
                                                >
                                                    <Meta title={celebrity.name + " " + celebrity.english_name} />
                                                </Card>
                                            </Col>
                                        );
                                    })

                                }
                            </Row>
                        );

                    })
                }

                <Pagination style={{textAlign: "right"}} {...this.state.pagination} onChange={this.handlePageChange}/>

            </div>



        );
    }
}

export default PageCardCelebrity;