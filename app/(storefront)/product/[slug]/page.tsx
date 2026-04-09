import { createClient } from "@/utils/supabase/server";
import HtmlPage from "@/components/HtmlPage";
import { notFound } from "next/navigation";
import { htmlContent } from "@/app/templates/shopdetails";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!vehicle) {
    notFound();
  }

  // Inject live vehicle securely into the DOM mapping engine
  return <HtmlPage html={htmlContent} vehicle={vehicle} />;
}
