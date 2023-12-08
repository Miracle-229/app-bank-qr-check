import Login from '../pages/Login';
import QR from '../pages/Qr';
import Registration from '../pages/Registration';
import Scan from '../pages/Scan';

const routes = {
  work: [
    {
      path: '/scan',
      element: Scan,
    },
  ],
  public: [
    {
      path: '/',
      element: Login,
    },
    {
      path: '/registration',
      element: Registration,
    },
    {
      path: '/qr',
      element: QR,
    },
  ],
};

export default routes;
