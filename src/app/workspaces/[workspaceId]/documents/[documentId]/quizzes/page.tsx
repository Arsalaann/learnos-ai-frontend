import DocumentHeader from "@/features/documents/components/document-header";
import QuizzesContainer from "@/features/document-artifacts/components/quizzes-container";

export default function QuizzesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DocumentHeader />

      <main className="ml-4 flex max-w-3xl flex-1 flex-col items-start">
        <QuizzesContainer />
      </main>
    </div>
  );
}
