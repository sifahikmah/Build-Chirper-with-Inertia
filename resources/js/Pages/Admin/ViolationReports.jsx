import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function ViolationReports() {
  // Data dummy
  const reports = [
    {
      id: 1,
      reporter: 'Louis',
      reportedContent: 'Suspected spam message',
      reason: 'Spam',
      date: '2025-01-18',
    },
    {
      id: 2,
      reporter: 'Olivia',
      reportedContent: 'Offensive language',
      reason: 'Harassment',
      date: '2025-01-20',
    },
  ];

  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-2xl font-bold">Violation Reports</h1>
                </div>
            </header>
            <div className="p-4">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reported Content</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {reports.map((report) => (
                    <TableRow key={report.id}>
                    <TableCell>{report.reporter}</TableCell>
                    <TableCell>{report.reportedContent}</TableCell>
                    <TableCell>{report.reason}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
