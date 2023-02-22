import { api } from '../axios';

const accountService = '/account-service';

export const singIn = async (account: {Username: string, Password: string}) => {
  return await api
    .post(accountService, {...account})
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
