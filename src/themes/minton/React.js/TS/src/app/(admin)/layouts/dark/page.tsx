
import {useEffect} from "react";
import Dashboard from "@/app/(admin)/dashboard/analytics/page"
import {useLayoutContext} from "@/context/useLayoutContext";

const Page = () => {

    const {changeTheme} = useLayoutContext()

    useEffect(() => {
        changeTheme('dark')
    }, [])

    return (
        <Dashboard/>
    )
}

export default Page