import {Button, Drawer, Input, Modal, Table} from "antd";
import {Dispatch, SetStateAction, useState} from "react";
import {Donhang} from "@/core/models/donhang.ts";
import {useQuery} from "react-query";
import BuutaService from "@/core/services/buuta.service.ts";
import {ColumnsType} from "antd/es/table";
import {Buuta} from "@/core/models/buuta.ts";

interface PhanDonProps {
    setOpenDrawer: Dispatch<SetStateAction<any>>,
    openDrawer: Donhang | null,
}

const PhanDon = ({setOpenDrawer, openDrawer}: PhanDonProps) => {
    const {data, refetch, isLoading} = useQuery({
        queryKey: "buuta",
        queryFn: () => BuutaService.list(),
        onSuccess: res => {
            setSource(res.data)
        }
    })

    const [source, setSource] = useState<Buuta[]>([])

    const column: ColumnsType<Buuta> = [
        {
            title: "Mã bưu tá",
            render: value => value.id
        },
        {
            title: "Tên bưu tá",
            dataIndex: "ten"
        },
        {
            title: "Khoảng cách",
            render: value => 0
        },
        {
            title: "Chọn",
            render: value => {
                return <Button size={"small"}
                    onClick={() => setOpen(value)}
                >Chọn</Button>
            }
        },

    ]
    const [open, setOpen] = useState<Buuta>()


    return <Drawer width={500} title="Phân đơn cho đơn hàng " onClose={() => setOpenDrawer(null)} open={!!openDrawer}>
        <Button className={"float-right mb-5"}>Phân đơn tự động</Button>

        <Input placeholder={"Tìm bưu tá"} onChange={(event) => {
            setSource(prevState => [...prevState.filter(e => e.ten.includes(event.target.value))])
        }} />
        <Table
            pagination={false}
            loading={isLoading}
            columns={column}
            dataSource={source}
            rowKey={"id"}
        />
        <Modal
            open={!!open}
            title={"Xác nhận chọn bưu tá"}
            onOk={() => setOpen(undefined)}
            okButtonProps={{className: "bg-green-500"}}
            onCancel={() => setOpen(undefined)}
        >
            <p>Thông tin bưu tá</p>
            {!!open && Object.entries(open).filter(([key]) => !["password", "role", "image"].includes(key)).map(([key, value]) => {
                return <div key={key} className={"flex flex-row w-[200px] justify-between"}>
                    <span className={"font-semibold"}>{key}:</span>
                    <span>{value}</span>
                </div>
            })}

        </Modal>
    </Drawer>
}

export default PhanDon