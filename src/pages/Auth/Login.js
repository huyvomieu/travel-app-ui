import { useState } from 'react';
import Button from '../../components/ui/Button';
import { postLogin } from '../../services/AuthService';
import { useLoading } from '../../components/context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsvalid] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [error, setError] = useState('Vui lòng nhập Email và mật khẩu!');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { setLoading } = useLoading();

    const { login } = useAuth();
    const navigate = useNavigate();
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value === '') {
            setIsvalid(true);
            return;
        }
        setIsvalid(emailRegex.test(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setIsEmpty(true);
            return;
        }
        if (!emailRegex.test(email)) {
            setIsvalid(false);
        }

        const fetchAPI = async () => {
            try {
                setLoading(true);
                const res = await postLogin({ email, password });
                if (res.status === 200) {
                    login(res.data.token);
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAPI();
    };
    return (
        <div className="flex justify-center items-center bg-gray-50 min-h-screen border rounded-l-xl">
            <div className="min-w-96 w-3/12 bg-card shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="p-8">
                        <div className="pb-8">
                            <div className="pb-4 tracking-tight font-bold font text-5xl text-center">
                                Phần mềm quản lý Tour
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Được xây dựng bởi
                                <a
                                    href="https://www.facebook.com/huydz24"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Huy ng
                                </a>
                            </div>
                        </div>
                        <div className="pb-4">
                            <div className="pb-4 space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <input
                                    className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 mt-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    type="email"
                                    placeholder="your@gmail.com"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    onBlur={() => setIsvalid(true)}
                                />
                                <p
                                    className="text-sm text-red-500"
                                    style={{ visibility: isValid ? 'hidden' : 'visible' }}
                                >
                                    Email không đúng định dạng
                                </p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Password
                                    </label>
                                    <a href="/forgot" className="text-sm text-blue-600 hover:underline">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <input
                                    className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 mt-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p
                                    className="text-sm text-red-500 mt-1"
                                    style={{ visibility: isEmpty ? 'visible' : 'hidden' }}
                                >
                                    {error}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <Button type="submit" dark classNames="w-full">
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
