import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_url } from "../utils";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [loading,setLoading] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example: call backend API
    try{
        setLoading(true)
    await fetch(`${backend_url}/api/user/signin`, 
        { method: "POST",
          headers: { "Content-Type": "application/json",
           }, 
          body: JSON.stringify({ email, password }),
          credentials: "include" 
        });
    toast.success("login successfully!")
    await navigate("/dashboard");
    }catch(err:any){
        console.log(err);
        toast.error(err.message || "Login failed")
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-1 bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
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
        <button type="submit" disabled={loading} className={`w-full p-2 rounded text-white ${ loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600" }`} >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
