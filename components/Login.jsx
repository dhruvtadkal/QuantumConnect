import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { setCookie } from "cookies-next/client";


const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // For navigation after login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("logged in");
        // Set the user_id in cookies
        document.cookie = `user_id=${data.user_id}; path=/; max-age=36000`;
        setCookie("user_id", data.user_id);
        setCookie("user_name",data.user_name);
        console.log(data,data.user_id);
        // Redirect to home page or dashboard
        

        // Show success message
        toast.success(`Welcome back, ${email}!`);
        router.push("/");
      } else {
        // Handle errors (e.g., invalid credentials)
        setErrorMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-400">Login</h2>
      <div className="mt-10 max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50"
        >
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white py-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-neutral-focus text-neutral-content"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-white py-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-neutral-focus text-neutral-content"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-cyan-400 hover:bg-cyan-500 text-white w-full"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
