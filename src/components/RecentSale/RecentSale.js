import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar/Avatar';

export function RecentSales() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-base font-medium leading-none">Jackson Lee</p>
                    <p className="text-base text-muted-foreground">jackson.lee@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-base font-medium leading-none">Sophia Davis</p>
                    <p className="text-base text-muted-foreground">sophia.davis@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$1,499.00</div>
            </div>
        </div>
    );
}
