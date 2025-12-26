import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_url } from "../utils";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [loading,setLoading] = useState<boolean>(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        setLoading(true);
    // Example: call backend API
    await fetch(`${backend_url}/api/user/register`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ username, email, password }),
                    })
    // After successful register, redirect to login
    toast.success("register successfully!")
    await navigate("/login");
    }catch(err:any){
        console.log(err);
        toast.error(err.message || "error in registering user!")
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading} className={`w-full p-2 rounded text-white ${ loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600" }`} >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
