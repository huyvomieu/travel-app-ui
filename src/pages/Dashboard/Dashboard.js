import { useEffect, useState } from 'react';
import { CalendarDays, CreditCard, DollarSign, Map, Users } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs/Tabs';
import { useLoading } from '../../components/context/LoadingContext';
import { getReportDashboard } from '../../services/ReportService';
import { Overview } from '../../components/Overview/Overview';
import { RecentSales } from '../../components/RecentSale/RecentSale';

function Dashboard() {
    const [reports, setReports] = useState({});

    const { setLoading } = useLoading();
    const now = new Date();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getReportDashboard();
                setReports(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="flex flex-col gap-4">
            <div className="font-bold">Thống kê kinh doanh trong ngày</div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Tổng doanh thu (VND)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reports.revenue?.toLocaleString('vi-VN')}VND</div>
                        <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Tổng lượt Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reports?.bookings}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Tour mới</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reports?.tours}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Số người truy cập mới</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reports?.customers}</div>
                    </CardContent>
                </Card>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="analytics">Phân tích</TabsTrigger>
                    <TabsTrigger value="reports">Báo cáo</TabsTrigger>
                    <TabsTrigger value="notification">Thông báo </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Tổng quan doanh thu</CardTitle>
                                <CardDescription>
                                    Doanh thu tháng {now.getMonth() + 1} năm {now.getFullYear()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Đơn hàng gần đây</CardTitle>
                                <CardDescription>
                                    Có <span className="text-red-500">999</span> đơn đã hoàn thành trong tháng này
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <RecentSales />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Upcoming Tours</CardTitle>
                                <CardDescription>Tours starting in the next 7 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-muted">
                                                <Map className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-base font-medium leading-none">
                                                    Mountain Explorer Tour
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Starting in {i} day{i > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium">12 guests</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Recent Activities</CardTitle>
                                <CardDescription>Latest system activities</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { text: 'New tour created', time: '2 hours ago' },
                                        { text: 'User John Doe updated profile', time: '5 hours ago' },
                                        { text: 'New booking #1234', time: 'Yesterday' },
                                    ].map((activity, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <div className="space-y-1">
                                                <p className="text-base font-medium leading-none">{activity.text}</p>
                                                <p className="text-sm text-muted-foreground">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle>Calendar</CardTitle>
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { date: 'Apr 15', event: 'Team Meeting' },
                                        { date: 'Apr 18', event: 'New Tour Launch' },
                                        { date: 'Apr 22', event: 'Marketing Campaign' },
                                    ].map((event, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-22 text-center">
                                                <p className="text-base font-medium">{event.date}</p>
                                            </div>
                                            <div className="flex-1 border-l pl-4">
                                                <p className="text-base font-medium">{event.event}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Phân tích</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="reports" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Báo cáo</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notification" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông báo</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2"></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Dashboard;
