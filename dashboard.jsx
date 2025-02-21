import { useState, useEffect } from 'react';
import { 
    GitBranch, Globe, Activity, Server, Network, Code,
    ChevronDown, ExternalLink, CheckCircle, XCircle, AlertCircle,
    Filter, Search, Hash, BookOpen, Package, Database
} from 'lucide-react';

const calculateProjectHealth = (repo) => {
    const metrics = {
        starScore: Math.min(repo.stargazers_count * 2, 30),
        updateScore: (() => {
            const monthsSinceUpdate = (new Date() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24 * 30);
            return monthsSinceUpdate < 3 ? 30 : monthsSinceUpdate < 6 ? 20 : 10;
        })(),
        languageScore: repo.language ? 10 : 0,
        descriptionScore: repo.description ? 10 : 0,
        homepageScore: repo.homepage ? 20 : 0
    };
    const totalScore = Object.values(metrics).reduce((a, b) => a + b, 0);
    return {
        score: Math.min(Math.max(totalScore, 0), 100),
        metrics
    };
};

// Enhanced ProjectCard component with Lucide icons
const ProjectCard = ({ repo }) => {
    const { score, metrics } = calculateProjectHealth(repo);

    return (
        <div className="project-card bg-gray-900/60 backdrop-blur-xl rounded-lg border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-blue-400" />
                    <div>
                        <h3 className="text-lg font-medium text-white">{repo.name}</h3>
                        <p className="text-sm text-gray-400">{repo.description || 'No description available'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-white">{score}%</span>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="p-4 pt-0">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <MetricCard label="Stars" value={metrics.starScore} unit="points" />
                    <MetricCard label="Recency" value={metrics.updateScore} unit="points" />
                    <MetricCard label="Completeness" value={metrics.languageScore + metrics.descriptionScore + metrics.homepageScore} unit="points" />
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {repo.language && (
                        <span className="px-2 py-1 rounded-full bg-gray-800 text-sm text-blue-400 flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            {repo.language}
                        </span>
                    )}
                    {repo.topics?.slice(0, 3).map(topic => (
                        <span key={topic} className="px-2 py-1 rounded-full bg-gray-800 text-sm text-white">
                            {topic}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-2 mt-4">
                    {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                            <Globe className="w-4 h-4 text-green-400" />
                            Live Site
                        </a>
                    )}
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                        <ExternalLink className="w-4 h-4 text-blue-400" />
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

// Enhanced MetricCard component
const MetricCard = ({ label, value, unit }) => {
    return (
        <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">{label}</span>
                <span className="font-medium text-white">{value} {unit}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-300 ${
                        value > 70 ? 'bg-green-500' : 
                        value > 30 ? 'bg-yellow-500' : 
                        'bg-red-500'
                    }`}
                    style={{ width: `${(value / 100) * 100}%` }}
                />
            </div>
        </div>
    );
};

// Main Dashboard component
const GitHubDashboard = () => {
    const [repositories, setRepositories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await fetch('https://api.github.com/users/uprootiny/repos?sort=updated');
                if (!response.ok) throw new Error('Failed to fetch repositories');
                
                const data = await response.json();
                const enhancedRepos = await Promise.all(
                    data.map(async (repo) => {
                        try {
                            const contributorsResponse = await fetch(`${repo.contributors_url}`);
                            const contributors = await contributorsResponse.json();
                            return {
                                ...repo,
                                contributors: contributors.length,
                                lastCommitDate: repo.updated_at
                            };
                        } catch (detailError) {
                            console.error(`Error fetching details for ${repo.name}:`, detailError);
                            return repo;
                        }
                    })
                );
                
                setRepositories(enhancedRepos);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchRepositories();
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="project-card bg-gray-900/60 backdrop-blur-xl rounded-lg border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                        <Activity className="w-5 h-5 animate-pulse text-green-400" />
                        <span className="font-semibold text-white">Loading Projects...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="project-card bg-gray-900/60 backdrop-blur-xl rounded-lg border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <AlertCircle className="w-5 h-5 text-red-500 mx-auto my-4" />
                    <h2 className="text-xl font-bold text-red-500 text-center mb-2">Error Loading Projects</h2>
                    <p className="text-sm text-gray-400 text-center">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <header className="border-b border-gray-800">
                <nav className="container mx-auto flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <GitBranch className="w-6 h-6 text-blue-400" />
                        <h1 className="text-2xl font-bold">Project Dashboard</h1>
                    </div>
                    <Network className="w-6 h-6 text-purple-400 opacity-75 hover:opacity-100 transition-opacity" />
                </nav>
            </header>

            <main className="container mx-auto p-4 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repositories.map(repo => (
                        <ProjectCard key={repo.id} repo={repo} />
                    ))}
                </div>
            </main>

            <footer className="border-t border-gray-800 mt-auto p-4 text-center text-gray-500">
                <p>Generated using GitHub API</p>
            </footer>
        </div>
    );
};

ReactDOM.render(<GitHubDashboard />, document.getElementById('root'));
