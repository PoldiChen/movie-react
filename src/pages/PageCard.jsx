import React from "react";
import { Card, Row, Col, message } from 'antd';
import ActorList from "../components/Actor/ActorList/index";
import asyncFetch from "../utils/asyncFetch";
import { API } from "../config/api.config";

const { Meta } = Card;

class PageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actors: []
        };
    }

    componentDidMount() {
        this.getActors("");
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
                            search: row.search,
                            covers: row.covers
                        });
                        return 0;
                    });
                    this.setState({
                        actors: actors
                    });
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    render() {

        let lines = [];
        let groupSize = 8;
        let group = [];
        this.state.actors.map((actor) => {
            console.log(actor);
            if (group.length < groupSize) {
                group.push(actor);
            } else {
                lines.push(group);
                group = [];
                group.push(actor);
            }
        });

        console.log("lines size:" + lines.length);
        // console.log()



        return (

            <div>

                {
                    lines.map((line) => {

                        return (
                            <Row gutter={16} style={{marginBottom: "20px"}}>
                                {
                                    line.map((actor) => {
                                        let imgSrc = "http://114.67.87.197/study.jpg";
                                        if (actor.covers.length > 0) {
                                            imgSrc = "http://114.67.87.197" + actor['covers'][0]['path'] + actor['covers'][0]['fileName'];
                                        }
                                        // let
                                        return (
                                            <Col span={3}>
                                                <Card
                                                    hoverable
                                                    cover={<img alt="example" src={imgSrc} />}
                                                >
                                                    <Meta title={actor.name} description={actor.name}/>
                                                </Card>
                                            </Col>
                                        );
                                    })

                                }
                            </Row>
                        );

                    })
                }



            </div>



        );
    }
}

export default PageCard;