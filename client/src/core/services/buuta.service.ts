import axiosClient from "@/core/http.ts";
import {Buuta, LoginFormValues} from "@/core/models/buuta.ts";

const url = "/buuta"

class BuutaService {
    list = async () => await axiosClient.get<Buuta[]>(`${url}/list`)
    create = async (body: Omit<Buuta, "id">) => await axiosClient.post(`${url}/create`, body)
    update = async (body: Buuta) => await axiosClient.put(`${url}/update`, body)

    listByBuuCucId = async (id: number) => axiosClient.get(`/${id}/list`)

    login = async (body: LoginFormValues) => await axiosClient.post<Buuta>(`${url}/login`, body)
}

export default new BuutaService()