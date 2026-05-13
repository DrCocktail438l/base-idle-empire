import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [resources, setResources] = useState(100)
  const [mineLevel, setMineLevel] = useState(1)
  const [farmLevel, setFarmLevel] = useState(0)

  const createEmpire = () => {
    if (username.trim() === '') {
      alert("Please enter an empire name!")
      return
    }
    alert(`🎉 Empire "${username}" has been created on Base!`)
  }

  const claimResources = () => {
    const production = (mineLevel * 12) + (farmLevel * 8)
    const newResources = resources + production
    setResources(newResources)
    alert(`✅ Claimed ${production} Resources!`)
  }

  const upgradeMine = () => {
    const cost = 50 + (mineLevel * 10)
    if (resources >= cost) {
      setResources(resources - cost)
      setMineLevel(mineLevel + 1)
      alert(`⛏️ Mine upgraded to Level ${mineLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeFarm = () => {
    const cost = 80 + (farmLevel * 15)
    if (resources >= cost) {
      setResources(resources - cost)
      setFarmLevel(farmLevel + 1)
      alert(`🌾 Farm upgraded to Level ${farmLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-2">🌍 Base Idle Empire</h1>
        <p className="text-center text-emerald-400 mb-12">On-chain Idle Game on Base</p>

        {/* Empire Creation */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-3xl p-8 mb-10 text-center">
          <h2 className="text-2xl mb-6">Create Your Empire</h2>
          <input
            type="text"
            placeholder="Enter your empire name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-900 border border-gray-600 px-6 py-4 rounded-2xl text-lg w-96 focus:outline-none focus:border-emerald-500"
          />
          <br />
          <button
            onClick={createEmpire}
            className="mt-6 bg-emerald-600 hover:bg-emerald-500 px-10 py-4 rounded-2xl font-bold text-lg transition"
          >
            Start Building Your Empire
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-gray-700">
            <div className="text-5xl mb-3">💎</div>
            <div className="text-4xl font-bold text-emerald-400">{resources}</div>
            <div className="text-gray-400 mt-1">Resources</div>
          </div>
          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-gray-700">
            <div className="text-5xl mb-3">⛏️</div>
            <div className="text-4xl font-bold">Lv.{mineLevel}</div>
            <div className="text-gray-400 mt-1">Mine</div>
          </div>
          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-gray-700">
            <div className="text-5xl mb-3">🌾</div>
            <div className="text-4xl font-bold">Lv.{farmLevel}</div>
            <div className="text-gray-400 mt-1">Farm</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={claimResources}
            className="bg-blue-600 hover:bg-blue-500 px-10 py-5 rounded-2xl font-bold text-xl transition"
          >
            Claim Resources
          </button>
          <button
            onClick={upgradeMine}
            className="bg-orange-600 hover:bg-orange-500 px-8 py-5 rounded-2xl font-bold text-xl transition"
          >
            Upgrade Mine
          </button>
          <button
            onClick={upgradeFarm}
            className="bg-lime-600 hover:bg-lime-500 px-8 py-5 rounded-2xl font-bold text-xl transition"
          >
            Upgrade Farm
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
