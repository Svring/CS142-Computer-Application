'use client'

import { useState } from 'react'
import { User, LogIn, Image as ImageIcon, MessageCircle, Home } from 'lucide-react'

interface Comment {
  id: number
  username: string
  content: string
  date: string
}

interface Photo {
  id: number
  url: string
  caption: string
  comments: Comment[]
}

interface UserData {
  id: number
  name: string
  avatar: string
  photos: Photo[]
}

const users: UserData[] = [
  {
    id: 1,
    name: 'Alice',
    avatar: '/placeholder.svg?height=40&width=40',
    photos: [
      { 
        id: 1, 
        url: '/placeholder.svg?height=300&width=300', 
        caption: 'Beautiful sunset', 
        comments: [
          { id: 1, username: 'Bob', content: 'Lovely!', date: '2023-06-01' },
          { id: 2, username: 'Charlie', content: 'Great shot!', date: '2023-06-02' },
          { id: 3, username: 'David', content: 'Amazing colors!', date: '2023-06-03' },
          { id: 4, username: 'Eve', content: 'Where was this taken?', date: '2023-06-04' },
          { id: 5, username: 'Frank', content: 'I wish I was there!', date: '2023-06-05' },
          { id: 6, username: 'Grace', content: 'Stunning view!', date: '2023-06-06' },
        ]
      },
      { 
        id: 2, 
        url: '/placeholder.svg?height=300&width=300', 
        caption: 'City lights', 
        comments: [
          { id: 7, username: 'Henry', content: 'Amazing view!', date: '2023-06-07' },
          { id: 8, username: 'Ivy', content: 'I love night photography!', date: '2023-06-08' },
        ]
      },
    ]
  },
  {
    id: 2,
    name: 'Bob',
    avatar: '/placeholder.svg?height=40&width=40',
    photos: [
      { 
        id: 3, 
        url: '/placeholder.svg?height=300&width=300', 
        caption: 'Mountain hike', 
        comments: [
          { id: 9, username: 'Jack', content: 'Breathtaking!', date: '2023-06-09' },
          { id: 10, username: 'Kate', content: 'Where is this?', date: '2023-06-10' },
          { id: 11, username: 'Liam', content: 'I need to go there!', date: '2023-06-11' },
        ]
      },
    ]
  },
  {
    id: 3,
    name: 'Charlie',
    avatar: '/placeholder.svg?height=40&width=40',
    photos: [
      { 
        id: 4, 
        url: '/placeholder.svg?height=300&width=300', 
        caption: 'Beach day', 
        comments: [
          { id: 12, username: 'Mia', content: 'Wish I was there!', date: '2023-06-12' },
          { id: 13, username: 'Noah', content: 'Looks relaxing', date: '2023-06-13' },
          { id: 14, username: 'Olivia', content: 'Perfect weather!', date: '2023-06-14' },
        ]
      },
    ]
  },
]

type Page = 'login' | 'details' | 'userGallery'

export function PhotoShareComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [currentPage, setCurrentPage] = useState<Page>('login')

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('details')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setSelectedUser(null)
    setCurrentPage('login')
  }

  const handleUserClick = (user: UserData) => {
    if (isLoggedIn) {
      setSelectedUser(user)
      setCurrentPage('userGallery')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/12 bg-gray-800 p-4 flex flex-col justify-between items-center">
        <div className="space-y-4">
          {users.map(user => (
            <button
              key={user.id}
              className={`rounded-full overflow-hidden ${selectedUser?.id === user.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              </div>
            </button>
          ))}
        </div>
        {isLoggedIn && (
          <button
            onClick={() => setCurrentPage('details')}
            className="text-white hover:text-blue-400 transition-colors duration-200"
          >
            <Home size={24} />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-900 text-white">
        {currentPage === 'login' && (
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-2 border rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-2 border rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <div className="flex justify-between text-sm">
                  <a href="#" className="text-blue-400 hover:text-blue-300">Register</a>
                  <a href="#" className="text-blue-400 hover:text-blue-300">Forgot Password?</a>
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'details' && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
              WELCOME TO SHARING!
            </h1>
            <p className="text-xl mb-8">Explore and share your favorite moments with friends.</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}

        {currentPage === 'userGallery' && selectedUser && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedUser.name}'s Photos</h2>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedUser.photos.map(photo => (
                <div key={photo.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
                  <img src={photo.url} alt={photo.caption} className="w-full h-64 object-cover" />
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <p className="text-lg font-semibold mb-2">{photo.caption}</p>
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">Comments</h3>
                      <div className="space-y-2 masonry-container">
                        {photo.comments.slice(0, 5).map((comment) => (
                          <div key={comment.id} className="bg-gray-700 p-3 rounded-lg break-inside-avoid">
                            <p className="text-sm text-gray-300">{comment.content}</p>
                            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                              <span>{comment.username}</span>
                              <span>{comment.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {photo.comments.length > 5 && (
                        <p className="text-sm text-gray-400 italic mt-2">
                          +{photo.comments.length - 5} more comments
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}