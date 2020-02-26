import React from "react";
import { Modal, Form, Input, DatePicker, Switch, message } from "antd";
import moment from 'moment';
import { API } from "../../../config/api.config";
import asyncFetch from "../../../utils/asyncFetch";

class ActorModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            title: props.title,
            record: props.record,
            // updateValues: {}
        };
    }

    componentWillReceiveProps(props) {
        console.log("ModalView@componentWillReceiveProps");
        console.log(props);
        this.setState({
            visible: props.visible,
            title: props.title,
            record: props.record
        });
    }

    handleOk = (e) => {
        this.updateActor();
        this.setState({visible: false});
        this.props.handleOnOk();
    };

    handleCancel = (e) => {
        this.setState({visible: false});
        this.props.handleOnCancel();
    };

    updateActor() {
        console.log('ActorModal@updateActor');
        console.log(this.state.record);
        // console.log(this.state.actorSelected);
        let url = API.update_actor + "/" + this.state.record.key;
        asyncFetch('PUT', url, this.state.record,
            (res) => {
                if (res.code === 0) {
                    message.success("update success");
                } else {
                    message.error(res.message);
                }
            }, {}, 'cors');
    }

    handleOnChange = (key, e) => {
        console.log("handleOnChange");
        console.log(key);
        // console.log(e);
        let record = this.state.record;
        if (key === "birth_date") {
            console.log(e.format('YYYY-MM-DD'));
            record["birth_date"] = e.format('YYYY-MM-DD');
        } else if (key === "search") {
            console.log(e);
            record["search"] = e? 1: 0;
        } else {
            console.log(e.target.value);
            record[key] = e.target.value;
        }
        this.setState({
            record: record
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const inputOnchange = this.handleOnChange;
        const dateFormat = 'YYYY/MM/DD';
        console.log("ActorModal@render");
        console.log(this.state.record);
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
                        <Input value={this.state.record.name} onChange={inputOnchange.bind(this, "name")} />
                    </Form.Item>
                    <Form.Item label="Birth Date">
                        {/*{this.state.record.birth_date}*/}
                        <DatePicker value={moment(this.state.record.birth_date, dateFormat)} onChange={inputOnchange.bind(this, "birth_date")} />
                    </Form.Item>
                    <Form.Item label="Nationality">
                        <Input value={this.state.record.nationality} onChange={inputOnchange.bind(this, "nationality")} />
                    </Form.Item>
                    <Form.Item label="Search">
                        <Switch checked={this.state.record.search === 1} onChange={inputOnchange.bind(this, "search")} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}

export default Form.create()(ActorModal);