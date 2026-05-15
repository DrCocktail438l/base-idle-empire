import { useState, useEffect } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [resources, setResources] = useState(100)
  const [mineLevel, setMineLevel] = useState(1)
  const [farmLevel, setFarmLevel] = useState(0)
  const [labLevel, setLabLevel] = useState(0)
  const [totalClaimed, setTotalClaimed] = useState(0)

  // Auto production every 3 seconds (simulating idle game)
  useEffect(() => {
    const interval = setInterval(() => {
      const production = (mineLevel * 4) + (farmLevel * 3) + (labLevel * 5)
      if (production > 0) {
        setResources(prev => prev + production)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [mineLevel, farmLevel, labLevel])

  const createEmpire = () => {
    if (username.trim() === '') {
      alert("Please enter an empire name!")
      return
    }
    alert(`🎉 Welcome Settler! Empire "${username}" is now live on Base!`)
  }

  const claimResources = () => {
    const production = (mineLevel * 12) + (farmLevel * 8) + (labLevel * 15)
    const newResources = resources + production
    setResources(newResources)
    setTotalClaimed(prev => prev + production)
    alert(`✅ Claimed ${production} Resources!`)
  }

  const upgradeMine = () => {
    const cost = 50 + (mineLevel * 20)
    if (resources >= cost) {
      setResources(resources - cost)
      setMineLevel(mineLevel + 1)
      alert(`⛏️ Mine upgraded to Level ${mineLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeFarm = () => {
    const cost = 80 + (farmLevel * 25)
    if (resources >= cost) {
      setResources(resources - cost)
      setFarmLevel(farmLevel + 1)
      alert(`🌾 Farm upgraded to Level ${farmLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeLab = () => {
    const cost = 120 + (labLevel * 35)
    if (resources >= cost) {
      setResources(resources - cost)
      setLabLevel(labLevel + 1)
      alert(`🧪 Research Lab upgraded to Level ${labLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-2">🌍 Base Idle Empire</h1>
        <p className="text-center text-emerald-400 mb-8">On-chain Idle Game on Base</p>

        {/* Empire Info */}
        <div className="bg-gray-800/70 border border-emerald-700 rounded-3xl p-6 mb-8 text-center">
          <h2 className="text-xl">Empire: <span className="text-emerald-400">{username || "Not Created Yet"}</span></h2>
          <p className="text-sm text-gray-400 mt-1">Total Resources Earned: {totalClaimed}</p>
        </div>

        {/* Resources Display */}
        <div className="bg-gray-800 rounded-3xl p-12 text-center mb-12 border border-emerald-800">
          <div className="text-7xl mb-4">💎</div>
          <div className="text-7xl font-bold text-emerald-400">{Math.floor(resources)}</div>
          <div className="text-2xl text-gray-400">Resources</div>
          <p className="text-sm text-gray-500 mt-2">Auto production is running...</p>
        </div>

        {/* Buildings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-orange-900">
            <div className="text-6xl mb-4">⛏️</div>
            <h3 className="text-2xl font-bold mb-2">Mine</h3>
            <p className="text-5xl font-bold mb-6">Lv.{mineLevel}</p>
            <button onClick={upgradeMine} className="bg-orange-600 hover:bg-orange-500 w-full py-4 rounded-2xl font-bold">
              Upgrade Mine
            </button>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-lime-900">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-2xl font-bold mb-2">Farm</h3>
            <p className="text-5xl font-bold mb-6">Lv.{farmLevel}</p>
            <button onClick={upgradeFarm} className="bg-lime-600 hover:bg-lime-500 w-full py-4 rounded-2xl font-bold">
              Upgrade Farm
            </button>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-cyan-900">
            <div className="text-6xl mb-4">🧪</div>
            <h3 className="text-2xl font-bold mb-2">Research Lab</h3>
            <p className="text-5xl font-bold mb-6">Lv.{labLevel}</p>
            <button onClick={upgradeLab} className="bg-cyan-600 hover:bg-cyan-500 w-full py-4 rounded-2xl font-bold">
              Upgrade Lab
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={claimResources}
            className="bg-blue-600 hover:bg-blue-500 text-2xl px-20 py-7 rounded-3xl font-bold shadow-lg shadow-blue-500/30"
          >
            ⚡ Claim Resources Now
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-16">
          Auto resources added every 3 seconds • More features coming in next commits
        </div>
      </div>
    </div>
  )
}

export default App
