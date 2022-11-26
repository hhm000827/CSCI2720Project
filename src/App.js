import "./App.css";

function App() {
    return (
        <Login />
    );
}

function Login() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className="card max-w-xl lg:card-side bg-base-200 shadow-xl glass m-5">
                <figure>
                    <img
                        src="https://www.hotel-icon.com/public/banner/images/nightviews%20banner.jpg"
                        className="object-none w-96 lg:w-48 h-full"
                        loading="lazy"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            class="input input-bordered w-full"
                        />
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            class="input input-bordered w-full"
                        />
                    </div>
                    <div className="card-actions mt-12">
                        <button className="btn btn-outline w-full">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
