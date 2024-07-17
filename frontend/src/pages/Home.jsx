/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import api from "../api"

function Home(){
    // send auth request to get all the articles written, store it in an array with useState
    const [article, setArticle] = useState([]);

    // store content from form for creating new article in useState
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    // put call getArticles inside of a useEffect hook
    useEffect(() => {
        getArticles()
    }, [])

    // function to get articles
    const getArticles = () => {
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {setArticle(data); console.log(data)})
        .catch((err) => alert(err));
    }

    return (
        <>
            <h1>Welcome to home</h1>            
        </>
    )
}

export default Home