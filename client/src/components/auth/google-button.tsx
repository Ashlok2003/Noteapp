import { GoogleLogin, type Context } from '@react-oauth/google';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUserAndToken } from '@/store/slices/auth-slice';

interface GoogleAuthProps {
  context: Context;
}

const GoogleAuth = ({ context }: GoogleAuthProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    try {
      const credential = credentialResponse.credential;

      if (!credential) {
        throw new Error('Credential not received from Google');
      }

      const res = await axios.post<{
        message: string;
        token: string;
        user: { email: string };
      }>(
        'http://localhost:5000/api/users/google',
        { idToken: credential },
        { headers: { 'Content-Type': 'application/json' } },
      );

      toast.success(res.data.message);

      dispatch(setUserAndToken({ user: res.data.user, token: res.data.token }));

      navigate('/dashboard');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || (error as Error).message || 'Google login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        context={context}
        text={context === 'signin' ? 'signin_with' : 'signup_with'}
        onSuccess={handleSuccess}
        onError={() => toast.error('Google login failed')}
        ux_mode="popup"
        width="100%"
      />
    </div>
  );
};

export default GoogleAuth;
