    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
    import { useState } from 'react'

    export default function DrugSearch() {
    const [medicinValue, setMedicinValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [drugData, setDrugData] = useState(null)

    async function handleSearch() {
        if (!medicinValue.trim()) {
        alert('Please enter a medicine name')
        return
        }

        try {
        setLoading(true)

        const response = await fetch(
            `https://api.example.com/drugs?name=${medicinValue}`
        )

        const data = await response.json()

        setDrugData(data)
        } catch (error) {
        console.log('Error:', error)
        } finally {
        setLoading(false)
        }
    }

    return (
        <>
        <div className="search-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
            type="text"
            value={medicinValue}
            onChange={(e) => setMedicinValue(e.target.value)}
            placeholder="Search medicine..."
            />

            <button onClick={handleSearch}>
            {loading ? 'Searching...' : 'Search'}
            </button>
        </div>

        {drugData && (
            <div className="card mt-4" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">
                {drugData.name}
                </h5>

                <h6 className="card-subtitle mb-2 text-body-secondary">
                Medicine Info
                </h6>

                <p className="card-text">
                {drugData.description}
                </p>
            </div>
            </div>
        )}
        </>
    )
    }