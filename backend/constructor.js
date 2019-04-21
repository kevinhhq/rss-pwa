const AylienNewsApi = require("aylien-news-api");
const apiInstance = new AylienNewsApi.DefaultApi();
const app_id = apiInstance.apiClient.authentications["app_id"];
app_id.apiKey = "d12ed1c6";
const app_key = apiInstance.apiClient.authentications["app_key"];
app_key.apiKey = "ce32b4c15a74665e21f9312894f04158";

module.exports = apiInstance;
