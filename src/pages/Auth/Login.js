import { useRef, useState } from 'react';
import Button from '../../components/ui/Button';
import { postLogin } from '../../services/AuthService';
import { useLoading } from '../../components/context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInValid, setIsInvalid] = useState(false);
    const [isInValidPassword, setIsInValidPassword] = useState(false);
    const [errorMsgEmail, setErrorMsgEmail] = useState('');
    const [errorMsgPassword, setErrorMsgPassword] = useState('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { setLoading } = useLoading();

    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();

    const { login } = useAuth();
    const navigate = useNavigate();
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value === '') {
            setIsInvalid(false);
            setErrorMsgEmail('');
            return;
        }
        const isValid = emailRegex.test(value);
        if (isValid) {
            setIsInvalid(false);
            setErrorMsgEmail('');
        } else {
            setIsInvalid(true);
            setErrorMsgEmail('Email không hợp lệ');
        }
    };
    const handleChangePassword = (e) => {
        if (e.target.value) {
            setIsInValidPassword(false);
            setErrorMsgPassword('');
        }
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var isCheckValid = true;
        if (email === '') {
            setIsInvalid(true);
            setErrorMsgEmail('Vui lòng nhập email!');
            inputEmailRef.current.focus();
            isCheckValid = false;
        }
        if (password === '') {
            setIsInValidPassword(true);
            setErrorMsgPassword('Vui lòng nhập mật khẩu!');
            if (isCheckValid) inputPasswordRef.current.focus();
            isCheckValid = false;
        }
        if (!isCheckValid) return;

        if (!emailRegex.test(email)) {
            setIsInvalid(true);
            setErrorMsgEmail('Email không hợp lệ');
            return;
        }

        const fetchAPI = async () => {
            try {
                setLoading(true);
                const res = await postLogin({ email, password });
                if (res.status === 200) {
                    login(res.data.token);
                    navigate('/');
                } else {
                    // Xử lý khi sai pass hoặc email
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
                            <div className="pb-4 tracking-tight font-bold font text-5xl text-center"></div>
                            <div className="text-sm text-muted-foreground">
                                <span>Được xây dựng bởi </span>
                                <a
                                    href="https://www.facebook.com/huydz24"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Huy ng
                                </a>
                            </div>
                        </div>
                        <div className="pb-4">
                            <div className="pb-4 mb-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <input
                                    ref={inputEmailRef}
                                    className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 mt-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    type="email"
                                    placeholder="your@gmail.com"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    onBlur={() => setIsInvalid(false)}
                                />
                                <p
                                    className="h-2 py-4 text-sm text-red-500"
                                    style={{ visibility: isInValid ? 'visible' : 'hidden' }}
                                >
                                    {errorMsgEmail}
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
                                    ref={inputPasswordRef}
                                    className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 mt-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    type="password"
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                                <p
                                    className="h-2  text-sm text-red-500 mt-1"
                                    style={{ visibility: isInValidPassword ? 'visible' : 'hidden' }}
                                >
                                    {errorMsgPassword}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <Button type="submit" dark classNames="w-full mt-4">
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
