import SummaryContainer from "@/features/document-artifacts/components/summary-container";
import DocumentHeader from "@/features/documents/components/document-header";

export default function SummaryPage() {
  return (
    <div className="flex h-full flex-col">
      <DocumentHeader />

      <main className="flex flex-1 flex-col items-start ml-4 max-w-3xl">
        <SummaryContainer />
      </main>
    </div>
  );
}
