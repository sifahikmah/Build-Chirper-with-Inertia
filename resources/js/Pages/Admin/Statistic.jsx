import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Card from "@/components/ui/card";  // hanya impor Card

export default function Statistics({ activeUsers, chirpsCount, violationReports }) {
    const [filter, setFilter] = useState("daily");

    // Mengambil query 'time' dari URL untuk menyesuaikan filter
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const time = urlParams.get("time");
        if (time) {
            setFilter(time);
        }
    }, []);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        window.location.href = `/admin/statistics?time=${newFilter}`;  // Ubah 'filter' menjadi 'time'
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1 className="text-2xl font-bold">Statistic & Activity</h1>
                    </div>
                </header>
                <div className="p-6 space-y-6">
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => handleFilterChange("daily")}
                            className={filter === "daily" ? "bg-blue-950 text-white" : "bg-gray-400 hover:bg-gray-300"}

                        >
                            Daily
                        </Button>
                        <Button
                            onClick={() => handleFilterChange("weekly")}
                            className={filter === "weekly" ? "bg-blue-950 text-white" : "bg-gray-400 hover:bg-gray-300"}
                        >
                            Weekly
                        </Button>
                        <Button
                            onClick={() => handleFilterChange("monthly")}
                            className={filter === "monthly" ? "bg-blue-950 text-white" : "bg-gray-400 hover:bg-gray-300"}
                        >
                            Monthly
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">Active Users</h2>
                                <p className="text-4xl font-bold">{activeUsers}</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">Chirps Posted</h2>
                                <p className="text-4xl font-bold">{chirpsCount}</p>
                            </div>
                        </Card>
                        <Card>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">Violation Reports</h2>
                                <p className="text-4xl font-bold">{violationReports}</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
