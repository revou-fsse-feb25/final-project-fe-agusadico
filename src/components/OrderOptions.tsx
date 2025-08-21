'use client'

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type FormInputs = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  email: string;
  birthday: string;
  city: string;
  address: string;
};

type GuestFormInputs = {
  name: string;
};

type LoginInputs = {
  email: string;
  password: string;
};

type OrderOptionsProps = {
  orderOption: string;
  onOrderOptionChange: (option: string) => void;
  registerGuest?: UseFormRegister<GuestFormInputs>;
};

export default function OrderOptions({ 
  orderOption, 
  onOrderOptionChange,
  registerGuest
}: OrderOptionsProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const password = watch("password"); // Watch the password field for validation

  const {
    register: registerGuestLocal,
    handleSubmit: handleSubmitGuest,
    formState: { errors: guestErrors },
  } = useForm<GuestFormInputs>();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginInputs>();
  
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    // Here you would typically process the order
    alert('Order placed successfully!');
  };

  const onGuestSubmit: SubmitHandler<GuestFormInputs> = (data) => {
    console.log('Guest data:', data);
    // Process guest order with just the name
    alert('Guest order placed successfully!');
  };

  const onLoginSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoggingIn(true);
    setLoginError('');
    
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      
      if (result?.error) {
        setLoginError('Invalid email or password');
        setIsLoggingIn(false);
        return;
      }
      
      // Success - the session will be updated automatically
      // No need to redirect as we want to stay on the checkout page
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle logout and change account
  const handleChangeAccount = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  // Use the passed registerGuest if available, otherwise use the local one
  const actualRegisterGuest = registerGuest || registerGuestLocal;

  // If user is logged in and has customer role, show user details instead of order options
  if (status === 'authenticated' && session?.user?.role === 'customer') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">ORDER OPTIONS</h2>
        <div className="border rounded-md p-4 border-green-500 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Logged in as:</h3>
              <p className="text-gray-700 font-medium mt-1">{session.user.name}</p>
              <p className="text-gray-500 text-sm">{session.user.email}</p>
            </div>
            <button 
              onClick={handleChangeAccount}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Change account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default UI for non-logged in users
  return (
    <>
      {/* Order Options */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">ORDER OPTIONS</h2>
        <div className="flex flex-col space-y-3">
          <div 
            className={`border rounded-md p-4 cursor-pointer ${orderOption === 'guest' ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'}`}
            onClick={() => onOrderOptionChange('guest')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border ${orderOption === 'guest' ? 'border-red-500 bg-red-500' : 'border-gray-400'} flex items-center justify-center mr-3`}>
                {orderOption === 'guest' && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">Continue as Guest</h3>
                <p className="text-sm text-gray-500">Checkout without registration</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`border rounded-md p-4 cursor-pointer ${orderOption === 'form' ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'}`}
            onClick={() => onOrderOptionChange('form')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border ${orderOption === 'form' ? 'border-red-500 bg-red-500' : 'border-gray-400'} flex items-center justify-center mr-3`}>
                {orderOption === 'form' && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">Register New Member</h3>
                <p className="text-sm text-gray-500">Provide your details for this order</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`border rounded-md p-4 cursor-pointer ${orderOption === 'login' ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'}`}
            onClick={() => onOrderOptionChange('login')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border ${orderOption === 'login' ? 'border-red-500 bg-red-500' : 'border-gray-400'} flex items-center justify-center mr-3`}>
                {orderOption === 'login' && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">Login as Member</h3>
                <p className="text-sm text-gray-500">Sign in to your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Guest Name Form - Show only if guest option is selected */}
      {orderOption === 'guest' && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            GUEST INFO
            <svg className="w-5 h-5 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </h2>
          
          <form onSubmit={handleSubmitGuest(onGuestSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input 
                {...actualRegisterGuest("name", { required: "Name is required" })} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your name"
              />
              {guestErrors.name && <p className="text-red-500 text-sm mt-1">{guestErrors.name.message}</p>}
            </div>
          </form>
        </div>
      )}
      
      {/* Customer Info Form - Show only if form option is selected */}
      {orderOption === 'form' && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            CUSTOMER INFO
            <svg className="w-5 h-5 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input 
                {...register("name", { required: "Name is required" })} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Username *</label>
              <input 
                {...register("username", { required: "Username is required" })} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Choose a username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password *</label>
              <input 
                type="password"
                {...register("password", { required: "Password is required" })} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Create a password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirmation Password *</label>
              <input 
                type="password"
                {...register("confirmPassword", { 
                  required: "Confirmation password is required",
                  validate: value => value === password || "Passwords do not match"
                })} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone Number *</label>
              <div className="flex">
                <div className="flex items-center border border-gray-300 rounded-l-md py-2 px-3 bg-gray-50">
                  <span>+62</span>
                </div>
                <input 
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter a valid phone number"
                    }
                  })} 
                  className="w-full border border-gray-300 rounded-r-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="E.g. jane@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Birthday</label>
              <input 
                type="date"
                {...register("birthday")} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City</label>
              <input 
                {...register("city")} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your city"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea 
                {...register("address")} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your address"
                rows={3}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
          </form>
        </div>
      )}
      
      {/* Login Form - Show only if login option is selected */}
      {orderOption === 'login' && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">LOGIN</h2>
          
          <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input 
                {...registerLogin("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={isLoggingIn}
              />
              {loginErrors.email && <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password *</label>
              <input 
                type="password"
                {...registerLogin("password", { required: "Password is required" })} 
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your password"
                disabled={isLoggingIn}
              />
              {loginErrors.password && <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex justify-center items-center"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Logging in...
                </>
              ) : 'Login'}
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account? <a href="#" className="text-red-600 hover:underline">Register</a>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}