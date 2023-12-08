import {
  FormEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import style from '../styles/Registration.module.scss';
import { IService } from '../helper/types';
import { services } from '../helper/constants';

const videoConstraints = {
  width: 250,
  height: 250,
  facingMode: 'user',
};

function Registration() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [passport, setPassport] = useState('');
  const [service, setService] = useState('');
  const [open, setOpen] = useState(false);
  const id = useId();
  const [, setImage] = useState<string>('');
  const [savedImages, setSavedImages] = useState<string[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const work = JSON.parse(localStorage.getItem('work') as string);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc !== null) {
        setImage(imageSrc);
        setSavedImages([...savedImages, imageSrc]);
        setOpen(false);
      }
    }
  }, [webcamRef, savedImages]);

  const handleChangeService = (event: SelectChangeEvent) => {
    setService(event.target.value as string);
  };
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const saveForm = (event: FormEvent) => {
    event.preventDefault();
    const form = { name, passport, gender, service, savedImages };
    if (work) {
      localStorage.setItem('checkForm', JSON.stringify(form));
      alert('всё хорошо');
    } else {
      localStorage.setItem('form', JSON.stringify(form));
      navigate('/qr');
    }
  };

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('checkForm') || '{}');
    if (formData) {
      if (formData) {
        setName(formData.name || '');
        setGender(formData.gender || '');
        setPassport(formData.passport || '');
        setService(formData.service || '');
      }
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form className={style.main} onSubmit={saveForm}>
        <h3 className={style.h3}>Заполнение бланка</h3>
        <TextField
          id="outlined-basic-name"
          label="Имя"
          name="name"
          value={name}
          variant="outlined"
          type="text"
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            style: {
              color: 'white',
            },
            classes: {
              notchedOutline: `${style.text}`,
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white',
            },
          }}
          required
        />
        <TextField
          id="outlined-basic-passport"
          label="Паспортные данные"
          name="passport"
          value={passport}
          variant="outlined"
          onChange={(e) => setPassport(e.target.value)}
          type="text"
          InputProps={{
            style: {
              color: 'white',
            },
            classes: {
              notchedOutline: `${style.text}`,
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white',
            },
          }}
          required
        />
        <RadioGroup
          row
          value={gender}
          onChange={handleChangeGender}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{
            '& .MuiSvgIcon-root': {
              color: 'white',
              '&.Mui-checked': {
                color: 'white',
              },
            },
          }}
        >
          <FormControlLabel
            sx={{ color: 'white' }}
            value="male"
            control={<Radio required />}
            label="Мужчина"
          />
          <FormControlLabel
            sx={{ color: 'white' }}
            value="female"
            control={<Radio required />}
            label="Женщина"
          />
        </RadioGroup>
        <FormControl
          required
          sx={{
            m: 1,
            minWidth: 220,
          }}
        >
          <InputLabel
            sx={{
              color: 'white',
              '&.Mui-focused': {
                color: 'white',
              },
            }}
            id="demo-simple-select-required-label"
          >
            Выберите сервис
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={service}
            onChange={handleChangeService}
            label="Выберите сервис"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white !important',
              },
              '& .MuiSelect-select': {
                color: 'white',
              },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#222222',
                  color: 'white',
                },
              },
              MenuListProps: {
                sx: {
                  '& .MuiMenuItem-root:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                },
              },
            }}
          >
            {services.map((item: IService) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup sx={{ color: 'white', borderColor: 'white' }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Согласиться на сбор данных для банка"
          />
        </FormGroup>
        {work ? (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Open Modal
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Take a photo</DialogTitle>
              <DialogContent>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={capture} color="primary">
                  Capture
                </Button>
              </DialogActions>
            </Dialog>
            <Box display="flex" flexWrap="wrap">
              {savedImages.map((image) => (
                <img
                  key={id}
                  src={image}
                  alt="Captured"
                  width="200"
                  height="200"
                />
              ))}
            </Box>
          </div>
        ) : (
          <div />
        )}
        <Button
          sx={{ minWidth: '210px', backgroundColor: 'white', color: 'black' }}
          type="submit"
          variant="contained"
        >
          Завершить
        </Button>
      </form>
    </div>
  );
}

export default Registration;
