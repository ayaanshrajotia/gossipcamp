export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex gap-2 max-w-[900px] w-full mx-auto">
            {children}
        </div>
    );
}
