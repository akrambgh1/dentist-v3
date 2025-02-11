import Sidebar from "./Sidebar"


export default function Chat() {
  return (
    <>
        <section className="flex min-h-screen h-auto">
            <Sidebar></Sidebar>
            <section className="h-[100dvh] flex-1 py-8 px-[2.5rem] overflow-y-scroll flex flex-col gap-[1rem]">
                <h1 className="text-[1.5rem] pl-[1rem]">Messages / Chats</h1>
                <div className="w-full h-full flex  gap-[1rem]">
                    <div className="w-[20%] h-[90%] bg-[#eee] overflow-y-scroll">

                    </div>

                    <div className="w-full h-[90%] border-[1px] border-[#eee]">

                    </div>
                </div>
            </section>
        </section>
    </>
  )
}
