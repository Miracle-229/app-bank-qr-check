import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

function QR() {
  const [formData, setFormData] = useState({});
  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    const storedFormData = localStorage.getItem('form');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h3 style={{ color: 'white', fontSize: '36px' }}>Qr код</h3>
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
        }}
      >
        <QRCode
          style={{ width: '250px', height: '250px' }}
          value={JSON.stringify(formData)}
        />
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default QR;
