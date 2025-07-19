import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Bell, User, Menu, X, DollarSign, BarChart3, Newspaper, Wallet, Star, Plus } from 'lucide-react';

// Mock data - in production, this would come from real APIs
const mockCryptoData = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 43127.50, change24h: 2.47, volume: '28.2B', marketCap: '845.3B', icon: '₿' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2634.81, change24h: -1.23, volume: '15.8B', marketCap: '316.7B', icon: 'Ξ' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.4789, change24h: 4.56, volume: '892M', marketCap: '16.8B', icon: '₳' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 98.34, change24h: 7.23, volume: '2.1B', marketCap: '43.2B', icon: '◎' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', price: 0.8456, change24h: -2.18, volume: '456M', marketCap: '7.8B', icon: '⬡' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', price: 14.67, change24h: 3.45, volume: '687M', marketCap: '8.1B', icon: '🔗' },
];

const mockNews = [
  {
    id: 1,
    title: 'Bitcoin ETF Approval Drives Market Rally',
    summary: 'Major cryptocurrency exchanges see surge in trading volume following regulatory developments.',
    time: '2 hours ago',
    source: 'CryptoNews',
    category: 'Regulation'
  },
  {
    id: 2,
    title: 'Ethereum 2.0 Staking Rewards Hit New High',
    summary: 'Validators earning increased returns as network upgrades continue to roll out.',
    time: '4 hours ago',
    source: 'DeFi Weekly',
    category: 'DeFi'
  },
  {
    id: 3,
    title: 'Major Institution Adds $500M in Crypto Holdings',
    summary: 'Fortune 500 company diversifies treasury with significant Bitcoin and Ethereum allocation.',
    time: '6 hours ago',
    source: 'Financial Times',
    category: 'Institutional'
  },
  {
    id: 4,
    title: 'NFT Market Shows Signs of Recovery',
    summary: 'Trading volumes increase 45% week-over-week across major marketplaces.',
    time: '8 hours ago',
    source: 'NFT Insider',
    category: 'NFT'
  }
];

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume: string;
  marketCap: string;
  icon: string;
}

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  time: string;
  source: string;
  category: string;
}

interface PortfolioItem {
  id: string;
  symbol: string;
  amount: number;
  avgPrice: number;
}

