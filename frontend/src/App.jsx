import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [resources, setResources] = useState(100)
  const [mineLevel, setMineLevel] = useState(1)

  const createEmpire = () => {
    if (username.trim() === '') return alert("Please enter a username!")
    alert(`Empire created for ${username}! Welcome to Base Idle Empire!`)
  }

  const claimResources = () => {
    const newRes = resources + (mineLevel * 10)
    setResources(newRes)
    alert(`+${mineLevel * 10} Resources Claimed!`)
  }

  const upgradeMine = () => {
    if (resources >= 50) {
      setResources(resources - 50)
      setMineLevel(mineLevel + 1)
      alert("Mine upgraded successfully!")
    } else {
      alert("Not enough resources!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2">🌍 Base Idle Empire</h1>
        <p className="text-center text-gray-400 mb-10">Build • Grow • Dominate on Base</p>

        {/* Create Empire */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8 text-center">
          <h2 className="text-2xl mb-4">Create Your Empire</h2>
          <input
            type="text"
            placeholder="Enter your empire name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-700 px-6 py-3 rounded-xl text-lg w-96 focus:outline-none"
          />
          <button
            onClick={createEmpire}
            className="mt-4 bg-green-600 hover:bg-green-500 px-8 py-3 rounded-xl font-bold"
          >
            Start Your Empire
          </button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">💎</div>
            <div className="text-3xl font-bold">{resources}</div>
            <div className="text-gray-400">Resources</div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">⛏️</div>
            <div className="text-3xl font-bold">Level {mineLevel}</div>
            <div className="text-gray-400">Mine</div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">⏰</div>
            <div className="text-xl">Resources grow over time</div>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-10">
          <button
            onClick={claimResources}
            className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-bold text-lg"
          >
            Claim Resources
          </button>
          <button
            onClick={upgradeMine}
            className="bg-purple-600 hover:bg-purple-500 px-10 py-4 rounded-2xl font-bold text-lg"
          >
            Upgrade Mine (50 Resources)
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
