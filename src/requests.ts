import axios from 'axios'

class Requests {
    getBrands() {
        try {
            return axios({
                url: `https://recruting-test-api.herokuapp.com/api/v1/brands`,
                method: 'GET'
            })
        } catch (e) {
            console.log(e);
            throw e

        }
    }
    // getOne(id: string) {
    //     try {
    //         return axios({
    //             url: `https://recruting-test-api.herokuapp.com/api/v1/brand/${id}`,
    //             method: 'GET'
    //         })
    //     } catch (e) {
    //         console.log(e);
    //         throw e

    //     }
    // }
}

export default new Requests()