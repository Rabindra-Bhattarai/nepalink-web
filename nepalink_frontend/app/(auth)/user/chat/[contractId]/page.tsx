"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatWindow from "../ChatWindow";
import { getAuthToken, getUserData } from "@/lib/cookie";
import axiosInstance from "@/lib/api/axios";
import { API } from "@/lib/api/endpoints";

export default function ChatPage() {
  const { contractId } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [nurse, setNurse] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const t = await getAuthToken();
      const user = await getUserData();
      setToken(t);
      setCurrentUserId(user?._id);

      if (contractId && t) {
        const res = await axiosInstance.get(API.CONTRACTS.BY_ID(contractId as string), {
          headers: { Authorization: `Bearer ${t}` },
        });
        const contract = res.data.data;

        // Decide who the receiver is
        if (contract.memberId._id === user?._id) {
          setReceiverId(contract.nurseId._id);
          setNurse(contract.nurseId); // nurse object populated from backend
        } else {
          setReceiverId(contract.memberId._id);
          setNurse(contract.nurseId); // still show nurse at top
        }
      }
    };
    init();
  }, [contractId]);

  if (!token || !currentUserId || !receiverId || !nurse) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="h-screen flex">
      <ChatWindow
        contractId={contractId as string}
        token={token}
        receiverId={receiverId}
        currentUserId={currentUserId}
        nurse={nurse}
      />
    </div>
  );
}
