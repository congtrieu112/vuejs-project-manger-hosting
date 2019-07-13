import axios from "axios";
import { API } from "@/const/constants";
export default class Services {
    static async  createOrApi(data: any,slug: string): Promise<any> {
        axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
        const result = await axios({
            method: "POST",
            url: `${API.HOST}/${slug}`,
            data: data,
            responseType: "json"
        })
        return result;
    }
    static async  deleteApi(data: any,slug: string): Promise<any> {
        axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
        const result = await axios({
            method: "DELETE",
            url: `${API.HOST}/${slug}`,
            data: data,
            responseType: "json"
        })
        return result;
    }
}