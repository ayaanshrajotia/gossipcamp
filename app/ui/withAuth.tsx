// withAuth.tsx
import { RootState } from "@/lib/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function withAuth(Component: any) {
    return function WithAuth(props: any) {
        const { user } = useSelector((state: RootState) => state.user);

        useEffect(() => {
            if (!user) {
                redirect("/login");
            }
        }, [user]);

        // Always render the component on the server-side
        return <Component {...props} />;
    };
}
