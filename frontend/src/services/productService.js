import axios from '../axios';

const displayProducts =(categoryid) => {
    return axios.get(`/api/product?categoryid=${categoryid}`);
}

export {displayProducts}