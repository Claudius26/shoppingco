import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const inputVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: 'spring' }
  })
};

const SignUp = () => {
  useEffect(() => {
    localStorage.setItem('hasSignedUp', 'true');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-300 to-blue-500 flex items-center justify-center px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-2xl p-10 border border-white/40 relative"
      >
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-2xl -z-10"></div>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-sky-300 opacity-30 rounded-full blur-2xl -z-10"></div>
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="text-4xl font-extrabold text-center flex-1 text-blue-700 drop-shadow-lg"
          >
            Create Account
          </motion.h2>
          <Link to="/" className="text-sky-600 hover:underline text-base font-semibold ml-4 px-4 py-2 rounded-full bg-white/60 shadow hover:bg-white/80 transition">
            Home
          </Link>
        </div>
        <form className="space-y-6">
          {[
            {
              label: 'First Name',
              type: 'text',
              id: 'firstname',
              name: 'firstname'
            },
            {
              label: 'Last Name',
              type: 'text',
              id: 'lastname',
              name: 'lastname'
            },
            {
              label: 'Date of Birth',
              type: 'date',
              id: 'dob',
              name: 'dob'
            },
            {
              label: 'Nationality',
              type: 'text',
              id: 'nationality',
              name: 'nationality'
            },
            {
              label: 'Home of Residence',
              type: 'text',
              id: 'residence',
              name: 'residence'
            },
            {
              label: 'Phone Number',
              type: 'tel',
              id: 'phone',
              name: 'phone'
            },
            {
              label: 'Email Address',
              type: 'email',
              id: 'email',
              name: 'email'
            },
            {
              label: 'Password',
              type: 'password',
              id: 'password',
              name: 'password'
            }
          ].map((input, i) => (
            <motion.div
              key={input.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={inputVariants}
              className="relative"
            >
              <label htmlFor={input.id} className="block text-sm font-semibold text-blue-700 mb-1">
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.id}
                name={input.name}
                required
                className="mt-1 block w-full border border-blue-200 rounded-xl shadow-sm px-4 py-3 bg-white/90 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition placeholder:text-blue-300"
                placeholder={input.label}
              />
            </motion.div>
          ))}
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, type: 'spring' }}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:from-sky-600 hover:to-blue-600 transition-transform duration-200"
          >
            Sign Up
          </motion.button>
        </form>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6, type: 'spring' }}
          className="text-center text-base text-blue-700 mt-6"
        >
          Already have an account?{' '}
          <Link to="/login" className="text-sky-600 font-semibold hover:underline">
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;