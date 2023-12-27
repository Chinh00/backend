import axiosClient from "@/core/http.ts";
import {Donhang} from "@/core/models/donhang.ts";
import {Buucuc} from "@/core/models/buucuc.ts";

const url = "/hanhtrinh"

class HanhTrinhService {
    list = async () => await axiosClient.get<Donhang[]>(`${url}/list`)
    detail = async (id: number) => await axiosClient.get<Buucuc[]>(`${url}/${id}`)
}

export default new HanhTrinhService()