"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmDialog from "@/components/dialogs/confirm-dialog";

import { useDeleteWorkspaceController } from "../hooks/use-delete-workspace-controller";

export default function DeleteWorkspaceDialog({
  workspaceId,
}: {
  workspaceId: number;
}) {
  const { open, setOpen, onDelete, deleteWorkspaceMutation } =
    useDeleteWorkspaceController({
      workspaceId,
    });

  return (
    <>
      <Button
        variant="secondary"
        className={"absolute right-4 bottom-4 text-ring hover:text-ring"}
        onClick={() => setOpen(true)}
      >
        <Trash />
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Workspace"
        description="This action cannot be undone. All documents and conversations inside this workspace will be permanently deleted."
        actionLabel="Delete Workspace"
        loading={deleteWorkspaceMutation.isPending}
        onConfirm={onDelete}
      />
    </>
  );
}
// "use client";

// import { LoaderCircle, Trash } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useDeleteWorkspaceController } from "../hooks/use-delete-workspace-controller";

// export default function DeleteWorkspaceDialog({
//   workspaceId,
// }: {
//   workspaceId: number;
// }) {
//   const { open, setOpen, onDelete, deleteWorkspaceMutation } =
//     useDeleteWorkspaceController({ workspaceId });

//   const handleDeleteClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     e.preventDefault();
//     onDelete();
//   };

//   const handleOpenChange = (isOpen: boolean, eventDetails: any) => {
//     if (!isOpen) {
//       if (eventDetails?.cancel) {
//         eventDetails.cancel();
//       }
//       setOpen(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogTrigger
//         render={(props) => (
//           <Button
//             {...props}
//             variant="outline"
//             onClick={(e) => {
//               e.stopPropagation();
//               e.preventDefault();
//               setOpen(true);
//               props.onClick?.(e);
//             }}
//             className={"text-ring hover:text-ring"}
//           >
//             <Trash />
//           </Button>
//         )}
//       />

//       <DialogContent
//         onClick={(e) => {
//           e.stopPropagation();
//           e.preventDefault();
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle>Delete Workspace</DialogTitle>
//           <DialogDescription>
//             This action cannot be undone. All documents and conversations inside
//             this workspace will be permanently deleted.
//           </DialogDescription>
//         </DialogHeader>

//         <DialogFooter>
//           <Button
//             variant="outline"
//             onClick={(e) => {
//               e.stopPropagation();
//               setOpen(false);
//             }}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="destructive"
//             onClick={handleDeleteClick}
//             disabled={deleteWorkspaceMutation.isPending}
//           >
//             {deleteWorkspaceMutation.isPending && (
//               <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             Delete Workspace
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
