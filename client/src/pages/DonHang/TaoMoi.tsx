import {DatePicker, Form, FormInstance, Input, message, Modal, Select} from "antd";
import {useMutation} from "react-query";
import DonhangService from "@/core/services/donhang.service.ts";
import {Dispatch, SetStateAction} from "react";
import {Buucuc} from "@/core/models/buucuc.ts";

interface TaoMoiProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    form: FormInstance<any>,
    refetch: any,
    buucucs: Buucuc[]
}

const TaoMoi = ({open, setOpen, form, refetch, buucucs}: TaoMoiProps) => {
    const createMutate = useMutation({
        mutationKey: "create",
        mutationFn: DonhangService.create,
        onSuccess: e => {
            message.success("Phân đơn thành công cho bưu tá")
        }
    })
  return <>
      <Modal

          onOk={() => {
              createMutate.mutate({
                  ...form.getFieldsValue(),
                  id: 0,
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
                    Tạo mới đơn hàng
                </span>
          <Form
              form={form}
              className={"p-10"}
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
                  name={"lat"}
              >
                  <Input placeholder={"Kinh độ"} size={"large"} />
              </Form.Item>
              <Form.Item
                  name={"log"}
              >
                  <Input placeholder={"Vĩ độ"} size={"large"} />
              </Form.Item>


              <Form.Item
                  name={"trangthai"}
              >
                  <Select placeholder={"Chọn trạng thái"} size={"large"} options={[{value: "Đã phân tuyến", label: "Đã phân tuyến"}, {value: "Tạo đơn", label: "Tạo đơn"}, {value: "Đã xác nhận", label: "Đã xác nhận"}]} />
              </Form.Item>

              <Form.Item
                  name={"buucucnhanid"}
              >
                  <Select placeholder={"Chọn bưu cục nhận"} size={"large"} options={buucucs?.map(val => {
                      return { value: val?.id, label: val?.ten}
                  })} />
              </Form.Item>
          </Form>
      </Modal>

  </>
}

export default TaoMoi