import { exampleAction } from "@/lib/actions/example-actions";
import {notFound} from "next/navigation";

export default async function Page() {
    const result = await exampleAction();

    if (!result.success) {
        throw new Error("Failed to load data");
    }

    if (result.data === null) {
        notFound();
    }

    return (
        <div>
            <h1>Server Boundary Example</h1>
        </div>
    );
}