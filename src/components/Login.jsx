import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
    const { setShowUserLogin, setUser, navigate } = useAppContext();

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const getStoredUsers = () => {
        try {
            return JSON.parse(localStorage.getItem("users")) || [];
        } catch {
            return [];
        }
    };

    const saveUsers = (users) => {
        localStorage.setItem("users", JSON.stringify(users));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const users = getStoredUsers();

        if (state === "login") {
            const found = users.find((u) => u.email === email && u.password === password);
            if (!found) {
                toast.error("Invalid email or password");
                return;
            }
            setUser(found);
            toast.success("Login successful");
            setShowUserLogin(false);
            return;
        }

        const exists = users.some((u) => u.email === email);
        if (exists) {
            toast.error("User already exists");
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        saveUsers(users);
        setUser(newUser);
        toast.success("Account created — logged in");
        setShowUserLogin(false);
        if (typeof navigate === "function") navigate("/dashboard");
    };

    return (
        <div
            onClick={() => setShowUserLogin(false)}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-30"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-8 py-12 rounded-lg shadow-xl w-80 sm:w-[352px] text-gray-600 border border-gray-200"
            >
                <p className="text-2xl font-medium text-center mb-4">
                    <span className="text-primary">User</span>{" "}
                    {state === "login" ? "Login" : "Sign Up"}
                </p>

                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            type="text"
                            required
                        />
                    </div>
                )}

                <div className="w-full mt-2">
                    <p>Email</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type="email"
                        required
                    />
                </div>

                <div className="w-full mt-2">
                    <p>Password</p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        type="password"
                        required
                    />
                </div>

                {state === "login" ? (
                    <p className="mt-2 text-sm">
                        Create an account?{" "}
                        <span
                            className="text-indigo-500 cursor-pointer"
                            onClick={() => {
                                setState("register");
                                setName("");
                                setPassword("");
                            }}
                        >
                            click here
                        </span>
                    </p>
                ) : (
                    <p className="mt-2 text-sm">
                        Already have account?{" "}
                        <span
                            className="text-indigo-500 cursor-pointer"
                            onClick={() => {
                                setState("login");
                                setPassword("");
                            }}
                        >
                            click here
                        </span>
                    </p>
                )}

                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 mt-4 rounded-md">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
