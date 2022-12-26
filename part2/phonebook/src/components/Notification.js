const Notification = ({notification}) => {
    if (notification.message === null) {
        return null
    } else {
        return (
            <div className={notification.type}>
                {notification.message}
            </div>
        )
    }
}

export default Notification