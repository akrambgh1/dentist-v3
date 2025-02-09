import Sidebar from "./Sidebar"
import { Search } from "lucide-react"

export default function SearchPage() {
  return (
    <>
    <section className="flex min-h-screen h-auto">
        <Sidebar></Sidebar>
        <section className="h-[100vh] flex-1 overflow-y-scroll">
            <div className="w-full p-8 pl-[3rem] flex justify-center">
                <div className="flex items-center border-[#eee] border-[1px] w-[40%] py-2 pl-[.5rem] pr-[1rem] rounded-[15px] gap-[1rem] ">
                    <Search/>
                    <input type="text" className="outline-none w-full"/>
                </div>
            </div>
        </section>
    </section>
    </>
  )
}
