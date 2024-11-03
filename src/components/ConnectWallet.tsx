import{ useState } from 'react';

const ConnectWallet = () => {
  const [account, setAccount] = useState<string | null>(null);

  // Function to handle wallet connection
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
        
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Error connecting wallet. Please try again!");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };



  return (
    <button 
      onClick={connectWallet}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {account ? 
        `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 
        'Connect Wallet'
      }
    </button>
  );
};

export default ConnectWallet;