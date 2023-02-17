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
  return (
    API.get(`api/Account/Register`),
    { FirstName, Email, Password, ConfirmPassword, LastName, Country }
  )
}

export default {
  registerUserMail,
}
