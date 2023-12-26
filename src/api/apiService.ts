import axios from 'axios';

const Url171 = (process.env.REACT_APP_PUBLIC_URL === "development" || window.location.protocol === 'http:') ? "http://35.155.202.216:8080/" : "http://35.155.202.216:8080/";

class ApiService {
    getlistdata(): any {
        const header: any = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        };

        const apiUrl = Url171 + 'Automation/webflowList'

        return axios.get(
            apiUrl,
            header
        );
    }

    getlistbyid(id: any): any {
        const header: any = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        };

        const apiUrl = Url171 + 'Automation/webflowGet/' + id

        return axios.get(
            apiUrl,
            header
        );
    }

    savewebflow(saveData: any): any {
        const header: any = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        };

        const apiUrl = Url171 + 'Automation/saveForm'

        return axios.post(
            apiUrl,
            saveData,
            header
        );
    }
    assignWebflowUser(saveData: any): any {
        const header: any = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        };

        const apiUrl = Url171 + 'WebflowService/assignWebFlowToUser '

        return axios.post(
            apiUrl,
            saveData,
            header
        );
    }
    deletewebflow(deleteid: any): any {
        const header: any = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        };

        const apiUrl = Url171 + 'Automation/deleteWebflowById/' + deleteid
        console.log('apiUrl', apiUrl)
        return axios.delete(
            apiUrl,
            header
        );
    }

}

export default new ApiService();