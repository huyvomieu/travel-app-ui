import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs/Tabs';
import { RevenueChart } from '../../components/Charts/RevenueChart';
import { BookingsChart } from '../../components/Charts/BookingChart';
import { CustomerChart } from '../../components/Charts/CustomerChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table/Table';
import { useEffect, useState } from 'react';
import { useLoading } from '../../components/context/LoadingContext';
import { getReportSummary } from '../../services/ReportService';
export default function Report() {
    const [reports, setReports] = useState({});

    const now = new Date();

    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getReportSummary(now.getDate(), now.getMonth() + 1, now.getFullYear());
                setReports(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log('re-render');

    const { revenue, orders, average, customers } = reports?.data || {};
    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Tổng doanh thu (VND)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{revenue?.total.toLocaleString('vi-VN')}VND</div>
                        <p className="text-xs text-muted-foreground">+{revenue?.psLastWeek}% so với tuần trước</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Tổng đơn hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders?.total}</div>
                        <p className="text-xs text-muted-foreground">+{orders?.psLastWeek}% so với tuần trước</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Trung bình tiền phòng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.100.000VND</div>
                        <p className="text-xs text-muted-foreground">+5.1% so với tuần trước</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Số người truy cập mới</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customers?.total}</div>
                        <p className="text-xs text-muted-foreground">+{customers?.psLastWeek}% so với tuần trước</p>
                    </CardContent>
                </Card>
            </div>
            <Tabs defaultValue="revenue" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="customers">Khách hàng</TabsTrigger>
                    <TabsTrigger value="tours">Tours</TabsTrigger>
                </TabsList>
                <TabsContent value="revenue" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng quan doanh thu</CardTitle>
                            <CardDescription>
                                Doanh thu tháng {now.getMonth()} năm {now.getFullYear()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <RevenueChart />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="bookings" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Xu hướng đặt phòng</CardTitle>
                            <CardDescription>Tổng quan số phòng đặt trong năm {now.getFullYear()}</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <BookingsChart />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="customers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Phân tích độ tuổi khách hàng</CardTitle>
                            <CardDescription>Độ tuổi khách hàng theo nhóm tuổi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CustomerChart />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="tours" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tours Phổ Biến </CardTitle>
                            <CardDescription>
                                Các Tour phổ biến nhất trong tháng {now.getMonth()} năm {now.getFullYear()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tên Tour</TableHead>
                                        <TableHead>Bookings</TableHead>
                                        <TableHead>Tổng Doanh Thu </TableHead>
                                        <TableHead>Rating</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {popularTours.map((tour) => (
                                        <TableRow key={tour.id}>
                                            <TableCell className="font-medium">{tour.name}</TableCell>
                                            <TableCell>{tour.bookings}</TableCell>
                                            <TableCell>${tour.revenue}</TableCell>
                                            <TableCell>{tour.rating}/5</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

const popularTours = [
    {
        id: '1',
        name: 'Mountain Explorer Tour',
        bookings: 245,
        revenue: '318,255.00',
        rating: 4.8,
    },
    {
        id: '2',
        name: 'Coastal Adventure',
        bookings: 189,
        revenue: '169,911.00',
        rating: 4.7,
    },
    {
        id: '3',
        name: 'Wildlife Safari',
        bookings: 156,
        revenue: '233,844.00',
        rating: 4.9,
    },
    {
        id: '4',
        name: 'Historical City Tour',
        bookings: 132,
        revenue: '79,068.00',
        rating: 4.6,
    },
    {
        id: '5',
        name: 'Island Hopping Adventure',
        bookings: 98,
        revenue: '215,502.00',
        rating: 4.8,
    },
];
