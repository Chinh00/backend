import {memo, useEffect, useState} from "react";
import {Form, Image, Input} from "antd";
import {useAppSelector} from "@/redux/hook.ts";
import {Buuta} from "@/core/models/buuta.ts";


const Home = memo(() => {
    const profile = useAppSelector(e => e.profile)
    const [form] = Form.useForm<Buuta>()
        useEffect(() => {
            form.setFieldValue("ten", profile?.ten)
            form.setFieldValue("taitrongtoida", profile?.taitrongtoida)
            form.setFieldValue("buucucid", profile?.buucucid)
        }, []);
        console.log(profile)
    return <div className={"min-h-screen flex flex-col justify-start items-center"}>
        <span className={"text-center flex justify-center items-center py-10"}>Thông tin tài khoản</span>
        <Image width={200} height={200} className={"rounded-full"} src={"https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"} />
        <Form
            form={form}
            disabled
            className={"mt-10"}
            defaultValue={profile}
        >
            <Form.Item<Buuta>
                name={"ten"}
                label={"Họ và tên"}
            >
                <Input size={"large"}/>
            </Form.Item>
            <Form.Item<Buuta>
                name={"taitrongtoida"}
                label={"Tải trọng tối đa"}
            >
                <Input size={"large"}/>
            </Form.Item>
            <Form.Item<Buuta>
                name={"buucucid"}
                label={"Mã bưu cục làm việc"}
            >
                <Input size={"large"}/>
            </Form.Item>
        </Form>
    </div>
}
)
export default Home