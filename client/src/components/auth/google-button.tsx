/* eslint-disable @typescript-eslint/no-explicit-any */
import { googleAuth } from '@/api/auth';
import { setUserAndToken } from '@/store/slices/auth-slice';
import { GoogleLogin, type Context } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

      const data = await googleAuth(credential);
      toast.success(data.message);

      dispatch(setUserAndToken({ user: data.user, token: data.token }));
      navigate('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Google login failed';
      toast.error(message);
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
