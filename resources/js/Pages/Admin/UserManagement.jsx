import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function UserManagement({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    document.title = "User Management"; // Set the page title when component is mounted
  }, []);

  const handleDeactivate = async (userId) => {
    try {
        console.log(`Request URL: /admin/user-management/deactivate/${userId}`);
        const response = await axios.post(`/admin/user-management/deactivate/${userId}`);
        
  
      if (response.data.success) {
        alert(response.data.message);
  
        // Update status pengguna di state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, status: response.data.status || "inactive" }
              : user
          )
        );
      } else {
        alert("Failed to deactivate user: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
      alert("Failed to deactivate user. Please try again.");
    }
  };
  
  const handleActivate = async (userId) => {
    try {
      console.log(`Requesting URL: /admin/user-management/activate/${userId}`);
      
      const response = await axios.post(`/admin/user-management/activate/${userId}`);
  
      if (response.data.success) {
        alert(response.data.message);
  
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, status: response.data.status || "active" } 
              : user
          )
        );
      } else {
        alert("Failed to activate user: " + response.data.message);
      }
    } catch (error) {
      console.error("Error activating user:", error);
      alert("Failed to activate user. Please try again.");
    }
  };
  
  
  const handleDelete = async (userId) => {
    try {
        console.log(`Requesting URL: /admin/user-management/delete/${userId}`);
        const response = await axios.post(`/admin/user-management/delete/${userId}`);

        if (response.data.success) {
            alert("User deleted successfully");

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } else {
            alert("Failed to delete user: " + response.data.message);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
    }
  };


  const handleRoleChange = async (userId, role) => {
    try {
      const response = await axios.post(`/admin/user-management/update-role/${userId}`, { role });

      if (response.data.success) {
        alert("User role updated successfully");

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role } : user
          )
        );
      } else {
        alert("Updated user role: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role. Please try again.");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
            {(!users || users.length === 0) ? (
              <div className="text-center py-4 text-gray-500">No User Found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-full table-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Chirps Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.chirps_count}</TableCell>
                        <TableCell>{user.status }</TableCell>
                        <TableCell>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <Button className="w-8 h-8 flex items-center justify-center">
                                ...
                              </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content
                              className="bg-white shadow-md rounded-md p-2"
                              side="right"
                              align="start"
                              sideOffset={5}
                            >
                              {/* Jika status active maka pada dropdown muncul Deactive, tapi jika status inactive maka dropdown muncul Active */}
                              <DropdownMenu.Item
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => user.status === "inactive" ? handleActivate(user.id) : handleDeactivate(user.id)}
                              >
                                {user.status === "inactive" ? "Activate" : "Deactivate"}
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleDelete(user.id)}
                              >
                                Delete
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleRoleChange(user.id, "moderator")}
                              >
                                Make Moderator
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
