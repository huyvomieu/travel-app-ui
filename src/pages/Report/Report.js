import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs/Tabs';
import { RevenueChart } from '../../components/Charts/RevenueChart';
import { BookingsChart } from '../../components/Charts/BookingChart';
import { CustomerChart } from '../../components/Charts/CustomerChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table/Table';
import { useEffect, useState } from 'react';
import { useLoading } from '../../components/context/LoadingContext';
import { getBookingByMonth, getReportSummary, getRevenueByMonth, getTopTours } from '../../services/ReportService';
export default function Report() {
    const [reports, setReports] = useState({});
    const [revenueByMonth, setRevenueByMonth] = useState([]);
    const [bookingByMonth, setBookingByMonth] = useState([]);
    const [popularTours, setPopularTours] = useState([]);

    const now = new Date();

    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getReportSummary(now.getDate(), now.getMonth() + 1, now.getFullYear());
                const revenuebymonth = await getRevenueByMonth(now.getFullYear(), now.getMonth() + 1);
                setRevenueByMonth(revenuebymonth);
                setReports(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function handleClickBooking() {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getBookingByMonth(now.getFullYear());
                setBookingByMonth(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }
    function handlePopularTours() {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getTopTours();
                setPopularTours(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }

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
                        <p className="text-xs text-muted-foreground">
                            {revenue?.psLastWeek > 0 ? '+' : ''}
                            {revenue?.psLastWeek}% so với tuần trước
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Tổng đơn hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders?.total}</div>
                        <p className="text-xs text-muted-foreground">
                            {orders?.psLastWeek > 0 ? '+' : ''}
                            {orders?.psLastWeek}% so với tuần trước
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Trung bình / đơn hàng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(Number.parseFloat(revenue?.total) / Number.parseFloat(orders?.total)).toLocaleString(
                                'vi-VN',
                            )}
                            VND
                        </div>
                        <p className="text-xs text-muted-foreground">+5.1% so với tuần trước</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Số người truy cập mới</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customers?.total}</div>
                        <p className="text-xs text-muted-foreground">
                            {customers?.psLastWeek > 0 ? '+' : ''}
                            {customers?.psLastWeek}% so với tuần trước
                        </p>
                    </CardContent>
                </Card>
            </div>
            <Tabs defaultValue="revenue" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
                    <TabsTrigger onClick={handleClickBooking} value="bookings">
                        Bookings
                    </TabsTrigger>
                    <TabsTrigger value="customers">Khách hàng</TabsTrigger>
                    <TabsTrigger value="tours" onClick={handlePopularTours}>
                        Tours
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="revenue" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng quan doanh thu</CardTitle>
                            <CardDescription>
                                Doanh thu tháng {now.getMonth() + 1} năm {now.getFullYear()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <RevenueChart data={revenueByMonth} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="bookings" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Số Tour đặt theo tháng</CardTitle>
                            <CardDescription>Tổng quan số Tour đặt trong năm {now.getFullYear()}</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <BookingsChart data={bookingByMonth} />
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
                                Các Tour phổ biến nhất trong tháng {now.getMonth() + 1} năm {now.getFullYear()}
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
                                        <TableRow key={tour.itemId}>
                                            <TableCell className="font-medium">{tour?.itemInfo?.title}</TableCell>
                                            <TableCell>{tour.count}</TableCell>
                                            <TableCell>
                                                {(
                                                    tour.count *
                                                    tour?.itemInfo?.bed *
                                                    tour?.itemInfo?.price
                                                ).toLocaleString('Vi-vi')}
                                                VND
                                            </TableCell>
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
