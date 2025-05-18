import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs/Tabs';
import { useLoading } from '../../components/context/LoadingContext';
import { getReportDashboard } from '../../services/ReportService';

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
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="notification">Notification</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng quan doanh thu</CardTitle>
                            <CardDescription>
                                Doanh thu tháng {now.getMonth() + 1} năm {now.getFullYear()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng quan doanh thu</CardTitle>
                            <CardDescription>
                                Doanh thu tháng {now.getMonth() + 1} năm {now.getFullYear()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="reports" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng quan doanh thu</CardTitle>
                            <CardDescription>
                                Doanh thu tháng {now.getMonth() + 1} năm {now.getFullYear()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notification" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng quan doanh thu</CardTitle>
                            <CardDescription>
                                Doanh thu tháng {now.getMonth() + 1} năm {now.getFullYear()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2"></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Dashboard;
