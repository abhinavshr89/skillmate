import Link from 'next/link'
import React from 'react'

function InterviewPage() {
  return (
    <div>
      <Link href="/interview/mock">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Start Mock Interview  
        </button>
      </Link>
    </div>
  )
}

export default InterviewPage