'use client'

import { useState, useEffect } from 'react'
import { LogIn, Image as ImageIcon, MessageCircle, Home } from 'lucide-react'
import { users, UserData } from '../model/data' // Import from the new data file

import Photo from '../model/photo'
import SchemaInfo from '../model/schemaInfo'
import User from '../model/user'

type Page = 'login' | 'details' | 'userGallery'

export function PhotoShareComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [currentPage, setCurrentPage] = useState<Page>('login')

  const [user, setUser] = useState<typeof User[] | null>(null)
  const [photo, setPhoto] = useState<typeof Photo[] | null>(null)
  const [schemaInfo, setSchemaInfo] = useState<typeof SchemaInfo[] | null>(null)

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

  // useEffect(() => {
  //   const fetchResources = async () => {
  //     try {
  //       const response = await fetch('/api/user');
  //       const result = await response.json();
  //       if (result.success) {
  //         setUser(result.data);
  //         console.log(result.data)
  //       } else {
  //         console.log(result.message)
  //       }
  //     } catch (err: any) {
  //       console.log(err)
  //     }
  //   };

  //   fetchResources();
  // }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-gray-800 p-4 flex flex-col justify-between items-center">
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