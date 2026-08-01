"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Conversation } from "@/features/conversations/types/conversation";

interface ConversationSidebarMenuProps {
  conversation: Conversation;

  onDelete: (conversation: Conversation) => void;
  onRename: () => void;
}

export default function ConversationSidebarMenu({
  conversation,
  onDelete,
  onRename,
}: ConversationSidebarMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <Button
            {...props}
            variant="ghost"
            size="icon"
            className="mr-1 h-8 w-8 text-ring hover:bg-transparent dark:hover:bg-transparent"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              props.onClick?.(event);
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      />

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRename();
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            onDelete(conversation);
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
