import { GoogleLogin } from '@react-oauth/google';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface GoogleAuthProps {
  onSuccess: (token: string) => void;
}

const GoogleAuth = ({ onSuccess }: GoogleAuthProps) => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    try {
      const credential = credentialResponse.credential;

      if (!credential) {
        throw new Error(
          'Credential not received from Google',
        );
      }

      const res = await axios.post<{
        message: string;
        token: string;
        user: { email: string };
      }>(
        'http://localhost:5000/api/users/google',
        {
          idToken: credential,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      toast.success(res.data.message);
      onSuccess(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
      }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        (error as Error).message ||
        'Google login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          toast.error('Google login failed');
        }}
        ux_mode="popup"
        width="100%"
      />
    </div>
  );
};

export default GoogleAuth;
