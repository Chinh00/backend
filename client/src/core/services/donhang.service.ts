import axiosClient from "@/core/http.ts";
import {Donhang} from "@/core/models/donhang.ts";

const url = "/donhang"

class DonhangService {
    list = async () => await axiosClient.get<Donhang[]>(`${url}/list`)
    create = async (body: Donhang) => await axiosClient.post(`${url}/create`, body)
    update = async (body: Donhang) => await axiosClient.put(`${url}/update`, body)
}

export default new DonhangService()