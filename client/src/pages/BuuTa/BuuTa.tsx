import {ColumnsType} from "antd/es/table";
import {Button, Form, Input, Modal, Select, Table} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useMutation, useQuery} from "react-query";
import {Dispatch, memo, SetStateAction, useEffect, useState} from "react";
import {Buuta} from "@/core/models/buuta.ts";
import BuutaService from "@/core/services/buuta.service.ts";
import BuucucService from "@/core/services/buucuc.service.ts";


export interface BuuTaUpdateProps {
    data: Buuta,
    dispatch: Dispatch<SetStateAction<Buuta | null>>,
    refetch: any
}

const BuuTaUpdate = memo(({data, dispatch, refetch}:BuuTaUpdateProps) => {
    const {data: buucucs} = useQuery({
        queryKey: "buucuc",
        queryFn: () => BuucucService.list()
    })
    const [form] = Form.useForm()
    useEffect(() => {
        !!form && form.setFieldsValue(data)
    }, []);
    const changeMutate = useMutation({
        mutationKey: "update",
        mutationFn: BuutaService.update
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
                    <Input placeholder={"Tên bưu tá"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"sodienthoai"}
                >
                    <Input placeholder={"Số điện thoại"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"taitrongtoida"}
                >
                    <Input placeholder={"Tải trọng tối đa"} size={"large"} />
                </Form.Item>




                <Form.Item
                    name={"trangthai"}
                >
                    <Select placeholder={"Chọn trạng thái"} size={"large"} options={[{value: "Sẵn sàng", label: "Sẵn sàng"}, {value: "Rảnh", label: "Rảnh"}, {value: "Bận", label: "Bận"}]} />
                </Form.Item>
                <Form.Item
                    name={"buucucid"}
                >
                    <Select placeholder={"Chọn bưu cục"} size={"large"} options={buucucs?.data.map(val => {
                        return { value: val?.id, label: val?.ten}
                    })} />
                </Form.Item>
            </Form>
        </Modal>
    </>
})

const BuuTa = () => {
    const columns: ColumnsType<Buuta> = [
        {
            title: "Mã bưu tá",
            dataIndex: "id"
        },
        {
            title: "Tên bưu tá",
            dataIndex: "ten"
        },
        {
            title: "Số điện thoại",
            dataIndex: "sodienthoai"
        },
        {
            title: "Tải trọng tối đa",
            dataIndex: "taitrongtoida"
        },
        {
            title: "Trạng thái",
            dataIndex: "trangthai"
        },
        {
            title: "Mã bưu cục làm việc",
            dataIndex: "buucucid"
        },
        {
            title: "Chức vụ",
            dataIndex: "role",
            render: value => {
                return <span>{value === 1 ? 'Bưu tá' : "Quản trị"}</span>
            }
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
        queryKey: "buuta",
        queryFn: () => BuutaService.list()
    })
    const createMutate = useMutation({
        mutationKey: "create",
        mutationFn: BuutaService.create
    })

    const [openEdit, setOpenEdit] = useState<Buuta | null>(null)
    const {data: buucucs} = useQuery({
        queryKey: "buucuc",
        queryFn: () => BuucucService.list()
    })

    const [open, setOpen] = useState(false)
    return <div className={"w-full px-20 flex flex-col justify-center items-center"}>
        <div className={"flex flex-row justify-end items-center  w-full"}>
            <Button onClick={() => setOpen(true)} className={"bg-red-500 text-white mx-10 my-10"} >Tạo mới bưu tá</Button>

        </div>
        <Table className={""} loading={isLoading} dataSource={data?.data} rowKey={"id"} rootClassName={"w-full"} columns={columns}/>

        {!!openEdit && <BuuTaUpdate data={openEdit} dispatch={setOpenEdit} refetch={refetch} />}


        <Modal

            onOk={() => {
                createMutate.mutate(form.getFieldsValue(), {
                    onSuccess: () => {
                        form.resetFields()
                        setOpen(false)
                        refetch()
                    }
                })
            }}
            open={open} onCancel={() => setOpen(false)} okButtonProps={{className: "bg-blue-400"}} >
                <span className={"font-bold text-center mx-auto flex justify-center items-center"}>
                    Tạo mới bưu tá
                </span>
            <Form
                form={form}
                className={"p-10"}
            >
                <Form.Item
                    name={"ten"}
                >
                    <Input placeholder={"Tên bưu tá"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"sodienthoai"}
                >
                    <Input placeholder={"Số điện thoại"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"taitrongtoida"}
                >
                    <Input placeholder={"Tải trọng tối đa"} size={"large"} />
                </Form.Item>




                <Form.Item
                    name={"trangthai"}
                >
                    <Select placeholder={"Chọn trạng thái"} size={"large"} options={[{value: "Sẵn sàng", label: "Sẵn sàng"}, {value: "Rảnh", label: "Rảnh"}, {value: "Bận", label: "Bận"}]} />
                </Form.Item>
                <Form.Item
                    name={"buucucid"}
                >
                    <Select placeholder={"Chọn bưu cục"} size={"large"} options={buucucs?.data.map(val => {
                        return { value: val?.id, label: val?.ten}
                    })} />
                </Form.Item>
            </Form>
        </Modal>


    </div>
}

export default BuuTa