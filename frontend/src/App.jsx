import { useState, useEffect } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [resources, setResources] = useState(100)
  const [mineLevel, setMineLevel] = useState(1)
  const [farmLevel, setFarmLevel] = useState(0)
  const [labLevel, setLabLevel] = useState(0)
  const [towerLevel, setTowerLevel] = useState(0)
  const [totalClaimed, setTotalClaimed] = useState(0)
  const [prestige, setPrestige] = useState(0)
  const [achievements, setAchievements] = useState([])

  // Auto production every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const production = Math.floor(
        (mineLevel * 6) + 
        (farmLevel * 5) + 
        (labLevel * 8) + 
        (towerLevel * 12)
      ) * (1 + prestige * 0.5)
      
      if (production > 0) {
        setResources(prev => prev + production)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [mineLevel, farmLevel, labLevel, towerLevel, prestige])

  const createEmpire = () => {
    if (username.trim() === '') {
      alert("Please enter an empire name!")
      return
    }
    alert(`🎉 Empire "${username}" has been founded on Base!`)
  }

  const claimResources = () => {
    const production = Math.floor((mineLevel * 25) + (farmLevel * 20) + (labLevel * 30) + (towerLevel * 40))
    const newResources = resources + production
    setResources(newResources)
    setTotalClaimed(prev => prev + production)

    // Achievements
    let newAchievements = [...achievements]
    if (newResources >= 20000 && !achievements.includes("tycoon")) {
      newAchievements.push("tycoon")
      alert("🏆 Achievement Unlocked: Base Tycoon!")
    }
    setAchievements(newAchievements)

    alert(`✅ Claimed ${production} Resources!`)
  }

  const upgradeMine = () => {
    const cost = Math.floor(90 + (mineLevel * 45))
    if (resources >= cost) {
      setResources(resources - cost)
      setMineLevel(mineLevel + 1)
      alert(`⛏️ Mine upgraded to Level ${mineLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeFarm = () => {
    const cost = Math.floor(120 + (farmLevel * 50))
    if (resources >= cost) {
      setResources(resources - cost)
      setFarmLevel(farmLevel + 1)
      alert(`🌾 Farm upgraded to Level ${farmLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeLab = () => {
    const cost = Math.floor(220 + (labLevel * 60))
    if (resources >= cost) {
      setResources(resources - cost)
      setLabLevel(labLevel + 1)
      alert(`🧪 Research Lab upgraded to Level ${labLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeTower = () => {
    const cost = Math.floor(300 + (towerLevel * 80))
    if (resources >= cost) {
      setResources(resources - cost)
      setTowerLevel(towerLevel + 1)
      alert(`🏰 Defense Tower upgraded to Level ${towerLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const prestigeReset = () => {
    if (resources < 3000) {
      alert("You need at least 3000 resources to prestige!")
      return
    }
    if (window.confirm("Prestige will reset all buildings. Continue?")) {
      setPrestige(prev => prev + 1)
      setResources(100)
      setMineLevel(1)
      setFarmLevel(0)
      setLabLevel(0)
      setTowerLevel(0)
      alert(`🌟 Prestige ${prestige + 1} achieved!`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-2">🌍 Base Idle Empire</h1>
        <p className="text-center text-emerald-400 mb-10">On-chain Idle Game on Base</p>

        <div className="bg-gray-800/70 border border-emerald-700 rounded-3xl p-6 mb-8 text-center">
          <p className="text-xl">Empire: <span className="text-emerald-400 font-bold">{username || "Unknown Settler"}</span></p>
          <p className="text-sm text-gray-400">Prestige: {prestige} • Achievements: {achievements.length} • Total Earned: {totalClaimed}</p>
        </div>

        <div className="bg-gray-800 rounded-3xl p-12 text-center mb-12 border-2 border-emerald-600">
          <div className="text-8xl mb-4">💎</div>
          <div className="text-7xl font-bold text-emerald-400">{Math.floor(resources)}</div>
          <div className="text-2xl text-gray-400">Resources</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-orange-900">
            <div className="text-6xl mb-4">⛏️</div>
            <h3 className="text-2xl font-bold">Mine</h3>
            <p className="text-5xl font-bold my-4">Lv.{mineLevel}</p>
            <button onClick={upgradeMine} className="bg-orange-600 hover:bg-orange-500 w-full py-4 rounded-2xl font-bold">Upgrade</button>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-lime-900">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-2xl font-bold">Farm</h3>
            <p className="text-5xl font-bold my-4">Lv.{farmLevel}</p>
            <button onClick={upgradeFarm} className="bg-lime-600 hover:bg-lime-500 w-full py-4 rounded-2xl font-bold">Upgrade</button>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-cyan-900">
            <div className="text-6xl mb-4">🧪</div>
            <h3 className="text-2xl font-bold">Research Lab</h3>
            <p className="text-5xl font-bold my-4">Lv.{labLevel}</p>
            <button onClick={upgradeLab} className="bg-cyan-600 hover:bg-cyan-500 w-full py-4 rounded-2xl font-bold">Upgrade</button>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 text-center border border-purple-900">
            <div className="text-6xl mb-4">🏰</div>
            <h3 className="text-2xl font-bold">Defense Tower</h3>
            <p className="text-5xl font-bold my-4">Lv.{towerLevel}</p>
            <button onClick={upgradeTower} className="bg-purple-600 hover:bg-purple-500 w-full py-4 rounded-2xl font-bold">Upgrade</button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={claimResources}
            className="bg-blue-600 hover:bg-blue-500 text-2xl px-20 py-7 rounded-3xl font-bold"
          >
            ⚡ Claim Resources
          </button>

          <button
            onClick={prestigeReset}
            className="bg-purple-600 hover:bg-purple-500 px-12 py-4 rounded-2xl font-bold text-lg"
          >
            🌟 Prestige Reset
          </button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-16">
          Auto production every 3 seconds • New Defense Tower added
        </div>
      </div>
    </div>
  )
}

export default App
