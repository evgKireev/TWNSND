import { API } from '../../@types/constant'
import { UserType } from '../../@types/types/auth'

const registerUserMail = ({
  FirstName,
  Email,
  Password,
  ConfirmPassword,
  LastName,
  Country,
}: UserType) => {
  const body = JSON.stringify({
    FirstName,
    Email,
    Password,
    ConfirmPassword,
    LastName,
    Country,
  });

  return API.post(`api/Account/Register`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  registerUserMail,
}