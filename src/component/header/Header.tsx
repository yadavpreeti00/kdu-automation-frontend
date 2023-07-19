import { FC } from "react";
import "./Header.scss"
import { useNavigate } from "react-router-dom";
import routePaths from "../../constants/routePaths";

export const Header: FC = () =>{
 
    const navigate = useNavigate();

    return (<>
    <div className="header">
        <h1 className="heading" onClick={() => navigate(routePaths.home)}>
            KDU Evaluator Tool
        </h1>
    </div>
    </>);

}