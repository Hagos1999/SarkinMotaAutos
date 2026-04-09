import { redirect } from "next/navigation";

export default function VehiclesRedirect() {
  // We manage vehicles directly on the main admin dashboard now.
  redirect("/admin");
}
