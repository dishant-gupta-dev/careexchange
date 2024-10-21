import axios from "axios";

const API_BASE_URL = "http://13.57.166.13/api/v1/";

class ApiService {
  /*Get API*/
  getAPI(urlSegment) {
    return axios.get(API_BASE_URL + urlSegment);
  }

  /*Get API With Authentication header */
  getAPIWithAccessToken(urlSegment) {
    let token = JSON.parse(localStorage.getItem("careexchange"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    };
    return axios
      .get(API_BASE_URL + urlSegment, { headers: headers })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }

  /*Post API Without Authentication header */
  postAPI(urlSegment, formdata) {
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_BASE_URL + urlSegment, formdata, {
      headers: headers,
    });
  }

  /*Post API With Authentication header */
  postAPIWithAccessToken(urlSegment, formdata) {
    let token = JSON.parse(localStorage.getItem("careexchange"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    };
    return axios.post(API_BASE_URL + urlSegment, formdata, {
      headers: headers,
    });
  }

  /*Post API With Authentication header with multipart/form-data */
  postAPIWithAccessTokenMultiPart(urlSegment, formdata) {
    let token = JSON.parse(localStorage.getItem("careexchange"));
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token.token,
    };
    return axios.post(API_BASE_URL + urlSegment, formdata, {
      headers: headers,
    });
  }

  /*Put API With Authentication header */
  putAPIWithAccessToken(urlSegment, formdata) {
    let token = JSON.parse(localStorage.getItem("careexchange"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    };
    return axios.put(API_BASE_URL + urlSegment, formdata, { headers: headers });
  }

  /*Put API With Authentication header with multipart/form-data */
  putAPIWithAccessTokenMultiPart(urlSegment, formdata) {
    let token = JSON.parse(localStorage.getItem("careexchange"));
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token.token,
    };
    return axios.put(API_BASE_URL + urlSegment, formdata, { headers: headers });
  }

  /*Delete API With Authentication header */
  deleteAPIWithAccessToken(urlSegment) {
    let token = JSON.parse(localStorage.getItem("careexchange"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    };
    return axios.delete(API_BASE_URL + urlSegment, { headers: headers });
  }
}

export default new ApiService();
