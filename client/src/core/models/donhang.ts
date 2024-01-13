export interface Donhang {
    id: number,
    diemgom: string,
    buucucnhanid: number,
    taitrong: number,
    thoigiangom: Date,
    lat: number,
    log: number
    trangthai: "Đã phân tuyến" | "Tạo đơn" | "Đã xác nhận"

}