function App() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(mockCryptoData);
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { id: 'bitcoin', symbol: 'BTC', amount: 0.5, avgPrice: 41000 },
    { id: 'ethereum', symbol: 'ETH', amount: 2.3, avgPrice: 2400 },
    { id: 'solana', symbol: 'SOL', amount: 15, avgPrice: 85 }
  ]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => 
        prev.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.02),
          change24h: coin.change24h + (Math.random() - 0.5) * 0.5
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredCrypto = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPortfolioValue = portfolio.reduce((total, item) => {
    const coin = cryptoData.find(c => c.id === item.id);
    return total + (coin ? coin.price * item.amount : 0);
  }, 0);

  const portfolioChange = portfolio.reduce((total, item) => {
    const coin = cryptoData.find(c => c.id === item.id);
    if (!coin) return total;
    const currentValue = coin.price * item.amount;
    const originalValue = item.avgPrice * item.amount;
    return total + (currentValue - originalValue);
  }, 0);

  const portfolioChangePercent = portfolio.length > 0 ? (portfolioChange / (totalPortfolioValue - portfolioChange)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  CryptoVault
                </span>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('markets')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'markets' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Markets
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'portfolio' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'news' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  News
                </button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </button>

              <button
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => { setActiveTab('markets'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'markets' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                Markets
              </button>
              <button
                onClick={() => { setActiveTab('portfolio'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'portfolio' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => { setActiveTab('news'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'news' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                News
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Market Overview */}
            <div>
              <h1 className="text-3xl font-bold mb-6">Market Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Total Market Cap</span>
                    <DollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold">$1.78T</div>
                  <div className="text-emerald-400 text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2.4%
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">24h Volume</span>
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold">$87.2B</div>
                  <div className="text-emerald-400 text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.8%
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Active Cryptocurrencies</span>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold">13,247</div>
                  <div className="text-gray-400 text-sm">+156 new</div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Portfolio Value</span>
                    <Wallet className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <div className={`text-sm flex items-center ${portfolioChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {portfolioChangePercent >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {portfolioChangePercent >= 0 ? '+' : ''}{portfolioChangePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Top Cryptocurrencies */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Top Cryptocurrencies</h2>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cryptocurrency</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Volume</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">Market Cap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredCrypto.slice(0, 6).map((coin) => (
                        <tr key={coin.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-lg font-bold">{coin.icon}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{coin.name}</div>
                                <div className="text-sm text-gray-400">{coin.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`flex items-center ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {coin.change24h >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                              {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 hidden sm:table-cell">
                            ${coin.volume}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 hidden lg:table-cell">
                            ${coin.marketCap}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Latest News Preview */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Latest News</h2>
                <button
                  onClick={() => setActiveTab('news')}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.slice(0, 4).map((article) => (
                  <div key={article.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-block bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-gray-400 text-xs">{article.time}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white leading-tight">{article.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{article.summary}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Newspaper className="w-4 h-4 mr-1" />
                      {article.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'markets' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Cryptocurrency Markets</h1>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cryptocurrency</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Market Cap</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredCrypto.map((coin, index) => (
                      <tr key={coin.id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-lg font-bold">{coin.icon}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{coin.name}</div>
                              <div className="text-sm text-gray-400">{coin.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`flex items-center ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {coin.change24h >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          ${coin.volume}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          ${coin.marketCap}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-500/30 transition-colors">
                            Add to Portfolio
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">My Portfolio</h1>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Asset
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Portfolio Value</span>
                  <Wallet className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <div className={`text-sm flex items-center ${portfolioChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {portfolioChangePercent >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {portfolioChangePercent >= 0 ? '+' : ''}${portfolioChange.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({portfolioChangePercent.toFixed(2)}%)
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Best Performer</span>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold">SOL</div>
                <div className="text-emerald-400 text-sm">+15.8% this week</div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Assets</span>
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-2xl font-bold">{portfolio.length}</div>
                <div className="text-gray-400 text-sm">Across {portfolio.length} cryptocurrencies</div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Holdings</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg. Cost</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Price</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Market Value</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {portfolio.map((item) => {
                      const coin = cryptoData.find(c => c.id === item.id);
                      if (!coin) return null;
                      
                      const marketValue = coin.price * item.amount;
                      const costBasis = item.avgPrice * item.amount;
                      const pnl = marketValue - costBasis;
                      const pnlPercent = (pnl / costBasis) * 100;

                      return (
                        <tr key={item.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-lg font-bold">{coin.icon}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{coin.name}</div>
                                <div className="text-sm text-gray-400">{coin.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {item.amount} {coin.symbol}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${item.avgPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            ${marketValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className={pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {pnl >= 0 ? '+' : ''}${pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <div className={`text-xs ${pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Crypto News</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {news.map((article) => (
                  <div key={article.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md text-sm font-medium">
                        {article.category}
                      </span>
                      <span className="text-gray-400 text-sm">{article.time}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-white leading-tight">{article.title}</h2>
                    <p className="text-gray-400 mb-4">{article.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Newspaper className="w-4 h-4 mr-2" />
                        {article.source}
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
                  <div className="space-y-3">
                    {['Bitcoin ETF', 'Ethereum 2.0', 'DeFi Protocols', 'NFT Markets', 'Regulatory Updates'].map((topic, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                        <span className="text-gray-300">{topic}</span>
                        <span className="text-xs text-gray-500">#{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Fear & Greed Index</span>
                        <span className="text-emerald-400">62 - Greed</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last updated: 2 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;