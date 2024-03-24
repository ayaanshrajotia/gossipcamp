export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-[1130px]:max-w-[1200px] relative flex gap-2 max-w-[900px] w-full mx-auto">
            {children}
        </div>
    );
}
