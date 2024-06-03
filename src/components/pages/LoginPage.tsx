import { useEffect, useState } from 'react';
// MUI
import {Dialog, DialogActions, DialogContent, DialogTitle,} from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useLoginContext } from '@context/LoginProvider';
import { PostLogin } from '@apis/AxiosPost';
import { useNavigate } from 'react-router-dom';


const userInfo = { id: '', pwd: '' };

enum loginStateCode {
  LoginSuccess = '정상!',
  NoMatchInfo = '아이디 또는 패스워드가 일치하지 않습니다.',
  FailApiCall = '서버와 통신을 실패하였습니다.',
  NoInputData = '아이디 또는 패스워드를 입력하지 않았습니다.',
}

export default function LoginPage() {
  // UnControlled Form set
  const [userForm, setUserForm] = useState(userInfo);
  const handleForm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  // Dialog State
  const [open, setOpen] = useState(false);
  const handleDialogClose = () => { setOpen(false); };

  const [loginFlag, setLoginFlag] = useState(loginStateCode.LoginSuccess);

  const onCheckEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLoginData(e);
    }
  };
  const onCheckEscKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.code === 'Escape') {
      handleDialogClose();
    }
  };

  const { switchLogin } = useLoginContext();
  const navigator = useNavigate();
  // onSubmit Event Function
  const handleLoginData = async (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (userForm.id === '' || userForm.pwd === '') {
      setLoginFlag(loginStateCode.NoInputData);
      setOpen(true);
      return;
    }
    const resPonseLoginState = await PostLogin(userForm);
    if (resPonseLoginState === false) {
      setLoginFlag(loginStateCode.NoMatchInfo);
      setOpen(true);
    }
    else if (resPonseLoginState === undefined) {
      setLoginFlag(loginStateCode.FailApiCall);
      setOpen(true);
    }
    else if (resPonseLoginState === true) {
      switchLogin(true);
      navigator("/")
    }
  };

  useEffect(() => {
    switchLogin(false);
  }, [])
  return (
    <Box sx={{ height: '100vh' }}>
      <Container fixed maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '70%', margin: '0 auto' }}>
          <FormControl sx={{ width: '100%' }} onKeyDown={onCheckEnterKey}>
            <Typography variant="h5" >
              Markany Edoc Jira Manage Page
            </Typography>
            <TextField
              id="id"
              name="id"
              label="아이디"
              fullWidth
              required
              type="text"
              autoComplete="false"
              sx={{ marginTop: '13px' }}
              variant="outlined"
              onChange={handleForm}
              value={userForm.id}
              inputProps={{
                style: { width: "100%", height: '100%', margin: 0 }
              }}
            />

            <TextField
              id="userPassWord"
              name="pwd"
              label="비밀번호"
              fullWidth
              required
              type="password"
              autoComplete="false"
              sx={{ marginTop: '13px', }}
              variant="outlined"
              onChange={handleForm}
              value={userForm.pwd}
              inputProps={{
                style: { width: "100%", height: '100%', margin: 0, },
              }}
            />

            <Button type="submit" variant="contained" onClick={handleLoginData} fullWidth sx={{ marginTop: '15px' }}>Login</Button>
          </FormControl>
        </Box>
      </Container>

      <Dialog open={open} onKeyDown={onCheckEscKey}>
        <DialogTitle>로그인 실패</DialogTitle>
        <DialogContent>{`${loginFlag}`}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>확인</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/*
* onKeypress => onKeyDown (ESC키 인식할수있게변경.)
*/
