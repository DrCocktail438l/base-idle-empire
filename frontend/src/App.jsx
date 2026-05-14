import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [resources, setResources] = useState(100)
  const [mineLevel, setMineLevel] = useState(1)
  const [farmLevel, setFarmLevel] = useState(0)
  const [labLevel, setLabLevel] = useState(0)

  const createEmpire = () => {
    if (username.trim() === '') {
      alert("Please enter an empire name!")
      return
    }
    alert(`🎉 Empire "${username}" successfully created on Base!`)
  }

  const claimResources = () => {
    const production = (mineLevel * 12) + (farmLevel * 8) + (labLevel * 15)
    const newResources = resources + production
    setResources(newResources)
    alert(`✅ You claimed ${production} Resources!`)
  }

  const upgradeMine = () => {
    const cost = 50 + (mineLevel * 15)
    if (resources >= cost) {
      setResources(resources - cost)
      setMineLevel(mineLevel + 1)
      alert(`⛏️ Mine upgraded to Level ${mineLevel + 1}`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeFarm = () => {
    const cost = 80 + (farmLevel * 20)
    if (resources >= cost) {
      setResources(resources - cost)
      setFarmLevel(farmLevel + 1)
      alert(`🌾 Farm upgraded to Level ${farmLevel + 1}`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeLab = () => {
    const cost = 120 + (labLevel * 30)
    if (resources >= cost) {
      setResources(resources - cost)
      setLabLevel(labLevel + 1)
      alert(`🧪 Research Lab upgraded to Level ${labLevel + 1}`)
    } else {
      alert("Not enough resources!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-2">🌍 Base Idle Empire</h1>
        <p className="text-center text-emerald-400 mb-12">On-chain Idle Game • Built on Base</p>

        {/* Empire Name */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-3xl p-8 mb-10 text-center">
          <h2 className="text-2xl mb-6">Create Your Empire</h2>
          <input
            type="text"
            placeholder="Enter empire name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-900 border border-gray-600 px-6 py-4 rounded-2xl text-lg w-96 focus:outline-none focus:border-emerald-500"
          />
          <br />
          <button
            onClick={createEmpire}
            className="mt-6 bg-emerald-600 hover:bg-emerald-500 px-10 py-4 rounded-2xl font-bold text-lg"
          >
            Start Your Empire
          </button>
        </div>

        {/* Resources */}
        <div className="bg-gray-800 rounded-3xl p-10 text-center mb-10 border border-emerald-900">
          <div className="text-6xl mb-3">💎</div>
          <div className="text-6xl font-bold text-emerald-400">{resources}</div>
          <div className="text-2xl text-gray-400">Resources</div>
        </div>

        {/* Buildings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-orange-900">
            <div className="text-5xl mb-4">⛏️</div>
            <h3 className="text-2xl font-bold">Mine</h3>
            <p className="text-4xl font-bold my-4">Level {mineLevel}</p>
            <button
              onClick={upgradeMine}
              className="bg-orange-600 hover:bg-orange-500 w-full py-4 rounded-2xl font-bold"
            >
              Upgrade Mine
            </button>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-lime-900">
            <div className="text-5xl mb-4">🌾</div>
            <h3 className="text-2xl font-bold">Farm</h3>
            <p className="text-4xl font-bold my-4">Level {farmLevel}</p>
            <button
              onClick={upgradeFarm}
              className="bg-lime-600 hover:bg-lime-500 w-full py-4 rounded-2xl font-bold"
            >
              Upgrade Farm
            </button>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-cyan-900">
            <div className="text-5xl mb-4">🧪</div>
            <h3 className="text-2xl font-bold">Research Lab</h3>
            <p className="text-4xl font-bold my-4">Level {labLevel}</p>
            <button
              onClick={upgradeLab}
              className="bg-cyan-600 hover:bg-cyan-500 w-full py-4 rounded-2xl font-bold"
            >
              Upgrade Lab
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={claimResources}
            className="bg-blue-600 hover:bg-blue-500 text-2xl px-16 py-6 rounded-3xl font-bold"
          >
            Claim Resources
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
