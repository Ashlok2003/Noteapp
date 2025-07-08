import axios from './axios-instance';

export const Signup = async (payload: { email: string; name: string; dob: string }) => {
  const res = await axios.post('/users/signup', payload);
  return res.data as { message: string; userId: string };
};

export const Login = async (payload: { email: string }) => {
  const res = await axios.post('/users/login', payload);
  return res.data as { message: string; userId: string };
};

export const OTPVerify = async (payload: { email: string; otp: string }) => {
  const res = await axios.post('/users/verify-otp', payload);
  return res.data as {
    message: string;
    token: string;
    name: string;
    dob: string;
  };
};
