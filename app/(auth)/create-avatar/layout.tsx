function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-6 flex min-[800px]:items-center justify-center min-h-screen">
            {children}
        </div>
    );
}

export default layout;
