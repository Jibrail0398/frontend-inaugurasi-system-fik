import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import AlertBasic from "../../../components/alert/AlertBasic";
import useAuth from "../../../hooks/useAuth";

export default function LoginPage() {
    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const { login } = useAuth();

    // input
    const [nim, setNim] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async () => {
        const isValid = await login({ nim, password }, rememberMe);

        if (!isValid) {
            setAlert({
                type: "danger",
                message: "NIM atau password salah",
            });
            return;
        }

        navigate("/admin");
    };

    useEffect(() => {
        // Clear alert
        return () => {
            setAlert(null);
        };
    }, []);

    return (
        <>
            {alert && <AlertBasic type={alert.type} message={alert.message} />}

            <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
            </div>
            <form className="user">
                <div className="form-group">
                    <input type="text" className="form-control form-control-user" id="exampleInputNIM" aria-describedby="nimHelp" placeholder="Masukan NIM" value={nim} onChange={(e) => setNim(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox small">
                        <input type="checkbox" className="custom-control-input" id="customCheck" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label className="custom-control-label" htmlFor="customCheck">
                            Remember Me
                        </label>
                    </div>
                </div>
                <button type="button" onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                    Login
                </button>
            </form>
            <hr />
            <div className="text-center">
                <Link className="small" to="/admin/auth/forgot-password">
                    Forgot Password?
                </Link>
            </div>
        </>
    );
}
