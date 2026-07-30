import type { story } from "../types"

function StoryChose({data}:{data:story}) {
  return (
    <div className="bg-[#121212] rounded-xl border border-white w-[90%] py-2 flex justify-center items-center hover:bg-[#360000] transition cursor-pointer
    
    ">
        {data.title}
    </div>
  )
}

export default StoryChose