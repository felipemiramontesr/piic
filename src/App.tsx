import './App.css'

function App() {
    const handleExplore = () => {
        alert('¡Bienvenido al futuro con React + TS!')
    }

    return (
        <div className="hero">
            <div className="glass-card">
                <h1>NEO-GENESIS</h1>
                <p className="subtitle">La Próxima Evolución en Diseño Web. Tu proyecto React + TypeScript está listo.</p>
                <button className="btn" onClick={handleExplore}>
                    Explorar Futuro
                </button>
            </div>
        </div>
    )
}

export default App
