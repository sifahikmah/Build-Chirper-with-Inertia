export default function AdminAuthenticatedLayout({ header, children }) {
      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>

            {header && (
                // <header className="bg-white shadow">
                //     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                //         {header}
                //     </div>
                // </header>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
  
            )}

            <div className="flex flex-1 flex-col gap-4 p-4">
                {children}
            </div>

          </SidebarInset>
        </SidebarProvider>
      );
}