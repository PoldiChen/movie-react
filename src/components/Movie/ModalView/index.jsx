import React from "react";
import { Modal, Form, Select, message, Col } from "antd";
import { API } from "../../../config/api.config";
import asyncFetch from "../../../utils/asyncFetch";

const { Option } = Select;

class ModalView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            title: props.title,
            record: props.record,
            actorOptions: [],
            actorSelected: 0
        };
    }

    componentDidMount() {
        console.log("ModalView@componentDidMount");
        this.getActors();
    }

    componentWillReceiveProps(props) {
        console.log("ModalView@componentWillReceiveProps");
        console.log(props);
        this.setState({
            visible: props.visible,
            title: props.title,
            record: props.record
        });
        this.getActors();
    }

    handleOk = (e) => {
        console.log("ModalView@handleOk");
        console.log(this.state.actorSelected);
        this.updateMovieActor();
        this.setState({visible: false});
        this.props.handleOnOk();
    };

    handleCancel = (e) => {
        this.setState({visible: false});
        this.props.handleOnCancel();
    };

    onChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({actorSelected: value});
    };

    onBlur() {
        console.log('blur');
    }

    onFocus() {
        console.log('focus');
    }

    onSearch(val) {
        console.log('search:', val);
    }

    updateMovieActor() {
        console.log('ModalView@updateMovieActor');
        console.log(this.state.actorSelected);
        let url = "/movie/" + this.state.record.key + "/actor";
        asyncFetch('PUT', url, {actor_id: this.state.actorSelected},
            (res) => {
                if (res.code === 0) {
                    message.success("update success");
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    getActors() {
        console.log('ModalView@getActors');
        let url = API.get_actors;
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let actorOptions = [];
                    res.data.map(function(row) {
                        actorOptions.push({
                            key: row.id,
                            display: row.name
                        });
                        return 0;
                    });
                    this.setState({
                        actorOptions: actorOptions
                    });
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        console.log("ModalView@render");
        console.log(this.state.actorOptions);

        return (
            <Modal
                visible={this.state.visible}
                title={this.state.record.name}
                okText={"OK"}
                cancelText={"Cancel"}
                width={"600px"}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
            >

                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                    <Form.Item label="ID">
                        {this.state.record.key}
                    </Form.Item>
                    <Form.Item label="Name">
                        {this.state.record.name}
                    </Form.Item>
                    <Form.Item label="Actors">
                        {this.state.record.actors}
                    </Form.Item>
                    <Form.Item label="Publish Date">
                        {this.state.record.publish_date}
                    </Form.Item>
                    <Form.Item label="Update Actors">
                        <Select
                            mode="multiple"
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onSearch={this.onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.actorOptions.map((item) => {
                                return (<Option value={item.key}>{item.display}</Option>);

                            })}
                        </Select>
                    </Form.Item>
                </Form>

            </Modal>
        );
    }

}

export default Form.create()(ModalView);