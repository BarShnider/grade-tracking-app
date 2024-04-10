function Comment({username,title,text}) {
    return (
        <div className="comment">
            <p className="comment-name">{username}</p>
            <h4 className="comment-title">{title}</h4>
            <span className="comment-text">{text}</span>
        </div>
    )
}

export default Comment
