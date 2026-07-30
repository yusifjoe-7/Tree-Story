import { useEffect, useState } from "react"
import type { story } from "../types"
import StoryChose from "../components/storyChose"
import TheStyle from "../components/theStyle"
import { Link } from "react-router-dom"


function Home() {

      const [data, setData] = useState<story[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/stories`);
          console.log(response)
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          setData(result);
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

    

  return (
    <TheStyle>
    <main className={`${data.length >= 4? "min-h-[100vh]": "h-[100vh]"} flex justify-center items-center main-font`}>
      <div className="flex justify-center items-center h-full p-10 w-[70%] font ">
        
        {loading?
        (<div>loading...</div>)
        :
        data.map((item)=>(
          <Link to={`/${item.id}`} className="w-full flex justify-center items-center">
        <StoryChose data={item}/>
        </Link>
      ))}
      </div>
    </main>
    </TheStyle>
  )
}

export default Home