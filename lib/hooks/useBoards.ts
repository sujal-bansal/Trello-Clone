import { boardDataService } from "../services";
import { useUser } from "@clerk/nextjs";
import { Board } from "../supabase/models";
import { useState } from "react";

export function useBoards() {
  async function createBoard(boardData: {
    title: string;
    description?: string;
    color?: string;
  }) {
    const { user } = useUser();
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>();

    if (!user) throw new Error("User Not Authenticated");
    const board = await boardDataService.createBoardWithDefaultColumns({
      ...boardData,
      userId: user.id,
    });
  }

  return { createBoard };
}
