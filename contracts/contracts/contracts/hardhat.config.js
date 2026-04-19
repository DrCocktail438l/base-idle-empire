// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Empire {
    struct Player {
        uint256 resources;
        uint256 lastClaimTime;
        uint256 mineLevel;
        uint256 farmLevel;
        uint256 labLevel;
        string username;
    }

    mapping(address => Player) public players;

    uint256 public constant CLAIM_COOLDOWN = 1 hours;

    event EmpireCreated(address player, string username);
    event ResourcesClaimed(address player, uint256 amount);

    function createEmpire(string memory _username) public {
        require(bytes(players[msg.sender].username).length == 0, "Empire already exists");
        players[msg.sender] = Player({
            resources: 100,
            lastClaimTime: block.timestamp,
            mineLevel: 1,
            farmLevel: 0,
            labLevel: 0,
            username: _username
        });
        emit EmpireCreated(msg.sender, _username);
    }

    function claimResources() public {
        Player storage p = players[msg.sender];
        require(bytes(p.username).length > 0, "Create empire first");

        uint256 timePassed = block.timestamp - p.lastClaimTime;
        uint256 production = (p.mineLevel * 10) + (p.farmLevel * 5);

        uint256 newResources = (timePassed / 3600) * production;
        p.resources += newResources;
        p.lastClaimTime = block.timestamp;

        emit ResourcesClaimed(msg.sender, newResources);
    }

    function upgradeMine() public {
        Player storage p = players[msg.sender];
        require(p.resources >= 50, "Not enough resources");
        p.resources -= 50;
        p.mineLevel++;
    }
}
