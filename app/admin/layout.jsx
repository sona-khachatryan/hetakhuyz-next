import AdminClientLayout from "@/components/adminside/adminClientLayout/AdminClientLayout";

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
        <body>
                <AdminClientLayout>
                    {children}
                </AdminClientLayout>
        </body>
        </html>
    );
}
