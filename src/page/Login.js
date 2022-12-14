// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
import toast from "react-hot-toast";

export function Login() {
  // thx Liam
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      verifyForm();
    }
  };

  return (
    <>
      <div className="flex w-full h-screen items-center justify-center">
        <div className="card max-w-xl lg:card-side bg-base-200 shadow-xl glass m-5">
          <figure>
            <img src="https://www.hotel-icon.com/public/banner/images/nightviews%20banner.jpg" className="object-none w-96 lg:w-48 h-full pointer-events-none select-none" loading="lazy" />
          </figure>
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" placeholder="Username" id="username" className="input input-bordered w-full" onKeyDown={pressEnter} />
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" id="password" className="input input-bordered w-full" onKeyDown={pressEnter} />
            </div>
            <div className="card-actions mt-12">
              <button className="btn btn-outline w-full" onClick={verifyForm}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function verifyForm() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/verifyAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((res) => (res.status === 200 ? res.json() : res.text()))
    .then((data) => {
      if (data.result) {
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("role", data.role);
        window.location.assign("/main");
      } else {
        toast.error("Wrong username or password!");
      }
    });
}
