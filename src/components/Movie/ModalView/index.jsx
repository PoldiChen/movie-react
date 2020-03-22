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
            celebrityOptions: [],
            celebritySelected: 0
        };
    }

    componentDidMount() {
        console.log("ModalView@componentDidMount");
        this.getCelebrities();
    }

    componentWillReceiveProps(props) {
        console.log("ModalView@componentWillReceiveProps");
        console.log(props);
        this.setState({
            visible: props.visible,
            title: props.title,
            record: props.record
        });
        this.getCelebrities();
    }

    handleOk = (e) => {
        console.log("ModalView@handleOk");
        console.log(this.state.celebritySelected);
        this.updateMovieCelebrity();
        this.setState({visible: false});
        this.props.handleOnOk();
    };

    handleCancel = (e) => {
        this.setState({visible: false});
        this.props.handleOnCancel();
    };

    onChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({celebritySelected: value});
    };

    updateMovieCelebrity() {
        console.log('ModalView@updateMovieCelebrity');
        console.log(this.state.celebritySelected);
        let url = "/movie/" + this.state.record.key + "/celebrity";
        asyncFetch('PUT', url, {celebrity_id: this.state.celebritySelected},
            (res) => {
                if (res.code === 0) {
                    message.success("update success");
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    getCelebrities() {
        console.log('ModalView@getCelebrities');
        let url = API.get_celebrities;
        asyncFetch('GET', url, {},
            (res) => {
                if (res.code === 0) {
                    let celebrityOptions = [];
                    res.data.map(function(row) {
                        celebrityOptions.push({
                            key: row.id,
                            display: row.name
                        });
                        return 0;
                    });
                    this.setState({
                        celebrityOptions: celebrityOptions
                    });
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        console.log("ModalView@render");
        console.log(this.state.celebrityOptions);

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
                    <Form.Item label="Celebrities">
                        {this.state.record.celebrities}
                    </Form.Item>
                    <Form.Item label="Publish Date">
                        {this.state.record.publish_date}
                    </Form.Item>
                    <Form.Item label="Update Celebrities">
                        <Select
                            mode="multiple"
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.state.celebrityOptions.map((item) => {
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