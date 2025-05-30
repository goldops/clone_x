'use client'
import React from "react";
import useSWR from 'swr'

type TweetProps = {
  tweet: string;
  username: string;
  tag: string;
  likes: number;
  comments: number;
  reshares: number;
  date: string;
}

const Tweet: React.FC<TweetProps> = (props) => {

  const { tweet, username, tag, likes, comments, reshares, date } = props;

  return (
    <div
      key="1"
      className="w-[500px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl m-3"
      >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <span className="object-cover md:w-48 rounded-md bg-muted w-[192px] h-[192px]" />
        </div>
        <div className="p-8 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-[40px] h-[40px] bg-slate-300 rounded-full"></div>
              <div className="ml-4">
                <div className="capitalize tracking-wide text-sm text-black font-semibold">
                  {username}
                </div>
                <div className="text-gray-400">{tag}</div>
              </div>
            </div>
            <svg
              className=" h-6 w-6 text-blue-500 fill-current"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </div>
          <p className="mt-4 text-gray-500">
            {tweet}
          </p>
          <div className="flex mt-6 justify-between items-center">
            <div className="flex space-x-4 text-gray-400">
              <div className="flex items-center">
                <svg
                  className=" h-6 w-6 text-red-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="ml-1 text-red-500">{likes}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className=" h-6 w-6 text-green-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
                <span className="ml-1 text-green-500">{comments}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className=" h-6 w-6 text-blue-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m17 2 4 4-4 4" />
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                  <path d="m7 22-4-4 4-4" />
                  <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                </svg>
                <span className="ml-1 text-blue-500">{reshares}</span>
              </div>
            </div>
            <div className="text-gray-400">{date}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {

  const tweetsQuery = useSWR<TweetProps[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets?content=`, (url: string) => fetch(url).then(res => res.json()));
  
  const tweets = tweetsQuery.data;
  const isLoading = tweetsQuery.isLoading;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tweets !== undefined && tweets.length > 0
      ? <div className="flex flex-col gap-y-5">
          <p className="text-xl font-semibold text-black text-center">Derniers Tweets</p>
          {tweets.map((x, i) => (
            <Tweet key={i} {...x} />
          ))}
        </div>
      : isLoading
        ? <p className="text-blue-500 text-3xl font-semibold animate-pulse">Chargement en cours...</p>
        : <p className="text-red-500 text-3xl font-semibold">Une erreur est survenue.</p>}
    </main>
  )
}
