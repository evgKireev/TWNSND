import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from '../../components/APP/Main'
import Account from '../Account'
import ChangePassword from '../ChangePassword'
import CheckPasswordSocial from '../CheckPasswordSocial'
import Home from '../Home'
import PlatformDetails from '../PlatformDetails'
import Platforms from '../Platforms'
import RegistrationConfirm from '../RegistrationConfirm'
import RestoreChangePassword from '../RestoreChangePassword'
import RestorePassword from '../RestorePassword'
import SignUp from '../SignUp'
import SignUpHome from '../SignUpHome'
import SignIn from '../SingIn'
import SuccessRegistration from '../SuccessRegistration'

export enum PathNames {
  Home = '/',
  Main = '/main',
  Platforms = '/platforms',
  SignIn = '/signin',
  SignUp = '/signup',
  SignUpMail = ':slag/mail',
  Account = '/account',
  SuccessRegistration = '/success',
  CheckPasswordSocial = '/check-password-social',
  RestorePassword = ':slag/restore-passord',
  ChangePassword = ':slag/recovery-passord-change',
  RestoreChangePassword = '/restore-passord-change',
  RegistrationConfirm = '/confirm-password',
  PlatformDetails = '/platforms/',
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.Home} element={<Home />}>
          <Route index element={<Main />} />
          <Route path={PathNames.Platforms} element={<Platforms />} />
        </Route>
        <Route path={PathNames.SignUp} element={<SignUpHome />} />
        <Route path={PathNames.SignUpMail} element={<SignUp />} />
        <Route path={PathNames.SignIn} element={<SignIn />} />
        <Route path={PathNames.Account} element={<Account />} />
        <Route
          path={PathNames.SuccessRegistration}
          element={<SuccessRegistration />}
        />
        <Route
          path={PathNames.CheckPasswordSocial}
          element={<CheckPasswordSocial />}
        />
        <Route path={PathNames.RestorePassword} element={<RestorePassword />} />
        <Route
          path={PathNames.RegistrationConfirm}
          element={<RegistrationConfirm />}
        />
        <Route path={PathNames.ChangePassword} element={<ChangePassword />} />
        <Route
          path={PathNames.RestoreChangePassword}
          element={<RestoreChangePassword />}
        />
        <Route
          path={`${PathNames.PlatformDetails}:id`}
          element={<PlatformDetails />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
