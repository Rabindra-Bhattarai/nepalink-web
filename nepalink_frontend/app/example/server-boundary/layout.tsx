import { exampleAction } from "@/lib/actions/example-actions";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const result = await exampleAction();

    return (
        <div>
            <h1>Server Boundary Example</h1>
            {result.success ? (
                <p>{result.message}</p>
            ) : (
                <p>Failed to load data.</p>
            )}
            {children}
        </div>
    );
}