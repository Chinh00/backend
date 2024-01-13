import {ColumnsType} from "antd/es/table";
import {Button, DatePicker, Drawer, Form, Input, message, Modal, Select, Table} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useMutation, useQuery} from "react-query";
import {Dispatch, memo, SetStateAction, useEffect, useState} from "react";
import BuucucService from "@/core/services/buucuc.service.ts";
import DonhangService from "@/core/services/donhang.service.ts";
import {Donhang} from "@/core/models/donhang.ts";
import * as moment from "moment/moment";
import dayjs from 'dayjs';
import PhanDon from "@/pages/DonHang/PhanDon.tsx";
import TaoMoi from "@/pages/DonHang/TaoMoi.tsx";

export interface BuuTaUpdateProps {
    data: Donhang,
    dispatch: Dispatch<SetStateAction<Donhang | null>>,
    refetch: any
}

const DonHangUpdate = memo(({data, dispatch, refetch}:BuuTaUpdateProps) => {
    const {data: buucucs} = useQuery({
        queryKey: "buucuc",
        queryFn: () => BuucucService.list()
    })
    const [form] = Form.useForm()
    useEffect(() => {
        !!form && form.setFieldsValue({...data, thoigiangom: dayjs(moment(data?.thoigiangom).format("l"))})


    }, []);
    const changeMutate = useMutation({
        mutationKey: "update",
        mutationFn: DonhangService.update
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
                    name={"diemgom"}
                >
                    <Input placeholder={"Điểm gom hàng"} size={"large"} />
                </Form.Item>

                <Form.Item
                    name={"taitrong"}
                >
                    <Input placeholder={"Tải trọng đơn hàng"} size={"large"} />
                </Form.Item>
                <Form.Item
                    name={"thoigiangom"}
                >
                    <DatePicker placeholder={"Thời gian gom"} />
                </Form.Item>



                <Form.Item
                    name={"trangthai"}
                >
                    <Select placeholder={"Chọn trạng thái"} size={"large"} options={[{value: "Đã phân tuyến", label: "Đã phân tuyến"}, {value: "Tạo đơn", label: "Tạo đơn"}, {value: "Đã xác nhận", label: "Đã xác nhận"}]} />
                </Form.Item>

                <Form.Item
                    name={"buucucnhanid"}
                >
                    <Select placeholder={"Chọn bưu cục nhận"} size={"large"} options={buucucs?.data.map(val => {
                        return { value: val?.id, label: val?.ten}
                    })} />
                </Form.Item>
            </Form>
        </Modal>
    </>
})

const DonHang = () => {
    const columns: ColumnsType<Donhang> = [
        {
            title: "Mã đơn hàng",
            dataIndex: "id"
        },
        {
            title: "Điểm gom",
            dataIndex: "diemgom"
        },
        {
            title: "Mã bưu cục nhận",
            dataIndex: "buucucnhanid"
        },
        {
            title: "Tải trọng",
            dataIndex: "taitrong"
        },
        {
            title: "Thời gian gom",
            dataIndex: "thoigiangom",
            render: value => <span>{moment(value).format("l")}</span>
        },
        {
            title: "Trạng thái",
            dataIndex: "trangthai"
        },
        {
            title: "Hành động",
            render: (value) => {
                return <>
                    <Button onClick={() => {
                        setOpenEdit(data?.data!.filter(e => e.id === value.id)[0]!)
                        form.setFieldsValue(openEdit)
                    }} icon={<EditOutlined />} />
                    <Button className={"ml-2"} onClick={() => setOpenDrawer(value)} >Phân đơn</Button>
                </>
            }
        },
    ]
    const [form] = Form.useForm()
    const {data, refetch, isLoading} = useQuery({
        queryKey: "donhang",
        queryFn: () => DonhangService.list()
    })


    const [openEdit, setOpenEdit] = useState<Donhang | null>(null)
    const {data: buucucs} = useQuery({
        queryKey: "buucuc",
        queryFn: () => BuucucService.list()
    })
    const [openDrawer, setOpenDrawer] = useState<Donhang | null>(null);




    const [open, setOpen] = useState(false)
    return <div className={"w-full px-20"}>
        <div className={"flex flex-row justify-end items-center  w-full"}>
            <Button className={"bg-red-500 text-white mx-10 my-10"} onClick={() => setOpen(true)}>Tạo mới đơn hàng</Button>

        </div>
        <Table className={"px-10"} loading={isLoading} dataSource={data?.data} rowKey={"id"} columns={columns}/>

        {!!openEdit && <DonHangUpdate data={openEdit} dispatch={setOpenEdit} refetch={refetch} />}

        <PhanDon setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />

        <TaoMoi open={open} setOpen={setOpen} form={form} refetch={refetch} buucucs={buucucs?.data || []} />




    </div>
}

export default DonHang