import Navbar  from "../Components/Navbar/Navbar.jsx";
import AuthCard from "../Components/AuthCard/AuthCard.jsx";
export default function Login(){
    return (
        <div className="app">
            <Navbar />
            <main className="app__main">
                <AuthCard />
            </main>
        </div>
    )
}