import Sidebar from "../components/Sidebar";
import List from "../components/chat-components/list/list";
import Chat from "../components/chat-components/chat/chat";

import Detail from "../components/chat-components/detail";
import Nav from "../components/navbar";
export default function Inbox() {
    return (<>
        <Nav/>
        <section className="flex">
            <div className="w-auto">
                <Sidebar></Sidebar>
            </div>
            <div className="flex justify-center items-center w-full">
                <List/>
                <Chat/>
                <Detail/>
            </div>
        </section>
        
    </>)
}