import { Routes, Route } from 'react-router-dom'
import TechStackChooser from '../component/techStackChooser/TechStackChooser'
import routePaths from '../constants/routePaths'
import FrontendDashboard from '../component/frontendDashboard/FrontendDashboard'
import BackendDashboard from '../component/backendDashboard/BackendDashboard'

const RoutesTable = () => {
    return (
        <Routes>
            <Route index element={<TechStackChooser />} />
            <Route path={routePaths.frontendDashboard} element={<FrontendDashboard />} />
            <Route path={routePaths.backendDashboard} element={<BackendDashboard />} />
        </Routes>
    )
}

export default RoutesTable