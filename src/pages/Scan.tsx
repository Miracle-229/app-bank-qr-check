import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { NavLink, useNavigate } from 'react-router-dom';
import style from '../styles/Scan.module.scss';

function Scan() {
  const [, setScanError] = useState<string>('');
  const [scanResult, setScanResult] = useState<string>('');
  const readerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  let scanner: Html5QrcodeScanner;

  useEffect(() => {
    if (!scanner?.getState()) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scanner = new Html5QrcodeScanner(
        'reader',
        {
          qrbox: {
            width: 500,
            height: 500,
          },
          fps: 10,
        },
        false
      );
      const onScanSuccess = (result: string) => {
        scanner.clear();
        setScanResult(result);
        localStorage.setItem('checkForm', result);
        navigate('/registration');
      };
      const onScanFailure = (error: string) => {
        setScanError(error);
      };

      scanner.render(onScanSuccess, onScanFailure);
    }
  }, []);

  return (
    <div>
      <h3 style={{ color: 'white' }}>QR CODE</h3>
      {scanResult ? (
        <div>
          Success:<NavLink to={scanResult}>{scanResult}</NavLink>
        </div>
      ) : (
        <div className={style.main}>
          <div
            id="reader"
            ref={readerRef}
            style={{ width: 500, height: 500 }}
          />
        </div>
      )}
    </div>
  );
}

export default Scan;
