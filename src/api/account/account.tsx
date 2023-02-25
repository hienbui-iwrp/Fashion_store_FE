import axios from 'axios';

const accountService = '/account-service';

export const signIn = async (account: {Username: string, Password: string}) => {
  return await axios
    .post('http://localhost:3000/account-service' + '/sign-in', {...account})
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
