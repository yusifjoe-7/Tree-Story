import { Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { story, StoryNode, StoryOption } from "../types";
import { Link } from "react-router-dom"
import '../style.css'


function Story() {

    const { id } = useParams();


    const [data, setData] = useState<story>();
  const [loading, setLoading] = useState(true);
  const [node, setNode] = useState<StoryNode | undefined>();
  const [options, setOptions] = useState<StoryOption[]>()
  const [routes, setRutes] = useState<string[]>([])

  const push = (node:string | undefined)=>{
    if(node){
      setRutes(prev => [...prev, node])
    }
  }
  const pop =()=>{
    setRutes(prev => prev.slice(0, -1))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/story/${id}`)
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        
        setData(result);
        setNode(result.story)
        
      } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
  }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    setOptions(node?.options)
    push(node?.id)
  },[node])

  function findNode(node: StoryNode, id: string): StoryNode | null {
  if (node.id === id) return node;

  for (const choice of node.options) {
    const result = findNode(choice.nextNode, id);
    if (result) return result;
  }

  return null;
}

  useEffect(()=>{
    if(!data) return
    const newnode = findNode(data?.story, routes[routes.length - 1])
    if (newnode){
      setNode(newnode)
    }
    
  },[routes])

  


  

  return (<div className="flex justify-center items-center h-[100vh]  font">
    <div className="absolute md:top-10 md:left-20 top-7 left-5 flex md:gap-5 gap-3">

     {routes.length > 1 && <span onClick={pop} className="cursor-pointer">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      </span>}

      <Link to={"/"} className="cursor-pointer">
        <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      </Link>
    </div>
  {loading ? (
    <div >loading...</div>
  ) : (
    <div className="flex justify-center items-center md:w-[70%] w-[90%] flex-col gap-5">
      <div className="bg-black text-[#ddd] p-10 rounded-xl border-2 border-[#ddd]">
        {node?.view}
      </div>
    <div className="flex md:gap-10 gap-3 md:flex-row flex-col ">
      {node?.is_winning_node? (<div>you won</div>) : options?.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#360000] border border-[#ddd] rounded-lg p-5 cursor-pointer hover:bg-black transition"
          onClick={()=>setNode(item.nextNode)}
        >
          {item.value}
        </div>
      ))}
      </div>
    </div>
  )}
</div>)
}

export default Story