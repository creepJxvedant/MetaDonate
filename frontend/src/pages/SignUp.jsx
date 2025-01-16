import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/Input';
import Button from '../components/ui/Button';
import { useState } from 'react';
import Auth from '../../Auth.json';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    const existingUser = Auth.find(user => user.email === email);
    if (existingUser) {
      setError('Email is already registered');
      return;
    } 
     const authToken=Auth.length+1; 

    const newUser = {authToken, name, email, password };
    Auth.push(newUser); 

    console.log('New user signed up:', newUser);

    navigate('/login/signin'); 
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <Input
            id="name"
            label="Full Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Email Input */}
          <Input
            id="email-address"
            label="Email address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Input */}
          <Input
            id="password"
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error message */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </form>

        {/* Link to Sign In */}
        <div className="text-center">
          <Link to="/login/signin" className="font-medium text-blue-500 hover:text-blue-400">
            Already have an account? Sign in
          </Link>
        </div>
        {/* Link to go back to options */}
        <div className="text-center mt-4">
          <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400">
            Back to options
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
