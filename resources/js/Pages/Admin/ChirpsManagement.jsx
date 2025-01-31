import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function ChirpsManagement({ chirps: initialChirps }) {
  const [chirps, setChirps] = useState(initialChirps);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    document.title = "Chirps Management";
  }, []);

  const handleDelete = async (chirpId) => {
    try {
      const response = await axios.post(`/admin/chirps-management/delete/${chirpId}`);
      if (response.data.success) {
        alert(response.data.message);
        setChirps((prevChirps) => prevChirps.filter((chirp) => chirp.id !== chirpId));
      }
    } catch (error) {
      console.error("Error deleting chirp:", error);
      alert("Failed to delete chirp.");
    }
  };

  const handleMarkForReview = async (chirpId) => {
    try {
      const response = await axios.post(`/admin/chirps-management/mark/${chirpId}`);
      if (response.data.success) {
        alert(response.data.message);
        setChirps((prevChirps) =>
          prevChirps.map((chirp) =>
            chirp.id === chirpId ? { ...chirp, status: "review" } : chirp
          )
        );
      }
    } catch (error) {
      console.error("Error marking chirp for review:", error);
      alert("Failed to mark chirp for review.");
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
            <h1 className="text-2xl font-bold">Chirps Management</h1>
          </div>
        </header>
        <div className="p-4">
          <div className="min-h-[100vh] rounded-xl bg-muted/50 p-4">
            {(!chirps || chirps.length === 0) ? (
              <div className="text-center py-4 text-gray-500">No Chirps Found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-full table-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chirps.map((chirp) => (
                      <TableRow key={chirp.id}>
                        <TableCell>{chirp.user.name}</TableCell>
                        <TableCell>
                          <div dangerouslySetInnerHTML={{ __html: chirp.message }} />
                          {chirp.photo && (
                            <div className="mt-2">
                              <img 
                                src={`/storage/${chirp.photo}`} 
                                alt="Uploaded" 
                                className="max-w-[200px] max-h-[200px] object-cover rounded-md cursor-pointer"
                                onClick={() => setSelectedImage(`/storage/${chirp.photo}`)}
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{new Date(chirp.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <Button className="w-8 h-8 flex items-center justify-center">...</Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content className="bg-white shadow-md rounded-md p-2" side="right" align="start" sideOffset={5}>
                              <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDelete(chirp.id)}>
                                Delete
                              </DropdownMenu.Item>
                              <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMarkForReview(chirp.id)}>
                                Mark for Review
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
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
          <div className="relative">
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-[90%] max-h-[90%] object-contain"
            />
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-black rounded-full p-2"
            >
              X
            </button>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
