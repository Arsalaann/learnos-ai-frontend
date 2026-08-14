import QuizzesHome from "@/features/document-artifacts/components/quizzes-home";
import DocumentHeader from "@/features/documents/components/document-header";

export default function QuizzesPage() {
  return (
    <div className="flex flex-1 flex-col h-screen gap-6">
      <DocumentHeader />
      <QuizzesHome />
    </div>
  );
}
