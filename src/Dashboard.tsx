import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "./utils";

function Dashboard() {

    const navigator = useNavigate()

    useEffect(() => {
        async function check() {
            if (!await isAdmin()) {
                console.log("FF")
                navigator("/login")
            }
        }
        check()
    }, [])
    return (
        <div>Dashboard</div>
    );
}

export default Dashboard;
