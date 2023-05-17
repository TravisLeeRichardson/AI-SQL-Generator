import MessagesDisplay  from "./components/MessagesDisplay";
import CodeDisplay from "./components/CodeDisplay";
import {useState} from "react"

interface ChatData {
    role: string,
    content: string
}


const App = () => {

    const [value, setValue] = useState<string>("")

    //the ,ChatData[]> syntax makes sure that only objects with that interface can go into state.
    const [chat, setChat] = useState<ChatData[]>([])
    const getQuery = async() => {
        try {
            const options: RequestInit = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: value
                })
            }
            const response = await fetch("http://localhost:8000/completions", options)
            const data: ChatData = await response.json()
            console.log(data)

            //construct just like the response from openAI
            const userMessage = {
                role: "user",
                content: value
            }
            setChat(oldChat => [...oldChat, data, userMessage]) //get old chat data and add to it
        }
        catch (err) {
            console.log(err);
        }
    }

    const clearChat = () => {
        setValue("")
        setChat([])
    }

    // filter all messages coming from the user and filter out the assistant messages.
    const filteredUserMessages = chat.filter(message => message.role === "user")

    //filter each message based off the very LAST message that has come back. (pop does this)
    const latestCode = chat.filter(message => message.role ==="assistant").pop()

  return (
    <div className="App">
      <MessagesDisplay userMessages={filteredUserMessages}/>
      <input value = {value} onChange={e => setValue(e.target.value)}/>
      <CodeDisplay text={latestCode?.content || ""}/> {/*the ? checks if it exists first */}
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>Get Query!</button>
        <button id="clear-chat" onClick={clearChat}>Clear Chat</button>
      </div>
    </div>
  )
}

export default App;
