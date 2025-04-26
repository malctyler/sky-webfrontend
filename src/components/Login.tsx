// ...existing imports...
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ...existing login logic...
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // Use the login function from auth context
        navigate('/'); // Redirect to home page after successful login
      } else {
        // ...error handling...
      }
    } catch (error) {
      // ...error handling...
    }
  };

  // ...rest of the component...