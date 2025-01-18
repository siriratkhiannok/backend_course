import AdminGuard from "@/services/components/AdminGuard";

export default function Shop() {
  return <AdminGuard>Welcome to my shop</AdminGuard>;
}
