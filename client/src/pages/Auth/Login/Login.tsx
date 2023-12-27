import {memo} from "react";
import {Button, Form, Input, message} from "antd";
import {LoginFormValues} from "@/core/models/buuta.ts";
import {useMutation} from "react-query";
import BuutaService from "@/core/services/buuta.service.ts";
import {isAxiosError} from "axios";
import {setIsLogin, setProfile, setRole} from "@/redux/root.slice.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/redux/hook.ts";

const Login = memo(() => {
    const [form] = Form.useForm<LoginFormValues>()
    const loginMutate = useMutation({
        mutationKey: "login",
        mutationFn: BuutaService.login
    })
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    return <div className={"text-black mx-auto py-10"}>
        <Form
            form={form}
            onFinish={(values) => {
                loginMutate.mutate(values, {
                    onSuccess: e => {
                        dispatch(setProfile(e?.data))
                        dispatch(setIsLogin(true))
                        dispatch(setRole(e?.data.role))
                        nav("/home")
                    },
                    onError: (err) => {
                        isAxiosError(err) && message.error("Tài khoản hoặc mật khẩu không chính xác")
                    }
                })
            }}
            className={"w-[400px] mx-auto border-2 p-3 rounded-md bg-white shadow-2xl"}
        >
            <span className={"text-2xl mx-auto text-center flex justify-center items-center py-5"}>Login</span>
            <Form.Item<LoginFormValues>
                name={"sdt"}
                rules={[{required: true}]}
            >
                <Input size={"large"} placeholder={"Số điện thoại"} />
            </Form.Item>
            <Form.Item<LoginFormValues>
                name={"password"}
                rules={[{required: true}]}
            >
                <Input.Password size={"large"} placeholder={"Mật khẩu"} />
            </Form.Item>
            <Button loading={loginMutate.isLoading} className={"bg-red-500 text-white w-full"} htmlType={"submit"}>Đăng nhập</Button>
        </Form>
    </div>
})

export default Login