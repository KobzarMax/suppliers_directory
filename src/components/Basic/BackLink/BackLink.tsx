import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./BackLink.css";

export default function BackLink({ path }: { path: string }) {

    return (
        <Link to={path} className="back-link">
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Back</span>
        </Link>
    );
}