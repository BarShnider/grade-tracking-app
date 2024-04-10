import { Children } from "react";

export default function Button({children, delay, onClick, selected}){
    return(
        <button onClick={onClick} className={`button animate__animated animate__fadeInUp ${selected ? "selected-btn" : ''} `} style={{ animationDelay: `${delay}ms` }} >{children}</button>
    )
}