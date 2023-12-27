import {ColumnsType} from "antd/es/table";
import {Buucuc} from "@/core/models/buucuc.ts";
import {Button, Form, Input, Modal, Table} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useMutation, useQuery} from "react-query";
import BuucucService from "@/core/services/buucuc.service.ts";
import {Dispatch, memo, SetStateAction, useEffect, useState} from "react";


export interface BuuCucUpdateProps {
    data: Buucuc,
    dispatch: Dispatch<SetStateAction<Buucuc | null>>,
    refetch: any
}

const BuuCucUpdate = memo(({data, dispatch, refetch}:BuuCucUpdateProps) => {

    const [form] = Form.useForm()
    useEffect(() => {
        !!form && form.setFieldsValue(data)
    }, []);
    const changeMutate = useMutation({
        mutationKey: "update",
        mutationFn: BuucucService.update
    })
    return <>
        <Modal
            onCancel={() => dispatch(null)}
            onOk={() => {
                changeMutate.mutate({...form.getFieldsValue(), id: data?.id}, {
                    onSuccess: () => {
                        dispatch(null)
                        refetch()
                    }
                })
            }}
            open={true} okButtonProps={{className: "bg-blue-400"}} >
                <span className={"font-bold text-center mx-auto flex justify-center items-center"}>
                    Chỉnh sửa bưu cục
                </span>
            <Form
                className={"p-10"}
                form={form}
            >
                <Form.Item
                    name={"ten"}
                >
                    <Input placeholder={"Tên bưu cục"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"diachi"}
                >
                    <Input placeholder={"Địa chỉ bưu cục"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"lat"}
                >
                    <Input placeholder={"Kinh độ"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"log"}
                >
                    <Input placeholder={"Vĩ độ"} size={"large"} />
                </Form.Item>
            </Form>
        </Modal>
    </>
})

const BuuCuc = () => {
    const columns: ColumnsType<Buucuc> = [
        {
            title: "Mã bưu cục",
            dataIndex: "id"
        },
        {
            title: "Tên bưu cục",
            dataIndex: "ten"
        },
        {
            title: "Địa chỉ bưu cục",
            dataIndex: "diachi"
        },
        {
            title: "Kinh độ",
            dataIndex: "lat"
        },
        {
            title: "Vĩ độ",
            dataIndex: "log"
        },
        {
            title: "Hành động",
            render: (value) => {
                return <Button onClick={() => {
                    setOpenEdit(data?.data!.filter(e => e.id === value.id)[0]!)
                    form.setFieldsValue(openEdit)
                }} icon={<EditOutlined />} />
            }
        },
    ]
    const [form] = Form.useForm()
    const {data, refetch, isLoading} = useQuery({
        queryKey: "buucuc",
        queryFn: () => BuucucService.list()
    })
    const createMutate = useMutation({
        mutationKey: "create",
        mutationFn: BuucucService.create
    })

    const [openEdit, setOpenEdit] = useState<Buucuc | null>(null)

    const [open, setOpen] = useState(false)
    return <div className={"w-full px-20"}>
        <div className={"flex flex-row justify-end items-center  w-full"}>
            <Button onClick={() => setOpen(true)} className={"bg-red-500 text-white mx-10 my-10"} >Tạo mới bưu cục</Button>

        </div>
        <Table className={"px-10"} loading={isLoading} dataSource={data?.data} rowKey={"id"} columns={columns}/>

        {!!openEdit && <BuuCucUpdate data={openEdit} dispatch={setOpenEdit} refetch={refetch} />}


        <Modal

            onOk={() => {
                createMutate.mutate({
                    ...form.getFieldsValue(),
                    id: 0
                }, {
                    onSuccess: () => {
                        form.resetFields()
                        setOpen(false)
                        refetch()
                    }
                })
            }}
            open={open} onCancel={() => setOpen(false)} okButtonProps={{className: "bg-blue-400"}} >
                <span className={"font-bold text-center mx-auto flex justify-center items-center"}>
                    Tạo mới bưu cục
                </span>
            <Form
                form={form}
                className={"p-10"}
            >
                <Form.Item
                    name={"ten"}
                >
                    <Input placeholder={"Tên bưu cục"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"diachi"}
                >
                    <Input placeholder={"Địa chỉ bưu cục"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"lat"}
                >
                    <Input placeholder={"Kinh độ"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"log"}
                >
                    <Input placeholder={"Vĩ độ"} size={"large"} />
                </Form.Item>
            </Form>
        </Modal>


    </div>
}

export default BuuCuc