import React from "react";
import { Card, Row, Col, message, Pagination } from 'antd';
import asyncFetch from "../utils/asyncFetch";
import { API } from "../config/api.config";

const { Meta } = Card;

class PageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 40
            }
        };
    }

    componentDidMount() {
        this.getMovies("");
    }

    getMovies(name) {
        // console.log('ActorList@getActors');
        let pageSize = this.state.pagination.pageSize;
        let pageNum = this.state.pagination.current;
        let url = API.get_movies + "?pageSize=" + pageSize + "&pageNum=" + pageNum + "&name=" + name;
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let movies = [];
                    res.data.list.map(function(row) {
                        movies.push({
                            key: row.id,
                            name: row.name,
                            code: row.code,
                            title: row.title,
                            publish_date: row.publishDate,
                            covers: row.covers
                        });
                        return 0;
                    });
                    let pagination = this.state.pagination;
                    pagination.total = res.data.total;
                    this.setState({
                        movies: movies,
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
        this.getMovies("");
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    };

    render() {

        let lines = [];
        let groupSize = 8;
        let group = [];
        this.state.movies.map((movie) => {
            // console.log(actor);
            if (group.length < groupSize) {
                group.push(movie);
            } else {
                lines.push(group);
                group = [];
                group.push(movie);
            }
        });

        // console.log("lines size:" + lines.length);
        // console.log()



        return (

            <div>

                {
                    lines.map((line) => {

                        return (
                            <Row gutter={60} style={{marginBottom: "20px"}}>
                                {
                                    line.map((movie) => {
                                        let imgSrc = "http://localhost/ANZD-001_cover_0.jpg";
                                        if (movie.covers && movie.covers.length > 0) {
                                            const cover = movie.covers[0];
                                            // 优先用本地 8080 端口静态文件服务（下载到本地的图片）
                                            // 降级用 url 字段（原始图源 URL，如豆瓣）
                                            imgSrc = (cover.path && cover.fileName)
                                                ? ("http://localhost:8080/pictures/" + cover.fileName)
                                                : (cover.url || imgSrc);
                                        }
                                        // let
                                        return (
                                            <Col span={3}>
                                                <Card
                                                    hoverable
                                                    cover={<img alt="example" src={imgSrc} style={{width: "100%", height: "100%"}} />}
                                                >
                                                    <Meta title={movie.title} description={movie.name}/>
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

export default PageCard;