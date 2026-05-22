import '../Styles/MainNavigationStyle.css'
import SearchIcon from '@mui/icons-material/Search';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Link } from "react-router-dom"
export default function MainNavigation(){
    return(
        <nav>
            <div className="pharma-assist">PharmaAssist</div>
            <div className="features">
                <Link to="drugsearch">
                <SearchIcon />Drug Search
                </Link>
                <Link to="drugalternative">
                <ChangeCircleIcon/>Drug Alternative
                </Link>
            </div>
            <div className="login">
                <Link>Login</Link>
                <Link>SignUp</Link>
            </div>
            

        </nav>
    )
}