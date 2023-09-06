import { useState} from "react";
import {Button, Drawer, Form, Input, Space} from "antd";

export default function DrowerForm(props:any) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<{ [key: string]: any }>([]);
    const {buttonType="primary"}=props;

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    return(
        <>
            <Button type={buttonType} onClick={showDrawer} shape="round">
                {props.children}
            </Button>
            <Drawer
                title={props.title}
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={()=>{props.submitCall(data);}} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    onChange={handleChange}
                    layout="vertical"
                >

                    {
                        props.champs.map((champ:any)=>{
                            return(
                                <>
                                    <Form.Item
                                        label={champ.label}
                                        name={champ.input}

                                        rules={[
                                            {
                                                required: true,
                                                message: `Please input your ${champ.input}`,
                                            },
                                        ]}
                                    >
                                        {champ.type === "password" ?
                                            <Input.Password name={champ.input} />: <Input name={champ.input} />
                                        }


                                    </Form.Item>
                                </>
                            );

                        })
                    }
                </Form>

            </Drawer>
        </>
    );
}