import React from "react";
import { Modal, Form, Input, message } from "antd";
import {API} from "../../../config/api.config";
import asyncFetch from "../../../utils/asyncFetch";

class SystemSettingEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            title: props.title,
            record: props.record
        };
    }

    componentWillReceiveProps(props) {
        console.log("SystemSettingEdit@componentWillReceiveProps");
        console.log(props);
        this.setState({
            visible: props.visible,
            title: props.title,
            record: props.record
        });
    }

    handleOk = (e) => {
        this.createOrUpdateSetting();
        this.setState({visible: false});
        this.props.handleOnOk();
    };

    handleCancel = (e) => {
        this.setState({visible: false});
        this.props.handleOnCancel();
    };

    handleOnChange = (key, e) => {
        console.log("handleOnChange");
        console.log(key);
        // console.log(e);
        let record = this.state.record;
        record[key] = e.target.value;
        this.setState({
            record: record
        });
    };

    createOrUpdateSetting() {
        console.log('CelebrityModal@updateCelebrity');
        console.log(this.state.record);
        let url = API.create_system_setting;
        let method = "POST";
        if (this.state.record.key !== 0) {
            url += "/" + this.state.record.key;
            method = "PUT"
        }
        asyncFetch(method, url, this.state.record,
            (res) => {
                if (res.code === 0) {
                    message.success("create or update success");
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const inputOnchange = this.handleOnChange;
        return (
            <Modal
                visible={this.state.visible}
                title={"Edit Setting: " + this.state.title}
                okText={"OK"}
                cancelText={"Cancel"}
                width={"600px"}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
            >

                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                    <Form.Item label="Key">
                        {this.state.record.key}
                    </Form.Item>
                    <Form.Item label="Setting Key">
                        <Input value={this.state.record.settingKey}
                               onChange={inputOnchange.bind(this, "settingKey")}/>
                    </Form.Item>
                    <Form.Item label="Setting Value">
                        <Input value={this.state.record.settingValue}
                               onChange={inputOnchange.bind(this, "settingValue")}/>
                    </Form.Item>
                    <Form.Item label="Comment">
                        <Input value={this.state.record.comment}
                               onChange={inputOnchange.bind(this, "comment")}/>
                    </Form.Item>

                </Form>
            </Modal>
        );
    }

}

export default Form.create()(SystemSettingEdit);