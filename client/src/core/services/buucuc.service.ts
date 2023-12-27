import axiosClient from "@/core/http.ts";
import {Buucuc} from "@/core/models/buucuc.ts";


const url = "/buucuc"
class BuucucService {
    list = async () => await axiosClient.get<Buucuc[]>(`${url}/list`)
    create = async (body: Buucuc) => await axiosClient.post(`${url}/create`, body)
    update = async (body: Buucuc) => await axiosClient.put(`${url}/update`, body)
}


export default new BuucucService()