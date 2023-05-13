import client from "./client";

export default function addAuthTokenInterceptor(store: any) {
  client.interceptors.request.use((req) => {
    // req.headers.common["Accept"] = `application/json`;
    // req.headers.common["Content-Type"] = `application/json`;
    req.headers.common["Access-Control-Allow-Credentials"] = true;
    req.headers.common["Access-Control-Allow-Origin"] = `*`;
    // req.headers.common[
    //   "Access-Control-Allow-Methods"
    // ] = `GET,PUT,POST,DELETE,PATCH,OPTIONS`;

    // 'Access-Control-Allow-Credentials':true
    // withCredentials: true

    // 'Access-Control-Allow-Origin' : '*',
    // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    const token = store.getState().chatGPT.X_API_TOKEN;
    if (!token) return req;
    const barearToken = store.getState().auth.token;
    req.headers.common["Authorization"] = `Bearer ${barearToken}`;

    req.headers.common["X-API-KEY"] = `${token}`;
    return req;
  });
}
// Accept: 'application/json',
// 'Content-Type': 'application/json',
