import axios from "axios";
import { API } from "@/const/constants";
export default class Services {
    static async  createClient(data: any): Promise<any> {
        axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
        const result = await axios({
            method: "POST",
            url: `${API.HOST}/clients`,
            data: data,
            responseType: "json"
        })
        return result;
    }
}