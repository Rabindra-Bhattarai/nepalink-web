"use client";
import { useEffect, useState } from "react";
import { fetchCareFeed } from "@/lib/api/member";

export default function CardFeed({ bookingId }: { bookingId: string }) {
  const [feed, setFeed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCareFeed(bookingId);
        setFeed(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    load();
  }, [bookingId]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ul>
      {feed.map((f) => (
        <li key={f._id}>{f.activity} - {f.timestamp}</li>
      ))}
    </ul>
  );
}
