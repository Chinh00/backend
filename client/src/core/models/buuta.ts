export interface Buuta {
    id: number,
    ten: string,
    sodienthoai: string,
    taitrongtoida: number,
    trangthai: "Sẵn sàng" | "Chờ" | "Bận",
    buucucid: number,
    role: number,
    image: string
}


export type LoginFormValues = {
    sdt: string,
    password: string
}