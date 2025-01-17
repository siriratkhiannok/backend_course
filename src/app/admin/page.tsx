import AdminGuard from "@/services/components/AdminGuard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <div>Hello</div>
    </AdminGuard>
  );
}
