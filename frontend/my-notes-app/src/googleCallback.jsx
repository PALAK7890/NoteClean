import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const navigate = useNavigate();

 useEffect(() => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const token = hashParams.get("access_token");

  if (token) {
    localStorage.setItem("token", token);

  
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(info => {
      localStorage.setItem("username", info.name);
      localStorage.setItem("email", info.email);

      navigate("/");
    });
  }
}, []);


  return <h2>Logging you in...</h2>;
}
