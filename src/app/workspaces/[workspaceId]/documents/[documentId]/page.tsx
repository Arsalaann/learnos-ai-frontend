import DocumentHeader from "@/features/documents/components/document-header";
import DocumentChat from "@/features/documents/components/document-chat";

export default function DocumentPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DocumentHeader />

      <main className="flex flex-1 flex-col items-start ml-4 max-w-3xl">
        <DocumentChat />
      </main>
    </div>
  );
}
