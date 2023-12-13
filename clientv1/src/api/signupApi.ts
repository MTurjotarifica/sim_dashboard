import axios from "axios";


// For pruduction change .post url to "https://serverd.azurewebsites.net/signup"
// For test change .post url to `${process.env.NEXT_PUBLIC_API_URL}signup`
export const signupApi = (
  username: string,
  password: string,
  email: string,
  setToastMessage: (value: string) => void
) => {

  
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}signup`, {
      username,
      email,
      password,
    })
    .then((response) => {
      setToastMessage(response.data.message);
      return response.data;
    })
    .catch((error) => {
      setToastMessage(error.response.data.message);
      console.error("Error logging in:", error);
    });
};
