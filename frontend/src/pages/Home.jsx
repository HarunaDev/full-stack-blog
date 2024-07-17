/* eslint-disable no-unused-vars */
import { useState } from "react"
import api from "../api"

function Home(){
    // send auth request to get all the articles written, store it in an array with useState
    const [article, setArticle] = useState([]);

    // store content from form for creating new article in useState
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    // function to get articles
    const getArticles = () => {
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => setArticle(data))
    }

    return (
        <>
            <h1>Welcome to home</h1>            
        </>
    )
}

export default Home