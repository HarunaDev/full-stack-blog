/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import api from "../api"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'


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
        .get("/api/articles/")
        .then((res) => res.data)
        .then((data) => {setArticle(data); console.log(data)})
        .catch((err) => alert(err));
    }

    // function to delete an article
    const deleteArticle = (id) => {
        // make api call to that path
        api.delete(`/api/articles/delete/${id}/`)
        .then((res) => {
            // if status was successful or not
            if (res.status === 204) alert("Article deleted")
            else alert("Failed to delete")
        }).catch((err) => alert(err))
        getArticles()
    }

    // function to create an article
    const createArticle = (e) => {
        e.preventDefault()
        api.post("/api/articles/", { content, title })
        .then((res) => {
            if (res.status === 201) alert("Article has been created")
            else alert("Failed to create article")
        })
        .catch((err) => alert(err))
        getArticles()
    }

    return (
        <>
        <h1>Welcome to home</h1>

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form className="max-w-xl mx-auto p-6 space-y-8 bg-white shadow-md rounded-lg">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium leading-6 text-gray-900">Create Articles</h2>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  Enter title
                </span>
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="flex-1 block w-full min-w-0 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter Title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Write a few sentences about anything."
                  required
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Create wonderful articles.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" className="bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          SUBMIT
        </button>
      </div>
    </form>
        </div>
        </>

    )
}

export default Home