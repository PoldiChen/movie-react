import React from "react";
import { Card, Row, Col } from 'antd';
import ActorList from "../components/Actor/ActorList/index";

const { Meta } = Card;

class PageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(

            <div>
                <Row gutter={8}>
                    <Col span={3}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="http://114.67.87.197/favicon.ico" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col><Col span={3}>
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col><Col span={3}>
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col><Col span={3}>
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col><Col span={3}>
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col><Col span={3}>
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col><Col span={3}>
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Col>
                </Row>
            </div>



        );
    }
}

export default PageCard;