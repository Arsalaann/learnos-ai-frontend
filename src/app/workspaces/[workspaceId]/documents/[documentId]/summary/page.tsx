import DocumentHeader from "@/features/documents/components/document-header";
import SummaryHome from "@/features/document-artifacts/components/summary-home";

export default function SummaryPage() {
  return (
    <div className="flex flex-1 flex-col h-screen gap-6">
      <DocumentHeader />
      <SummaryHome />
    </div>
  );
}
