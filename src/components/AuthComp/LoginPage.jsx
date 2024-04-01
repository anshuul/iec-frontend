const LoginPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full mx-4 md:max-w-screen-md border container border-black'>
        <div className='text-center'>
          {/* Logo */}
          <img src='/loginlogo.jpeg' alt='Logo' className='w-20 h-20 mb-8 mx-auto' />
          
          {/* Title */}
          <h1 className='text-3xl font-bold mb-4'>Log In</h1>
        </div>
        
        {/* Email Input */}
        <input
          type='email'
          placeholder='Email'
          className='w-full h-10 border border-gray-500 bg-gray-200 rounded py-4 px-6 mb-4 block mx-auto text-xl'
        />
        
        {/* Password Input */}
        <input
          type='password'
          placeholder='Password'
          className='w-full h-10 border border-gray-500 bg-gray-200 rounded py-4 px-6 mb-4 block mx-auto text-xl'
        />
        
        {/* Login Button */}
        <button className='bg-blue-500 text-white px-4 py-2 text-xl rounded hover:bg-blue-600 block mx-auto'>
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
