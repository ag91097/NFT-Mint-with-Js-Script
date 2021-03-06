//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Demo NFT", "DTK"){}

    function mintNFT(address _recipient, string memory _tokenURI) public onlyOwner returns(uint256){
        uint256 newId = _tokenIds.current();
        _mint(_recipient, newId);
        _setTokenURI(newId, _tokenURI);
        _tokenIds.increment();
        return newId;
    }
}