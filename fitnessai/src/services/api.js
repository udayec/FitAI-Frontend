import axios from "axios";

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL:API_URL
});

api.interceptors.request.use((config) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (userId) {
        config.headers['X-User-ID'] = userId;
    }
    return config;
}
);


export const getActivities = () => api.get('/activities');
export const addActivity = (activity) => api.post('/activities', activity);
export const getActivityDetail = (id) => api.get(`/recommendations/activity/${id}`);
export const getUser = (userId) => api.get(`/users/${userId}`);




/* the interceptor runs **before every request** made using `api`.

### How it works (short):

1. `api.get(...)` or `api.post(...)` is called.
2. Axios triggers the **request interceptor**.
3. The `config` object (which has method, URL, headers, etc.) is passed to the interceptor.
4. You **modify the config** (like adding `Authorization` header).
5. `return config;` sends the modified config to the actual request.

So it injects headers into **every request** automatically.*/
