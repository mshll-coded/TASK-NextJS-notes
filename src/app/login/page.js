import Input from '@/components/Input';
import { login } from '@/actions/auth';

function Login() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center absolute inset-0 z-[-1]">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-3xl text-white font-semibold mb-6">Login</h2>
        {/* Wire up the login action */}
        <form action={login}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <Input type="email" name="email" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <Input name="password" type="password" required />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
