import axios from "axios";

export const getData = (loading: (value: boolean) => void) => {

  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}data`)
    // .get("https://serverd.azurewebsites.net/data")
    .then((response) => {
      loading(true);
      // console.log(response)
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
