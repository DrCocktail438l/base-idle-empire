import { useState, useEffect } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [resources, setResources] = useState(100)
  const [mineLevel, setMineLevel] = useState(1)
  const [farmLevel, setFarmLevel] = useState(0)
  const [labLevel, setLabLevel] = useState(0)
  const [totalClaimed, setTotalClaimed] = useState(0)
  const [prestige, setPrestige] = useState(0)
  const [achievements, setAchievements] = useState([])

  // Auto production every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const production = Math.floor((mineLevel * 6) + (farmLevel * 5) + (labLevel * 8) * (1 + prestige * 0.5))
      if (production > 0) {
        setResources(prev => prev + production)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [mineLevel, farmLevel, labLevel, prestige])

  const createEmpire = () => {
    if (username.trim() === '') {
      alert("Please enter an empire name!")
      return
    }
    alert(`🎉 Empire "${username}" is now officially part of the Base ecosystem!`)
  }

  const claimResources = () => {
    const production = Math.floor((mineLevel * 22) + (farmLevel * 18) + (labLevel * 28))
    const newResources = resources + production
    setResources(newResources)
    setTotalClaimed(prev => prev + production)

    // Achievements
    let newAchievements = [...achievements]
    if (newResources >= 10000 && !achievements.includes("wealth2")) {
      newAchievements.push("wealth2")
      alert("🏆 Achievement Unlocked: Base Tycoon (10,000 Resources)")
    }
    setAchievements(newAchievements)

    alert(`✅ Claimed ${production} Resources!`)
  }

  const upgradeMine = () => {
    const cost = Math.floor(80 + (mineLevel * 40))
    if (resources >= cost) {
      setResources(resources - cost)
      setMineLevel(mineLevel + 1)
      alert(`⛏️ Mine upgraded to Level ${mineLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeFarm = () => {
    const cost = Math.floor(110 + (farmLevel * 45))
    if (resources >= cost) {
      setResources(resources - cost)
      setFarmLevel(farmLevel + 1)
      alert(`🌾 Farm upgraded to Level ${farmLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const upgradeLab = () => {
    const cost = Math.floor(200 + (labLevel * 55))
    if (resources >= cost) {
      setResources(resources - cost)
      setLabLevel(labLevel + 1)
      alert(`🧪 Research Lab upgraded to Level ${labLevel + 1}!`)
    } else {
      alert("Not enough resources!")
    }
  }

  const prestigeReset = () => {
    if (resources < 2500) {
      alert("You need at least 2500 resources to prestige!")
      return
    }
    if (window.confirm("Are you sure you want to Prestige? This will reset your buildings.")) {
      setPrestige(prev => prev + 1)
      setResources(100)
      setMineLevel(1)
      setFarmLevel(0)
      setLabLevel(0)
      alert(`🌟 Prestige ${prestige + 1} achieved! Your empire grows stronger!`)
    }
  }

  // Fake leaderboard data
  const leaderboard = [
    { name: "CryptoKing", score: 45820 },
    { name: "BaseLord", score: 32150 },
    { name: username || "You", score: totalClaimed },
    { name: "SettleMaster", score: 18700 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-2">🌍 Base Idle Empire</h1>
        <p className="text-center text-emerald-400 mb-10">On-chain Idle Game on Base</p>

        <div className="bg-gray-800/70 border border-emerald-700 rounded-3xl p-6 mb-8 text-center">
          <p className="text-xl">Empire: <span className="text-emerald-400 font-bold">{username || "Unknown Settler"}</span></p>
          <p className="text-sm text-gray-400">Prestige: {prestige} • Achievements: {achievements.length} • Total Resources Earned: {totalClaimed}</p>
        </div>

        {/* Resources */}
        <div className="bg-gray-800 rounded-3xl p-12 text-center mb-12 border-2 border-emerald-600">
          <div className="text-8xl mb-4">💎</div>
          <div className="text-7xl font-bold text-emerald-400">{Math.floor(resources)}</div>
          <div className="text-2xl text-gray-400">Resources</div>
        </div>

        {/* Buildings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-800 rounded-3xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">🏆 Global Leaderboard</h3>
          <div className="space-y-3">
            {leaderboard.sort((a, b) => b.score - a.score).map((player, index) => (
              <div key={index} className="flex justify-between bg-gray-900 px-6 py-4 rounded-2xl">
                <span>#{index + 1} {player.name}</span>
                <span className="text-emerald-400 font-bold">{player.score.toLocaleString()} Resources</span>
              </div>
            ))}
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
          Auto production every 3 seconds • Leaderboard added
        </div>
      </div>
    </div>
  )
}

export default App
