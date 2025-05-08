

// components
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Chat from "./index";

// ChatApp
const ChatApp = () => {

    return (
        <>
            <PageBreadcrumb
                breadCrumbItems={[
                    { label: "Apps", path: "/apps/chat" },
                    { label: "Chat", path: "/apps/chat", active: true },
                ]}
                title={"Chat"}
            />

            <Chat />

        </>
    );
};

export default ChatApp;
