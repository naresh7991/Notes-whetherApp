import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Header() {
  const {username,setUsername} = useAuth() // backend should set this cookie on login
  const navigate = useNavigate()

  const logoutUser = async ()=>{
    try{
      const res = await fetch('http://localhost:4000/api/user/logout',{
        credentials:'include'
      })
      if(res.ok){
        setUsername(null);
        toast.success("logout successfully!")
        navigate('/login',{replace:true})
      }
    }catch(err){
      console.log(err);
      toast.error("logout failed!")
    }
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <nav className="space-x-4">
        {!username?(<><Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link></>):
        null}
        {/* <Link to="/dashboard" className="hover:underline">Dashboard</Link> */}
      </nav>
      <div>
        {username ? (
          <><span className="font-semibold">Hello, {username}</span><button className="ml-2 p-1 border-2 rounded-md bg-white text-black" onClick={()=>logoutUser()}>logout</button></>
        ) : (
          <span className="italic">Not logged in</span>
        )}
      </div>
    </header>
  );
}
