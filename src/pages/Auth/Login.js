import Button from '../../components/ui/Button';

function Login() {
    return (
        <div className="flex justify-center items-center bg-gray-50 min-h-screen border rounded-l-xl">
            <div className="min-w-96 w-3/12 bg-card shadow-sm">
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
                    <div className="pb-8">
                        <div className="pb-8 space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </label>
                            <input
                                className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 mt-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                type="email"
                                placeholder="your@gmail.com"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Password
                                </label>
                                <a href="/" className="text-sm text-blue-600 hover:underline">
                                    Quên mật khẩu
                                </a>
                            </div>
                            <input
                                className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 mt-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <Button dark classNames="w-full">
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
