"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function UserRegistration({ nextStep, updateUserData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    length: true,
    uppercase: true,
    number: true,
    special: true,
  });
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const validateName = (value) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (!nameRegex.test(value)) {
      setNameError("Name should only contain letters and spaces");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const validatePassword = (value) => {
    const errors = {
      length: value.length < 8,
      uppercase: !/[A-Z]/.test(value),
      number: !/[0-9]/.test(value),
      special: !/[!@#$%^&*]/.test(value),
    };

    setPasswordErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const getErrorMessage = (errorKey) => {
    const messages = {
      length: "Password must be at least 8 characters long",
      uppercase: "Password must contain at least one uppercase letter",
      number: "Password must contain at least one number",
      special:
        "Password must contain at least one special character (!@#$%^&*)",
    };
    return messages[errorKey];
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!isPasswordTouched) {
      setIsPasswordTouched(true);
    }
    validatePassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateName(name) || !validatePassword(password)) {
      return;
    }
    if (showVerification) {
      updateUserData({ name, email });
      nextStep();
    } else {
      setShowVerification(true);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME SECTION */}
        <div className="text-black">
          <label htmlFor="name" className="block mb-1">
            Name <span className="text-sm text-red-500">*</span>
          </label>
          <div className="flex rounded-md border focus-within:border-2 focus-within:border-black">
            <div className="text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200 h-full px-2 rounded-l-md py-2.5">
              <FaRegUser className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={`w-full px-3 py-2 pr-10 rounded-r-md outline-none border-none ${
                nameError ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
          </div>
          {nameError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs mt-1"
            >
              {nameError}
            </motion.p>
          )}
        </div>
        {/* EMAIL SECTION */}
        <div>
          <label htmlFor="email" className="block mb-1">
            Email <span className="text-sm text-red-500">*</span>
          </label>
          <div className="flex rounded-md border focus-within:border-2 focus-within:border-black">
            <div className="text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200 h-full px-2 rounded-l-md py-2.5">
              <MdAlternateEmail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 pr-10 rounded-r-md outline-none border-none"
              required
            />
          </div>
        </div>
        {/* PASSWORD SECTION */}
        <div>
          <label htmlFor="password" className="block mb-1">
            Password <span className="text-sm text-red-500">*</span>
          </label>
          <div className="flex rounded-md border focus-within:border-2 focus-within:border-black">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 pr-10 rounded-l-md outline-none border-none"
              required
            />
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200 h-full px-2 rounded-r-md py-2.5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEyeSlash className="w-5 h-5" />
              ) : (
                <FaRegEye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="mt-2">
            {isPasswordTouched &&
              Object.entries(passwordErrors).map(
                ([key, hasError]) =>
                  hasError && (
                    <motion.p
                      key={key}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-xs"
                    >
                      {getErrorMessage(key)}
                    </motion.p>
                  )
              )}
          </div>
        </div>
        {showVerification && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="verificationCode" className="block mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </motion.div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {showVerification ? "Verify" : "Register"}
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-700 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <img src="/google-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
      </div>
    </motion.div>
  );
}
